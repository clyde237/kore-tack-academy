<script lang="ts">
	import {
		GraduationCap,
		Users,
		RefreshCw,
		Building2,
		CheckCircle2,
		ArrowRight
	} from '@lucide/svelte';
	import { PERSONAS } from '#lib/data/academy.ts';
	import { cn } from '#lib/utils/cn.ts';

	interface Props {
		onActionClick?: (personaId: string) => void;
	}

	let { onActionClick }: Props = $props();

	let activeIndex = $state(0);
	let tabButtons: (HTMLButtonElement | undefined)[] = [];

	const activePersona = $derived(PERSONAS[activeIndex] ?? PERSONAS[0]);

	function handleTabKeydown(e: KeyboardEvent, idx: number) {
		let next: number;
		if (e.key === 'ArrowRight') next = (idx + 1) % PERSONAS.length;
		else if (e.key === 'ArrowLeft') next = (idx - 1 + PERSONAS.length) % PERSONAS.length;
		else if (e.key === 'Home') next = 0;
		else if (e.key === 'End') next = PERSONAS.length - 1;
		else return;

		e.preventDefault();
		activeIndex = next;
		tabButtons[next]?.focus();
	}
</script>

<section id="cibles" class="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="max-w-2xl">
			<p class="font-mono text-xs font-bold tracking-[0.2em] text-orange-600 uppercase">
				À qui s’adresse l’Academy ?
			</p>
			<h2 class="mt-2 font-display text-3xl font-extrabold text-violet-900 sm:text-4xl">
				Une réponse claire pour chaque projet professionnel.
			</h2>
			<p class="mt-3 text-base leading-relaxed text-ink-muted">
				Sélectionnez votre profil pour découvrir comment Kore-TecK Academy s’adapte à vos attentes
				et vos objectifs.
			</p>
		</div>

		<!-- Accessible WAI-ARIA Tablist -->
		<div
			role="tablist"
			aria-label="Profils des apprenants et partenaires"
			class="mt-8 flex flex-nowrap gap-2 overflow-x-auto border-b border-violet-900/12 pb-3"
		>
			{#each PERSONAS as persona, idx (persona.id)}
				<button
					bind:this={tabButtons[idx]}
					id={`tab-${persona.id}`}
					type="button"
					role="tab"
					aria-selected={activeIndex === idx}
					tabindex={activeIndex === idx ? 0 : -1}
					onclick={() => (activeIndex = idx)}
					onkeydown={(e) => handleTabKeydown(e, idx)}
					class={cn(
						'relative inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors',
						activeIndex === idx
							? 'bg-violet-900 text-white'
							: 'bg-white text-ink-muted ring-1 ring-violet-900/10 hover:bg-violet-50 hover:text-violet-900'
					)}
				>
					{#if persona.id === 'jeunes'}
						<GraduationCap class="h-4 w-4 text-orange-400" aria-hidden="true" />
					{:else if persona.id === 'parents'}
						<Users class="h-4 w-4 text-orange-400" aria-hidden="true" />
					{:else if persona.id === 'reconversion'}
						<RefreshCw class="h-4 w-4 text-orange-400" aria-hidden="true" />
					{:else}
						<Building2 class="h-4 w-4 text-orange-400" aria-hidden="true" />
					{/if}
					<span>{persona.tabLabel}</span>
					{#if activeIndex === idx}
						<span
							aria-hidden="true"
							class="absolute inset-x-4 -bottom-3 h-[3px] rounded-full bg-orange-500"
						></span>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Active Tabpanel -->
		<div
			role="tabpanel"
			aria-labelledby={`tab-${activePersona.id}`}
			class="mt-6 rounded-3xl border border-violet-900/12 bg-white p-6 shadow-sm sm:p-10"
		>
			<div class="grid items-center gap-8 lg:grid-cols-12">
				<div class="lg:col-span-7">
					<span
						class="inline-flex rounded-full bg-orange-50 px-3 py-1 font-mono text-xs font-bold text-orange-600 uppercase"
					>
						{activePersona.tabLabel}
					</span>
					<h3 class="mt-3 font-display text-2xl font-extrabold text-violet-900 sm:text-3xl">
						{activePersona.title}
					</h3>
					<p class="mt-2 text-base leading-relaxed text-ink-muted">
						{activePersona.subtitle}
					</p>

					<ul class="mt-6 space-y-3">
						{#each activePersona.expectations as item (item)}
							<li class="flex items-start gap-3 text-sm font-medium text-ink sm:text-base">
								<CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 text-orange-500" aria-hidden="true" />
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="rounded-2xl border border-violet-900/12 bg-violet-50 p-6 lg:col-span-5">
					<p class="font-mono text-xs font-bold tracking-wider text-violet-900 uppercase">
						L’engagement Kore-TecK Academy
					</p>
					<p class="mt-3 text-base leading-relaxed font-medium text-violet-950">
						{activePersona.academyAnswer}
					</p>
					<div class="mt-6">
						<button
							type="button"
							onclick={() => onActionClick?.(activePersona.id)}
							class="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-orange-600"
						>
							<span>{activePersona.ctaLabel}</span>
							<ArrowRight class="h-4 w-4" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
