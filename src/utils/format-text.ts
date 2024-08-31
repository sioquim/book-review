export function fInitials(name: string): string {
	return name
		.split(' ')
		.map((part) => part.charAt(0).toUpperCase())
		.join('')
		.slice(0, 2);
}

export const fTruncate = (text: string, maxLength: number) =>
	text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
