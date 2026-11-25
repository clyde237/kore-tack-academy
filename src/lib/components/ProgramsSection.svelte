<script lang="ts">
	import {
		Code2,
		Sparkles,
		ShieldCheck,
		Briefcase,
		Palette,
		Film,
		TrendingUp,
		ArrowUpRight,
		Compass
	} from '@lucide/svelte';
	import {
		PROGRAMS,
		type AcademyProgram,
		type ProgramCategory,
		type TrackFilter
	} from '#lib/data/academy.ts';
	import { cn } from '#lib/utils/cn.ts';
	import ProgramModal from './ProgramModal.svelte';

	interface Props {
		onSelectForApply: (programId: string) => void;
	}

	let { onSelectForApply }: Props = $props();

	let selectedCategory = $state<ProgramCategory>('all');
	let selectedTrack = $state<TrackFilter>('all');
	let inspectedProgram = $state<AcademyProgram | null>(null);

	const categoryTabs: { id: ProgramCategory; label: string }[] = [
		{ id: 'all', label: 'Toutes les filières (7)' },
		{ id: 'tech-ia', label: 'Tech & IA' },
		{ id: 'infra-bureautique', label: 'Infra & Bureautique' },
		{ id: 'creation-marketing', label: 'Création & Marketing' }
	];

	const trackPills: { id: TrackFilter; label: string }[] = [
		{ id: 'all', label: 'Tout (CQP & DQP)' },
		{ id: 'CQP', label: 'CQP · 3–6 mois' },
		{ id: 'DQP', label: 'DQP · 12 mois' }
	];

	const filteredPrograms = $derived(
		PROGRAMS.filter((prog) => {
			const matchCategory = selectedCategory === 'all' || prog.category === selectedCategory;
			const matchTrack = selectedTrack === 'all' || prog.tracks.includes(selectedTrack);
			return matchCategory && matchTrack;
		})
	);
</script>

