import { describe, expect, it } from 'vitest';
import { generateReferenceCode, validatePreInscription } from './form-validation';

describe('validatePreInscription', () => {
	it('accepts a valid CQP or DQP application payload', () => {
		const result = validatePreInscription({
			fullName: 'Aminatou Njikam',
			email: 'aminatou@example.com',
			phone: '+237 690 12 34 56',
			programId: 'developpement-logiciel',
			track: 'DQP',
			profile: 'Jeune / Bachelier',
			message: 'Je souhaite démarrer à la prochaine rentrée.'
		});

		expect(result.valid).toBe(true);
		expect(result.errors).toEqual({});
	});

	it('rejects short names, malformed emails, and invalid phone numbers', () => {
		const result = validatePreInscription({
			fullName: 'Al',
			email: 'invalid-email',
			phone: '123',
			programId: '',
			track: 'DQP',
			profile: '',
			message: ''
		});

		expect(result.valid).toBe(false);
		expect(result.errors.fullName).toBeDefined();
		expect(result.errors.email).toBeDefined();
		expect(result.errors.phone).toBeDefined();
		expect(result.errors.programId).toBeDefined();
		expect(result.errors.profile).toBeDefined();
	});

	it('generates a clean deterministic-format reference code', () => {
		const code = generateReferenceCode('IA', 1730000000000);
		expect(code).toMatch(/^KTA-IA-[A-Z0-9]{4}$/);
	});
});
