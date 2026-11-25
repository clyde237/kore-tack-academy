<script lang="ts">
	import { X, CheckCircle2, ArrowRight, Wrench, Briefcase, Award } from '@lucide/svelte';
	import type { AcademyProgram } from '#lib/data/academy.ts';

	interface Props {
		program: AcademyProgram | null;
		onClose: () => void;
		onApply: (programId: string) => void;
	}

	let { program, onClose, onApply }: Props = $props();

	let dialogEl = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		const el = dialogEl;
		if (!el) return;

		if (program) {
			if (!el.open) {
				el.showModal();
			}
		} else if (el.open) {
			el.close();
		}
	});

	// Fallback light-dismiss for browsers without native <dialog closedby="any">
	$effect(() => {
		const el = dialogEl;
		if (!el || 'closedBy' in HTMLDialogElement.prototype) return;

		let pressedOutside = false;
		const isOutside = (e: PointerEvent) => {
			const rect = el.getBoundingClientRect();
			return (
				e.clientX < rect.left ||
				e.clientX > rect.right ||
				e.clientY < rect.top ||
				e.clientY > rect.bottom
			);
		};

		const onPointerDown = (e: PointerEvent) => {
			pressedOutside = isOutside(e);
		};
		const onPointerUp = (e: PointerEvent) => {
			if (pressedOutside && isOutside(e)) {
				el.close();
			}
		};

		el.addEventListener('pointerdown', onPointerDown);
		el.addEventListener('pointerup', onPointerUp);
		return () => {
			el.removeEventListener('pointerdown', onPointerDown);
			el.removeEventListener('pointerup', onPointerUp);
		};
	});

	function handleDialogClose() {
		if (dialogEl) {
			dialogEl.returnValue = '';
		}
		onClose();
	}

	function handleApplyClick() {
		if (!program) return;
		const selectedId = program.id;
		dialogEl?.close();
		onApply(selectedId);
	}
</script>

<dialog
	bind:this={dialogEl}
	closedby="any"
	aria-labelledby="program-modal-title"
	onclose={handleDialogClose}
	class="kt-modal m-auto max-h-[90dvh] w-[min(94vw,46rem)] overflow-y-auto rounded-3xl border border-violet-900/15 bg-white p-0 text-ink shadow-2xl"
>
	{#if program}
		<div
			class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-violet-900/10 bg-white/95 px-6 py-5 backdrop-blur-md sm:px-8"
		>
			<div>
				<div class="flex flex-wrap items-center gap-2">
					<span
						class="rounded-full bg-violet-100 px-3 py-0.5 font-mono text-xs font-bold text-violet-900"
					>
						PÔLE {program.index}
					</span>
					<span
						class="rounded-full bg-orange-50 px-3 py-0.5 font-mono text-xs font-bold text-orange-600"
					>
						{program.durationLabel}
					</span>
				</div>
				<h1
					id="program-modal-title"
					class="mt-2 font-display text-2xl font-extrabold text-violet-900 sm:text-3xl"
				>
					{program.title}
				</h1>
			</div>
			<button
				type="button"
				onclick={() => dialogEl?.close()}
				aria-label="Fermer la fiche programme"
				class="rounded-full border border-violet-900/15 p-2 text-ink-muted transition-colors hover:bg-violet-50 hover:text-violet-900"
			>
				<X class="h-5 w-5" aria-hidden="true" />
			</button>
		</div>

		<div class="space-y-6 px-6 py-6 sm:px-8">
			<p class="text-base leading-relaxed text-ink-muted">
				{program.description}
			</p>

			<div class="rounded-2xl border border-orange-500/20 bg-orange-50/70 p-4">
				<p class="font-mono text-xs font-bold text-orange-600 uppercase">Compétence finale</p>
				<p class="mt-1 font-semibold text-violet-900">{program.outcome}</p>
			</div>

			<div>
				<h2 class="flex items-center gap-2 font-display text-lg font-bold text-violet-900">
					<Award class="h-5 w-5 text-orange-500" aria-hidden="true" />
					Modules clés du programme
				</h2>
				<ul class="mt-3 grid gap-2.5 sm:grid-cols-2">
					{#each program.modules as mod (mod)}
						<li
							class="flex items-start gap-2.5 rounded-xl border border-violet-900/10 bg-violet-50/50 p-3 text-sm text-ink"
						>
							<CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
							<span>{mod}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="grid gap-5 sm:grid-cols-2">
				<div>
					<h2 class="flex items-center gap-2 font-display text-base font-bold text-violet-900">
						<Wrench class="h-4 w-4 text-orange-500" aria-hidden="true" />
						Outils & technologies
					</h2>
					<div class="mt-2.5 flex flex-wrap gap-2">
						{#each program.tools as tool (tool)}
							<span
								class="rounded-lg border border-violet-900/12 bg-white px-2.5 py-1 font-mono text-xs font-medium text-violet-900"
							>
								{tool}
							</span>
						{/each}
					</div>
				</div>

				<div>
					<h2 class="flex items-center gap-2 font-display text-base font-bold text-violet-900">
						<Briefcase class="h-4 w-4 text-orange-500" aria-hidden="true" />
						Débouchés métiers
					</h2>
					<ul class="mt-2.5 space-y-1.5 text-sm text-ink-muted">
						{#each program.careers as career (career)}
							<li class="flex items-center gap-2">
								<span class="h-1.5 w-1.5 rounded-full bg-orange-500" aria-hidden="true"></span>
								<span>{career}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div
				class="flex flex-wrap items-center justify-between gap-3 border-t border-violet-900/10 pt-5"
			>
				<div class="flex items-center gap-2 text-xs font-semibold text-ink-muted">
					<span>Parcours disponibles :</span>
					{#each program.tracks as track (track)}
						<span class="rounded-md bg-violet-900 px-2 py-0.5 font-mono text-white">
							{track}
						</span>
					{/each}
				</div>
				<!-- svelte-ignore a11y_autofocus (recommended inside native modal <dialog>) -->
				<button
					type="button"
					onclick={handleApplyClick}
					autofocus
					class="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600"
				>
					<span>Me pré-inscrire en {program.shortTitle}</span>
					<ArrowRight class="h-4 w-4" aria-hidden="true" />
				</button>
			</div>
		</div>
	{/if}
</dialog>
