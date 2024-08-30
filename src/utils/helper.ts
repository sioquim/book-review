export function isEqual(a: any, b: any): boolean {
	if (a === null || a === undefined || b === null || b === undefined) {
		return a === b;
	}

	if (typeof a !== typeof b) {
		return false;
	}

	if (
		typeof a === 'string' ||
		typeof a === 'number' ||
		typeof a === 'boolean'
	) {
		return a === b;
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) {
			return false;
		}

		return a.every((item, index) => isEqual(item, b[index]));
	}

	if (typeof a === 'object' && typeof b === 'object') {
		const keysA = Object.keys(a!);
		const keysB = Object.keys(b!);

		if (keysA.length !== keysB.length) {
			return false;
		}

		return keysA.every((key) => isEqual(a[key], b[key]));
	}

	return false;
}