<section id="filieres" class="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Editorial Header -->
		<div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
			<div class="max-w-2xl">
				<p class="font-mono text-xs font-bold tracking-[0.2em] text-orange-600 uppercase">
					Architecture de l’offre · 7 Pôles Métiers
				</p>
				<h2
					class="mt-2 font-display text-3xl font-extrabold text-violet-900 sm:text-4xl lg:text-[2.65rem]"
				>
					Des formations conçues pour les besoins réels des entreprises.
				</h2>
				<p class="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
					Explorez nos 7 pôles certifiants. Chaque filière mêle ateliers guidés, outils actuels et
					livrables concrets inspirés du cabinet Kore-TecK.
				</p>
			</div>

			<!-- Track Filter Switcher -->
			<div
				role="group"
				aria-label="Filtrer par parcours certifiant"
				class="inline-flex w-fit flex-wrap items-center gap-1 rounded-full border border-violet-900/12 bg-white p-1.5 shadow-xs"
			>
				{#each trackPills as pill (pill.id)}
					<button
						type="button"
						aria-pressed={selectedTrack === pill.id}
						onclick={() => (selectedTrack = pill.id)}
						class={cn(
							'rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm',
							selectedTrack === pill.id
								? 'bg-violet-900 text-white shadow-xs'
								: 'text-ink-muted hover:bg-violet-50 hover:text-violet-900'
						)}
					>
						{pill.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Category Pill Rail -->
		<div class="mt-8 flex flex-wrap items-center gap-2">
			{#each categoryTabs as tab (tab.id)}
				<button
					type="button"
					aria-pressed={selectedCategory === tab.id}
					onclick={() => (selectedCategory = tab.id)}
					class={cn(
						'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
						selectedCategory === tab.id
							? 'border-orange-500 bg-orange-500 text-white shadow-sm shadow-orange-500/20'
							: 'border-violet-900/12 bg-white text-violet-900 hover:border-violet-900/30 hover:bg-violet-50'
					)}
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- 4-Column Responsive Card Grid -->
		<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filteredPrograms as program (program.id)}
				<article
					class="group flex flex-col justify-between rounded-2xl border border-violet-900/12 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-violet-900/25 hover:shadow-xl hover:shadow-violet-900/8"
				>
					<div>
						<!-- Card Top Visual Band -->
						<div class="flex items-start justify-between gap-3">
							<div
								class={cn(
									'flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105',
									program.accentTone === 'orange'
										? 'bg-orange-50 text-orange-600'
										: 'bg-violet-100 text-violet-900'
								)}
							>
								{#if program.iconName === 'code'}
									<Code2 class="h-6 w-6" aria-hidden="true" />
								{:else if program.iconName === 'sparkles'}
									<Sparkles class="h-6 w-6" aria-hidden="true" />
								{:else if program.iconName === 'shield'}
									<ShieldCheck class="h-6 w-6" aria-hidden="true" />
								{:else if program.iconName === 'briefcase'}
									<Briefcase class="h-6 w-6" aria-hidden="true" />
								{:else if program.iconName === 'palette'}
									<Palette class="h-6 w-6" aria-hidden="true" />
								{:else if program.iconName === 'film'}
									<Film class="h-6 w-6" aria-hidden="true" />
								{:else}
									<TrendingUp class="h-6 w-6" aria-hidden="true" />
								{/if}
							</div>

							<span class="font-mono text-xs font-bold text-violet-900/45">
								{program.index}
							</span>
						</div>

						<!-- Duration & Track Pill -->
						<div class="mt-4 flex flex-wrap items-center gap-1.5">
							<span
								class="inline-flex rounded-full bg-orange-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-orange-600"
							>
								{program.durationLabel}
							</span>
						</div>

						<h3 class="mt-3 font-display text-xl font-extrabold text-violet-900">
							{program.title}
						</h3>

						<p class="mt-2 text-sm leading-relaxed text-ink-muted">
							{program.outcome}
						</p>

						<!-- Top 2 career outcomes -->
						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each program.tools.slice(0, 3) as tool (tool)}
								<span
									class="rounded-md bg-violet-50 px-2 py-0.5 font-mono text-[11px] font-medium text-violet-900"
								>
									{tool}
								</span>
							{/each}
						</div>
					</div>

					<div class="mt-6 flex items-center justify-between border-t border-violet-900/8 pt-4">
						<button
							type="button"
							onclick={() => (inspectedProgram = program)}
							class="inline-flex items-center gap-1.5 text-sm font-bold text-violet-900 transition-colors hover:text-orange-600"
						>
							<span>Voir le programme</span>
							<ArrowUpRight
								class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								aria-hidden="true"
							/>
						</button>

						<div class="flex gap-1">
							{#each program.tracks as t (t)}
								<span
									class="rounded bg-violet-900/8 px-1.5 py-0.5 font-mono text-[10px] font-bold text-violet-900"
								>
									{t}
								</span>
							{/each}
						</div>
					</div>
				</article>
			{/each}

			<!-- 8th Orientation Utility Card (fills 4-col grid cleanly when viewing all 7) -->
			<article
				class="flex flex-col justify-between rounded-2xl border border-violet-900/15 bg-violet-900 p-6 text-white shadow-lg shadow-violet-900/15"
			>
				<div>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white"
					>
						<Compass class="h-6 w-6" aria-hidden="true" />
					</div>
					<p class="mt-4 font-mono text-[11px] font-bold tracking-wider text-orange-400 uppercase">
						Orientation gratuite
					</p>
					<h3 class="mt-2 font-display text-xl font-extrabold text-white">
						Vous hésitez entre deux filières ?
					</h3>
					<p class="mt-2.5 text-sm leading-relaxed text-violet-100/85">
						Échangez avec notre équipe pédagogique à Bafoussam pour choisir entre CQP rapide ou DQP
						complet selon votre profil et vos objectifs.
					</p>
				</div>

				<div class="mt-6 border-t border-white/15 pt-4">
					<button
						type="button"
						onclick={() => onSelectForApply('developpement-logiciel')}
						class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
					>
						<span>Demander un bilan d’orientation</span>
						<ArrowUpRight class="h-4 w-4" aria-hidden="true" />
					</button>
				</div>
			</article>
		</div>
	</div>
</section>

<ProgramModal
	program={inspectedProgram}
	onClose={() => (inspectedProgram = null)}
	onApply={onSelectForApply}
/>
