import { describe, expect, it } from 'vitest';
import { CERTIFICATIONS, FAQ_ITEMS, PARTNERS, PERSONAS, PROGRAMS, VALUES } from './academy';

describe('academy catalog data integrity', () => {
	it('defines all 7 core training poles with unique IDs and indices', () => {
		expect(PROGRAMS).toHaveLength(7);
		const ids = new Set(PROGRAMS.map((p) => p.id));
		const indices = new Set(PROGRAMS.map((p) => p.index));
		expect(ids.size).toBe(7);
		expect(indices.size).toBe(7);
	});

	it('includes valid CQP/DQP tracks, modules, tools, and career outcomes per program', () => {
		for (const program of PROGRAMS) {
			expect(program.tracks.length).toBeGreaterThanOrEqual(1);
			expect(program.modules.length).toBeGreaterThanOrEqual(3);
			expect(program.tools.length).toBeGreaterThanOrEqual(3);
			expect(program.careers.length).toBeGreaterThanOrEqual(3);
		}
	});

	it('covers both CQP and DQP certifications, 4 personas, 5 values, 3 partners, and FAQ items', () => {
		expect(CERTIFICATIONS.map((c) => c.code)).toEqual(['CQP', 'DQP']);
		expect(PERSONAS).toHaveLength(4);
		expect(VALUES).toHaveLength(5);
		expect(PARTNERS).toHaveLength(3);
		for (const partner of PARTNERS) {
			expect(partner.logoSrc).toMatch(/^\/partenaires\//);
			expect(partner.width).toBeGreaterThan(0);
			expect(partner.height).toBeGreaterThan(0);
		}
		expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(5);
	});
});
