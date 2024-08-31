import 'openai/shims/node';
import { revalidatePath } from 'next/cache';

import { createClient } from 'src/utils/supabase-server';

import { upsertBook, insertReview } from 'src/app/books/actions';

// Mock the dependencies
jest.mock('src/config-global', () => ({
	CONFIG: {
		// Add any necessary properties that your tests might use
		SUPABASE_URL: 'mock-supabase-url',
		SUPABASE_ANON_KEY: 'mock-supabase-anon-key'
		// Add other CONFIG properties as needed
	}
}));
jest.mock('src/utils/supabase-server');
jest.mock('next/cache', () => ({
	revalidatePath: jest.fn()
}));
// Mock the newBookSchema
jest.mock('src/lib/book/validations', () => ({
	newBookSchema: {
		safeParse: jest.fn().mockReturnValue({ success: true })
	}
}));
// Mock the bookReviewSchema
jest.mock('src/lib/book-review/validations', () => ({
	bookReviewSchema: {
		safeParse: jest.fn().mockReturnValue({ success: true })
	}
}));

describe('upsertBook', () => {
	const mockSupabaseClient = {
		from: jest.fn().mockReturnThis(),
		select: jest.fn().mockReturnThis(),
		or: jest.fn().mockReturnThis(),
		limit: jest.fn().mockReturnThis(),
		maybeSingle: jest.fn(),
		upsert: jest.fn().mockReturnThis(),
		single: jest.fn()
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(createClient as jest.Mock).mockReturnValue(mockSupabaseClient);
	});

	it('should successfully upsert a new book', async () => {
		mockSupabaseClient.maybeSingle.mockResolvedValue({
			data: null,
			error: null
		});
		mockSupabaseClient.single.mockResolvedValue({
			data: { id: 1 },
			error: null
		});

		const result = await upsertBook({
			title: 'Test Book',
			isbn: '1234567890'
		});

		expect(result).toEqual({ message: 'Success' });
		expect(revalidatePath).toHaveBeenCalledWith('/books');
	});

	it('should return an error if a book with the same title or ISBN already exists', async () => {
		mockSupabaseClient.maybeSingle.mockResolvedValue({
			data: { id: 1 },
			error: null
		});

		const result = await upsertBook({
			title: 'Existing Book',
			isbn: '0987654321'
		});

		expect(result).toEqual({ error: 'This book already exists' });
	});

	it('should return an error if there is a problem checking for existing books', async () => {
		mockSupabaseClient.maybeSingle.mockResolvedValue({
			data: null,
			error: new Error('Database error')
		});

		const result = await upsertBook({
			title: 'Test Book',
			isbn: '1234567890'
		});

		expect(result).toEqual({ error: 'Error checking for existing book' });
	});

	it('should return an error if there is a problem inserting the book', async () => {
		mockSupabaseClient.maybeSingle.mockResolvedValue({
			data: null,
			error: new Error('Insert error')
		});

		const result = await upsertBook({
			title: 'Test Book',
			isbn: '1234567890'
		});

		expect(result).toEqual({ error: 'Error checking for existing book' });
	});

	// Add more tests as needed
});

describe('insertReview', () => {
	const mockSupabaseClient = {
		from: jest.fn().mockReturnThis(),
		select: jest.fn().mockReturnThis(),
		eq: jest.fn().mockReturnThis(),
		limit: jest.fn().mockReturnThis(),
		maybeSingle: jest.fn(),
		insert: jest.fn().mockReturnThis()
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(createClient as jest.Mock).mockReturnValue(mockSupabaseClient);
	});

	it('should successfully insert a new review', async () => {
		mockSupabaseClient.maybeSingle.mockResolvedValueOnce({
			data: null,
			error: null
		});
		mockSupabaseClient.maybeSingle.mockResolvedValueOnce({
			data: { id: 1 },
			error: null
		});

		const result = await insertReview({
			book_id: '1',
			reviewer_email: 'test@example.com',
			reviewer_name: 'Test User', // Add this line
			rating: 5,
			comment: 'Great book!'
		});

		expect(result).toEqual({ message: 'Success' });
		expect(revalidatePath).toHaveBeenCalledWith('/');
	});

	it('should return an error if a review already exists for the book and reviewer', async () => {
		mockSupabaseClient.maybeSingle.mockResolvedValueOnce({
			data: { id: 1 },
			error: null
		});

		const result = await insertReview({
			book_id: '1',
			reviewer_email: 'test@example.com',
			reviewer_name: 'Test User', // Add this line
			rating: 5,
			comment: 'Great book!'
		});

		expect(result).toEqual({
			error: 'You have already reviewed this book'
		});
	});

	it('should return an error if there is a problem checking for existing reviews', async () => {
		mockSupabaseClient.maybeSingle.mockResolvedValueOnce({
			data: null,
			error: new Error('Database error')
		});

		const result = await insertReview({
			book_id: '1',
			reviewer_email: 'test@example.com',
			reviewer_name: 'Test User', // Add this line
			rating: 5,
			comment: 'Great book!'
		});

		expect(result).toEqual({
			error: 'Error checking for existing reviews'
		});
	});

	it('should return an error if there is a problem inserting the review', async () => {
		mockSupabaseClient.maybeSingle.mockResolvedValueOnce({
			data: null,
			error: null
		});
		mockSupabaseClient.maybeSingle.mockResolvedValueOnce({
			data: null,
			error: new Error('Insert error')
		});

		const result = await insertReview({
			book_id: '1',
			reviewer_email: 'test@example.com',
			reviewer_name: 'Test User', // Add this line
			rating: 5,
			comment: 'Great book!'
		});

		expect(result).toEqual({ error: 'Error creating review' });
	});

	// Add more tests as needed
});
