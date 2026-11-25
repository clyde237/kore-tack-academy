<script lang="ts">
	import {
		MapPin,
		Mail,
		Phone,
		MessageCircle,
		FileText,
		CheckCircle2,
		AlertCircle,
		Send,
		X,
		Printer
	} from '@lucide/svelte';
	import { PROGRAMS, SITE_INFO } from '#lib/data/academy.ts';
	import {
		attachAccessibleValidation,
		generateReferenceCode,
		validatePreInscription,
		type PreInscriptionPayload
	} from '#lib/utils/form-validation.ts';

	interface Props {
		selectedProgramId: string;
		selectedTrack: 'CQP' | 'DQP';
		selectedProfile: string;
	}

	let {
		selectedProgramId = $bindable('developpement-logiciel'),
		selectedTrack = $bindable<'CQP' | 'DQP'>('DQP'),
		selectedProfile = $bindable('Jeune / Bachelier')
	}: Props = $props();

	let fullName = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');

	let formEl = $state<HTMLFormElement | null>(null);
	let brochureDialogEl = $state<HTMLDialogElement | null>(null);
	let submitting = $state(false);
	let submittedRef = $state<string | null>(null);
	let submittedSummary = $state<PreInscriptionPayload | null>(null);
	let submitErrorBanner = $state<string | null>(null);

	const PHONE_HTML_PATTERN = '[+0-9\\s\\-\\(\\)]{8,20}';

	const profileOptions = [
		'Jeune / Bachelier',
		'Étudiant',
		'Parent / Prescripteur',
		'Professionnel en reconversion',
		'Entreprise / Partenaire B2B'
	];

	const selectedProgramTitle = $derived(
		PROGRAMS.find((p) => p.id === selectedProgramId)?.title ?? 'Formation Kore-TecK Academy'
	);

	const whatsappLink = $derived(() => {
		const text = submittedSummary
			? `Bonjour Kore-TecK Academy, je viens de soumettre ma pré-inscription (${submittedRef}) pour ${selectedProgramTitle} (${submittedSummary.track}). Nom : ${submittedSummary.fullName}.`
			: `Bonjour Kore-TecK Academy, je souhaite obtenir des informations sur la filière ${selectedProgramTitle} (${selectedTrack}).`;
		return `https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
	});

	$effect(() => {
		if (!formEl) return;
		return attachAccessibleValidation(formEl);
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!formEl) return;

		submitErrorBanner = null;
		const payload: PreInscriptionPayload = {
			fullName,
			email,
			phone,
			programId: selectedProgramId,
			track: selectedTrack,
			profile: selectedProfile,
			message
		};

		// Trigger native constraint check + move focus to first invalid field if invalid
		if (!formEl.checkValidity()) {
			const firstInvalid = formEl.querySelector<HTMLElement>(':invalid');
			firstInvalid?.focus();
			submitErrorBanner = 'Veuillez vérifier les champs signalés avant de valider votre demande.';
			return;
		}

		const result = validatePreInscription(payload);
		if (!result.valid) {
			submitErrorBanner = Object.values(result.errors)[0] ?? 'Formulaire incomplet.';
			return;
		}

		submitting = true;
		const code = generateReferenceCode(
			PROGRAMS.find((p) => p.id === selectedProgramId)?.code ?? 'KTA'
		);

		setTimeout(() => {
			submittedRef = code;
			submittedSummary = payload;
			submitting = false;
		}, 280);
	}

	function resetForm() {
		submittedRef = null;
		submittedSummary = null;
		submitErrorBanner = null;
		fullName = '';
		email = '';
		phone = '';
		message = '';
		formEl?.reset();
	}
</script>

<section id="preinscription" class="bg-violet-50/75 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
			<!-- Left Contact & Brochure Column -->
			<div class="space-y-6 lg:col-span-5">
				<div>
					<p class="font-mono text-xs font-bold tracking-[0.2em] text-orange-600 uppercase">
						Passer à l’action
					</p>
					<h2 class="mt-2 font-display text-3xl font-extrabold text-violet-900 sm:text-4xl">
						Pré-inscrivez-vous ou échangez avec un conseiller.
					</h2>
					<p class="mt-3 text-base leading-relaxed text-ink-muted">
						Recevez le programme détaillé, les modalités de financement et la date de la prochaine
						rentrée à Bafoussam. Réponse rapide sous 24h ouvrées.
					</p>
				</div>

				<div class="space-y-3 rounded-3xl border border-violet-900/12 bg-white p-6 shadow-xs">
					<div class="flex items-start gap-3.5">
						<span
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-900"
						>
							<MapPin class="h-5 w-5" aria-hidden="true" />
						</span>
						<div>
							<p class="font-display text-sm font-bold text-violet-900">Campus Principal</p>
							<p class="text-sm text-ink-muted">
								{SITE_INFO.locationPrimary} · Passerelle {SITE_INFO.locationBridge}
							</p>
						</div>
					</div>

					<div class="flex items-start gap-3.5">
						<span
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-900"
						>
							<Mail class="h-5 w-5" aria-hidden="true" />
						</span>
						<div>
							<p class="font-display text-sm font-bold text-violet-900">E-mail pédagogique</p>
							<a
								href={`mailto:${SITE_INFO.email}`}
								class="text-sm font-medium text-orange-600 hover:underline"
							>
								{SITE_INFO.email}
							</a>
						</div>
					</div>

					<div class="flex items-start gap-3.5">
						<span
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-900"
						>
							<Phone class="h-5 w-5" aria-hidden="true" />
						</span>
						<div>
							<p class="font-display text-sm font-bold text-violet-900">Accueil & Orientation</p>
							<p class="text-sm text-ink-muted">{SITE_INFO.phoneDisplay}</p>
						</div>
					</div>
				</div>

				<!-- Direct WhatsApp & Brochure triggers -->
				<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<a
						href={whatsappLink()}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between gap-3 rounded-2xl bg-emerald-600 px-5 py-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
					>
						<div class="flex items-center gap-3">
							<MessageCircle class="h-5 w-5 shrink-0" aria-hidden="true" />
							<div>
								<p class="font-display text-sm font-bold">Discussion directe WhatsApp</p>
								<p class="text-xs text-emerald-100">Réponse immédiate sur votre orientation</p>
							</div>
						</div>
						<span class="font-mono text-xs font-bold">OUVRIR →</span>
					</a>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->

					<button
						type="button"
						onclick={() => brochureDialogEl?.showModal()}
						class="flex items-center justify-between gap-3 rounded-2xl border border-violet-900/15 bg-white px-5 py-4 text-left text-violet-900 transition-colors hover:bg-violet-50"
					>
						<div class="flex items-center gap-3">
							<FileText class="h-5 w-5 shrink-0 text-orange-500" aria-hidden="true" />
							<div>
								<p class="font-display text-sm font-bold">Fiche synthétique des 7 filières</p>
								<p class="text-xs text-ink-muted">Consulter ou imprimer en PDF</p>
							</div>
						</div>
						<span class="font-mono text-xs font-bold text-orange-600">APERÇU</span>
					</button>
				</div>
			</div>

			<!-- Right Accessible Form Card -->
			<div class="lg:col-span-7">
				<div
					class="rounded-3xl border border-violet-900/12 bg-white p-6 shadow-xl shadow-violet-900/6 sm:p-9"
				>
					{#if submittedRef && submittedSummary}
						<div class="space-y-5 py-4" role="status" aria-live="polite">
							<div
								class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"
							>
								<CheckCircle2 class="h-8 w-8" aria-hidden="true" />
							</div>
							<div>
								<p class="font-mono text-xs font-bold text-emerald-700 uppercase">
									Demande enregistrée · Réf. {submittedRef}
								</p>
								<h3 class="mt-2 font-display text-2xl font-extrabold text-violet-900 sm:text-3xl">
									Merci {submittedSummary.fullName} !
								</h3>
								<p class="mt-2 text-base text-ink-muted">
									Votre dossier de pré-inscription en <strong class="text-violet-900">
										{selectedProgramTitle}
									</strong>
									(parcours <strong class="text-violet-900">{submittedSummary.track}</strong>) a
									bien été préparé.
								</p>
							</div>

							<div
								class="rounded-2xl border border-violet-900/10 bg-violet-50/70 p-4 text-sm text-ink"
							>
								<p><strong>Profil :</strong> {submittedSummary.profile}</p>
								<p class="mt-1"><strong>E-mail :</strong> {submittedSummary.email}</p>
								<p class="mt-1"><strong>Téléphone :</strong> {submittedSummary.phone}</p>
							</div>

							<div class="flex flex-wrap gap-3 pt-2">
								<!-- eslint-disable svelte/no-navigation-without-resolve -->
								<a
									href={whatsappLink()}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
								>
									<MessageCircle class="h-4 w-4" aria-hidden="true" />
									<span>Finaliser sur WhatsApp</span>
								</a>
								<!-- eslint-enable svelte/no-navigation-without-resolve -->
								<button
									type="button"
									onclick={resetForm}
									class="rounded-full border border-violet-900/15 px-5 py-3 text-sm font-semibold text-violet-900 hover:bg-violet-50"
								>
									Nouvelle demande
								</button>
							</div>
						</div>
					{:else}
						<form
							bind:this={formEl}
							onsubmit={handleSubmit}
							aria-labelledby="preinscription-title"
							class="space-y-5"
						>
							<div class="border-b border-violet-900/10 pb-4">
								<h3
									id="preinscription-title"
									class="font-display text-2xl font-extrabold text-violet-900"
								>
									Formulaire de pré-inscription
								</h3>
								<p class="mt-1 text-sm text-ink-muted">
									Sans engagement · Les champs marqués d’un <span class="text-orange-600">*</span> sont
									requis.
								</p>
							</div>

							{#if submitErrorBanner}
								<div
									role="alert"
									class="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
								>
									<AlertCircle class="h-4 w-4 shrink-0" aria-hidden="true" />
									<span>{submitErrorBanner}</span>
								</div>
							{/if}

							<div class="grid gap-5 sm:grid-cols-2">
								<div class="flex flex-col gap-1.5 sm:col-span-2">
									<label for="fullName" class="text-sm font-bold text-violet-900">
										Nom complet <span aria-hidden="true" class="text-orange-600">*</span>
									</label>
									<input
										id="fullName"
										name="fullName"
										type="text"
										bind:value={fullName}
										required
										minlength={3}
										autocomplete="name"
										enterkeyhint="next"
										data-error="fullName-error"
										placeholder="Ex. Jean-Paul Kamga"
										class="kt-field-control min-h-[48px] rounded-xl border border-violet-900/20 bg-paper px-4 py-3 text-base text-ink transition-colors"
									/>
									<div
										id="fullName-error"
										class="kt-error-msg items-center gap-1.5 text-xs font-medium text-red-700"
									>
										<AlertCircle class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
										<span>Veuillez saisir au moins 3 caractères pour votre nom complet.</span>
									</div>
								</div>

								<div class="flex flex-col gap-1.5">
									<label for="email" class="text-sm font-bold text-violet-900">
										Adresse e-mail <span aria-hidden="true" class="text-orange-600">*</span>
									</label>
									<span id="email-hint" class="text-xs text-ink-muted">
										Format : nom@exemple.com
									</span>
									<input
										id="email"
										name="email"
										type="email"
										bind:value={email}
										required
										autocomplete="email"
										autocorrect="off"
										autocapitalize="none"
										spellcheck={false}
										enterkeyhint="next"
										aria-describedby="email-hint"
										data-error="email-error"
										placeholder="vous@exemple.com"
										class="kt-field-control min-h-[48px] rounded-xl border border-violet-900/20 bg-paper px-4 py-3 text-base text-ink transition-colors"
									/>
									<div
										id="email-error"
										class="kt-error-msg items-center gap-1.5 text-xs font-medium text-red-700"
									>
										<AlertCircle class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
										<span>Indiquez une adresse e-mail valide (ex. nom@exemple.com).</span>
									</div>
								</div>

								<div class="flex flex-col gap-1.5">
									<label for="phone" class="text-sm font-bold text-violet-900">
										Téléphone / WhatsApp <span aria-hidden="true" class="text-orange-600">*</span>
									</label>
									<span id="phone-hint" class="text-xs text-ink-muted">Ex. +237 6XX XX XX XX</span>
									<input
										id="phone"
										name="phone"
										type="tel"
										inputmode="tel"
										bind:value={phone}
										required
										pattern={PHONE_HTML_PATTERN}
										autocomplete="tel"
										enterkeyhint="next"
										aria-describedby="phone-hint"
										data-error="phone-error"
										placeholder="+237 6 90 00 00 00"
										class="kt-field-control min-h-[48px] rounded-xl border border-violet-900/20 bg-paper px-4 py-3 text-base text-ink transition-colors"
									/>
									<div
										id="phone-error"
										class="kt-error-msg items-center gap-1.5 text-xs font-medium text-red-700"
									>
										<AlertCircle class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
										<span>Indiquez un numéro joignable (minimum 8 chiffres).</span>
									</div>
								</div>

								<div class="flex flex-col gap-1.5">
									<label for="programId" class="text-sm font-bold text-violet-900">
										Filière souhaitée <span aria-hidden="true" class="text-orange-600">*</span>
									</label>
									<select
										id="programId"
										name="programId"
										bind:value={selectedProgramId}
										required
										class="kt-field-control min-h-[48px] rounded-xl border border-violet-900/20 bg-paper px-4 py-3 text-base text-ink transition-colors"
									>
										{#each PROGRAMS as prog (prog.id)}
											<option value={prog.id}>{prog.index} · {prog.title}</option>
										{/each}
									</select>
								</div>

								<div class="flex flex-col gap-1.5">
									<label for="profile" class="text-sm font-bold text-violet-900">
										Votre profil <span aria-hidden="true" class="text-orange-600">*</span>
									</label>
									<select
										id="profile"
										name="profile"
										bind:value={selectedProfile}
										required
										class="kt-field-control min-h-[48px] rounded-xl border border-violet-900/20 bg-paper px-4 py-3 text-base text-ink transition-colors"
									>
										{#each profileOptions as opt (opt)}
											<option value={opt}>{opt}</option>
										{/each}
									</select>
								</div>
							</div>

							<!-- Radio group for CQP vs DQP (2 choices -> visible radios per guidance) -->
							<fieldset class="space-y-2">
								<legend class="text-sm font-bold text-violet-900">
									Parcours visé <span aria-hidden="true" class="text-orange-600">*</span>
								</legend>
								<div class="grid gap-3 sm:grid-cols-2">
									<label
										class="flex cursor-pointer items-start gap-3 rounded-xl border border-violet-900/15 bg-paper p-3.5 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50/60"
									>
										<input
											type="radio"
											name="track"
											value="CQP"
											bind:group={selectedTrack}
											class="mt-1 h-4 w-4 accent-orange-500"
										/>
										<span>
											<span class="block font-display text-sm font-bold text-violet-900">
												CQP (3–6 mois)
											</span>
											<span class="block text-xs text-ink-muted">
												Parcours ciblé & opérationnel rapide
											</span>
										</span>
									</label>

									<label
										class="flex cursor-pointer items-start gap-3 rounded-xl border border-violet-900/15 bg-paper p-3.5 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50/60"
									>
										<input
											type="radio"
											name="track"
											value="DQP"
											bind:group={selectedTrack}
											class="mt-1 h-4 w-4 accent-orange-500"
										/>
										<span>
											<span class="block font-display text-sm font-bold text-violet-900">
												DQP (12 mois)
											</span>
											<span class="block text-xs text-ink-muted">
												Expertise complète & polyvalente
											</span>
										</span>
									</label>
								</div>
							</fieldset>

							<div class="flex flex-col gap-1.5">
								<label for="message" class="text-sm font-bold text-violet-900">
									Objectif ou question (optionnel)
								</label>
								<textarea
									id="message"
									name="message"
									rows={3}
									bind:value={message}
									placeholder="Précisez vos disponibilités, votre niveau actuel ou vos besoins entreprise..."
									class="rounded-xl border border-violet-900/20 bg-paper px-4 py-3 text-base text-ink transition-colors"
								></textarea>
							</div>

							<button
								type="submit"
								disabled={submitting}
								class="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 disabled:opacity-65"
							>
								<Send class="h-4 w-4" aria-hidden="true" />
								<span>
									{submitting
										? 'Enregistrement en cours...'
										: 'Envoyer ma demande de pré-inscription'}
								</span>
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Brochure Preview Modal -->
<dialog
	bind:this={brochureDialogEl}
	closedby="any"
	aria-labelledby="brochure-modal-title"
	class="kt-modal m-auto max-h-[88dvh] w-[min(94vw,44rem)] overflow-y-auto rounded-3xl border border-violet-900/15 bg-white p-0 text-ink shadow-2xl"
>
	<div
		class="sticky top-0 flex items-center justify-between border-b border-violet-900/10 bg-white/95 px-6 py-4 backdrop-blur-md"
	>
		<div>
			<p class="font-mono text-xs font-bold text-orange-600 uppercase">Catalogue officiel</p>
			<h1 id="brochure-modal-title" class="font-display text-xl font-extrabold text-violet-900">
				Kore-TecK Academy — Fiche des 7 Filières
			</h1>
		</div>
		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={() => window.print()}
				class="inline-flex items-center gap-1.5 rounded-full border border-violet-900/15 px-3.5 py-1.5 text-xs font-bold text-violet-900 hover:bg-violet-50"
			>
				<Printer class="h-3.5 w-3.5" aria-hidden="true" />
				<span>Imprimer / PDF</span>
			</button>
			<button
				type="button"
				onclick={() => brochureDialogEl?.close()}
				aria-label="Fermer l’aperçu brochure"
				class="rounded-full border border-violet-900/15 p-2 text-ink-muted hover:bg-violet-50"
			>
				<X class="h-4 w-4" aria-hidden="true" />
			</button>
		</div>
	</div>

	<div class="space-y-4 p-6">
		{#each PROGRAMS as prog (prog.id)}
			<div class="rounded-2xl border border-violet-900/10 bg-violet-50/40 p-4">
				<div class="flex flex-wrap items-center justify-between gap-2">
					<h2 class="font-display text-base font-extrabold text-violet-900">
						{prog.index}. {prog.title}
					</h2>
					<span
						class="rounded-full bg-orange-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-orange-600"
					>
						{prog.durationLabel}
					</span>
				</div>
				<p class="mt-1.5 text-sm text-ink-muted">{prog.outcome}</p>
				<p class="mt-2 font-mono text-xs text-violet-900/80">
					Outils : {prog.tools.join(' · ')}
				</p>
			</div>
		{/each}
	</div>
</dialog>
