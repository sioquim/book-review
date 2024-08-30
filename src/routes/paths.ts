export const paths = {
	books: {
		root: `/books/`,
		new: `/books/new`,
		details: (id: string) => `/books/${id}`,
		edit: (id: string) => `/books/${id}/edit`
	},
	page403: '/error/403',
	page404: '/error/404',
	page500: '/error/500'
};
