'use server'

import type { TablesInsert, TablesUpdate } from 'src/database.types';

import OpenAI from 'openai';
import { revalidatePath } from 'next/cache';

import { createClient } from "src/utils/supabase-server";

import { CONFIG } from 'src/config-global';
import { newBookSchema } from 'src/lib/book/validations';
import { bookReviewSchema } from 'src/lib/book-review/validations';




export async function upsertBook(payload: TablesInsert<'book'> | TablesUpdate<'book'>):
Promise<{ message: string } | { error: string }> {

    const validatedFields = newBookSchema.safeParse(payload)
    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.reduce((prev, issue) => prev + issue.message, '');
      return {
        error: errorMessages,
      };
    }

  const supabase = createClient()
  
  // Check for existing book if no ID provided
  if (!payload.id) {
    const { data: existingBook, error: searchError } = await supabase
      .from('book')
      .select()
      .or(`title.eq.${payload.title},isbn.eq.${payload.isbn}`)
      .limit(1)
      .maybeSingle();
  
    if (searchError) return { error: 'Error checking for existing book' };
    if (existingBook) return { error: 'This book already exists' };
  }
  
  // Upsert book
  const { error: insertError } = await supabase
    .from('book')
    .upsert({ ...payload })
    .select()
    .limit(1)
    .maybeSingle();

  if (insertError) return { error: 'Error creating book' };

  revalidatePath("/");
  return { message: 'Success' };
}



export async function insertReview(payload: TablesInsert<'review'>):
Promise<{ message: string } | { error: string }> {

    const validatedFields = bookReviewSchema.safeParse(payload)
    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.reduce((prev, issue) => prev + issue.message, '');
      return {
        error: errorMessages,
      };
    }

  const supabase = createClient()
  
  // Check for existing review for this book by this reviewer
  const { data: existingReview, error: searchError } = await supabase
    .from('review')
    .select()
    .eq('book_id', payload.book_id)
    .eq('reviewer_email', payload.reviewer_email)
    .limit(1)
    .maybeSingle();

  if (searchError) return { error: 'Error checking for existing reviews' };
  if (existingReview) return { error: 'You have already reviewed this book' };
  
  // Insert new review
  const { error: insertError } = await supabase
    .from('review')
    .insert({ ...payload })
    .select()
    .limit(1)
    .maybeSingle();

  if (insertError) return { error: 'Error creating review' };

  revalidatePath("/");
  return { message: 'Success' };
}



export async function generateSummary({
  title,
  author,
  year
}: { title: string; author: string; year: string | undefined }):
Promise<{ message: string } | { error: string }> {
  const openai = new OpenAI({ apiKey: CONFIG.openai.apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant that provides brief book summaries." },
        { role: "user", content: `Provide a 2-4 sentence summary of the book "${title}" by ${author}${year ? `, published in ${year}` : ''}.` }
      ],
      max_tokens: 150
    });

    const summary = completion?.choices?.[0]?.message?.content?.trim();

    if (summary && summary?.length < 10) {
      return { error: "Failed to generate summary." };
    }

    return { message: summary || '' };
  } catch (error) {
    console.error("Error generating summary:", error);
    return { error: "Failed to generate summary." };
  }
}