export interface PreInscriptionPayload {
	fullName: string;
	email: string;
	phone: string;
	programId: string;
	track: 'CQP' | 'DQP';
	profile: string;
	message: string;
}

export interface ValidationResult {
	valid: boolean;
	errors: Partial<Record<keyof PreInscriptionPayload, string>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGITS_PATTERN = /^\+?[\d\s\-()]{8,20}$/;

/**
 * Validates pre-registration payload deterministically on both client and tests.
 */
export function validatePreInscription(payload: PreInscriptionPayload): ValidationResult {
	const errors: Partial<Record<keyof PreInscriptionPayload, string>> = {};

	const name = payload.fullName.trim();
	if (name.length < 3) {
		errors.fullName = 'Veuillez saisir votre nom complet (au moins 3 caractères).';
	}

	const email = payload.email.trim();
	if (!EMAIL_PATTERN.test(email)) {
		errors.email = 'Saisissez une adresse e-mail valide (ex. nom@exemple.com).';
	}

	const phone = payload.phone.trim();
	const digitsCount = phone.replace(/\D/g, '').length;
	if (!PHONE_DIGITS_PATTERN.test(phone) || digitsCount < 8) {
		errors.phone = 'Indiquez un numéro de téléphone ou WhatsApp valide (min. 8 chiffres).';
	}

	if (!payload.programId.trim()) {
		errors.programId = 'Veuillez sélectionner une filière de formation.';
	}

	if (payload.track !== 'CQP' && payload.track !== 'DQP') {
		errors.track = 'Veuillez choisir un parcours certifiant (CQP ou DQP).';
	}

	if (!payload.profile.trim()) {
		errors.profile = 'Veuillez préciser votre profil actuel.';
	}

	return {
		valid: Object.keys(errors).length === 0,
		errors
	};
}

/**
 * Generates a deterministic-format human-readable registration reference code.
 */
export function generateReferenceCode(programCode: string, timestamp = Date.now()): string {
	const shortTime = timestamp.toString(36).slice(-4).toUpperCase();
	const cleanCode =
		programCode
			.replace(/[^A-Z0-9]/gi, '')
			.slice(0, 3)
			.toUpperCase() || 'KTA';
	return `KTA-${cleanCode}-${shortTime}`;
}

/**
 * Synchronizes :user-invalid CSS state with aria-invalid, dynamic aria-describedby,
 * and a single polite live region announcer, following modern-web-guidance.
 * Also applies a WeakMap fallback if :user-invalid is unsupported.
 */
export function attachAccessibleValidation(formElement: HTMLFormElement): () => void {
	const supportsUserInvalid =
		typeof CSS !== 'undefined' && typeof CSS.supports === 'function'
			? CSS.supports('selector(:user-invalid)')
			: true;

	const dirtyState = new WeakMap<Element, { hasInteracted: boolean; hasBlurred: boolean }>();
	const flagged = new WeakSet<Element>();
	const announced = new WeakSet<Element>();

	const announcer = document.createElement('div');
	announcer.setAttribute('aria-live', 'polite');
	announcer.classList.add('visually-hidden');
	document.body.append(announcer);

	let announceTimer: ReturnType<typeof setTimeout> | undefined;
	let announcedField: Element | null = null;

	const linkError = (el: HTMLElement, shown: boolean) => {
		const errorId = el.dataset.error;
		if (!errorId) return;
		const ids = (el.getAttribute('aria-describedby') || '')
			.split(/\s+/)
			.filter((id) => id && id !== errorId);
		if (shown) ids.push(errorId);
		if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
		else el.removeAttribute('aria-describedby');
	};

	const spokenText = (node: Element): string => {
		const copy = node.cloneNode(true) as Element;
		copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
		copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
			n.replaceWith(`${n.getAttribute('aria-label')}: `);
		});
		return (copy.textContent || '').replace(/\s+/g, ' ').trim();
	};

	const announceError = (el: HTMLElement) => {
		const errorId = el.dataset.error;
		if (!errorId) return;
		const errorNode = document.getElementById(errorId);
		if (!errorNode) return;
		const inputEl = el as HTMLInputElement;
		const labelText = inputEl.labels?.[0] ? `${spokenText(inputEl.labels[0])} : ` : '';
		clearTimeout(announceTimer);
		announcer.textContent = '';
		announcedField = el;
		announceTimer = setTimeout(() => {
			announcer.textContent = labelText + spokenText(errorNode);
		}, 500);
	};

	const isControlInvalid = (el: HTMLElement): boolean => {
		if (supportsUserInvalid) {
			return el.matches(':user-invalid');
		}
		return el.classList.contains('user-invalid-fallback');
	};

	const syncAria = (el: EventTarget | null, announce = false) => {
		if (!(el instanceof HTMLElement)) return;
		if (!el.matches('input, select, textarea')) return;

		const invalid = isControlInvalid(el);
		if (invalid) {
			if (announce && !announced.has(el)) {
				announceError(el);
				announced.add(el);
			}
			el.setAttribute('aria-invalid', 'true');
			linkError(el, true);
			flagged.add(el);
		} else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
			el.setAttribute('aria-invalid', 'false');
			linkError(el, false);
			flagged.delete(el);
			announced.delete(el);
			if (announcedField === el) {
				clearTimeout(announceTimer);
				announcer.textContent = '';
			}
		}
	};

	const updateFallbackState = (
		input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	) => {
		const isValid = input.validity.valid;
		input.classList.toggle('user-invalid-fallback', !isValid);
		input.classList.toggle('user-valid-fallback', isValid);
	};

	const onBlur = (e: Event) => {
		const target = e.target;
		if (
			!supportsUserInvalid &&
			(target instanceof HTMLInputElement ||
				target instanceof HTMLSelectElement ||
				target instanceof HTMLTextAreaElement)
		) {
			const state = dirtyState.get(target) || { hasInteracted: false, hasBlurred: false };
			state.hasBlurred = true;
			dirtyState.set(target, state);
			if (state.hasInteracted) updateFallbackState(target);
		}
		syncAria(target, true);
	};

	const onInput = (e: Event) => {
		const target = e.target;
		if (
			!supportsUserInvalid &&
			(target instanceof HTMLInputElement ||
				target instanceof HTMLSelectElement ||
				target instanceof HTMLTextAreaElement)
		) {
			const state = dirtyState.get(target) || { hasInteracted: false, hasBlurred: false };
			state.hasInteracted = true;
			dirtyState.set(target, state);
			if (state.hasBlurred) updateFallbackState(target);
		}
		if (target instanceof HTMLElement && target.hasAttribute('aria-invalid')) {
			syncAria(target, false);
		}
	};

	const onChange = (e: Event) => {
		const target = e.target;
		if (
			!supportsUserInvalid &&
			(target instanceof HTMLInputElement ||
				target instanceof HTMLSelectElement ||
				target instanceof HTMLTextAreaElement)
		) {
			const state = dirtyState.get(target) || { hasInteracted: false, hasBlurred: false };
			state.hasInteracted = true;
			dirtyState.set(target, state);
			if (state.hasBlurred) updateFallbackState(target);
		}
		syncAria(target, true);
	};

	const onInvalid = (e: Event) => {
		const target = e.target;
		if (
			!supportsUserInvalid &&
			(target instanceof HTMLInputElement ||
				target instanceof HTMLSelectElement ||
				target instanceof HTMLTextAreaElement)
		) {
			dirtyState.set(target, { hasInteracted: true, hasBlurred: true });
			updateFallbackState(target);
		}
		if (target instanceof Element) {
			announced.add(target);
		}
		syncAria(target, false);
	};

	const onReset = () => {
		setTimeout(() => {
			for (const control of Array.from(formElement.elements)) {
				dirtyState.delete(control);
				control.classList.remove('user-invalid-fallback', 'user-valid-fallback');
				syncAria(control, false);
			}
		});
	};

	formElement.querySelectorAll('input, select, textarea').forEach((el) => syncAria(el, false));
	formElement.addEventListener('blur', onBlur, true);
	formElement.addEventListener('input', onInput);
	formElement.addEventListener('change', onChange, true);
	formElement.addEventListener('invalid', onInvalid, true);
	formElement.addEventListener('reset', onReset, true);

	return () => {
		clearTimeout(announceTimer);
		formElement.removeEventListener('blur', onBlur, true);
		formElement.removeEventListener('input', onInput);
		formElement.removeEventListener('change', onChange, true);
		formElement.removeEventListener('invalid', onInvalid, true);
		formElement.removeEventListener('reset', onReset, true);
		announcer.remove();
	};
}
