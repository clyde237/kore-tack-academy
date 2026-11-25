<script lang="ts">
	import { ArrowUpRight, Handshake } from '@lucide/svelte';
	import { PARTNERS } from '#lib/data/academy.ts';
	import { getGsap, prefersFullMotion } from '#lib/utils/motion.ts';

	interface Props {
		onBecomePartner?: () => void;
	}

	let { onBecomePartner }: Props = $props();

	let sectionEl = $state<HTMLElement | null>(null);

	$effect(() => {
		if (!sectionEl || !prefersFullMotion()) return;
		const { gsap } = getGsap();
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.partner-reveal',
				{ y: 14, opacity: 0.35 },
				{
					y: 0,
					opacity: 1,
					duration: 0.45,
					stagger: 0.08,
					ease: 'power2.out',
					clearProps: 'transform,opacity',
					scrollTrigger: {
						trigger: sectionEl,
						start: 'top 96%',
						once: true
					}
				}
			);
		}, sectionEl);

		return () => ctx.revert();
	});
</script>

<section
	id="partenaires"
	bind:this={sectionEl}
	aria-labelledby="partenaires-heading"
	class="border-y border-violet-900/8 bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
>
	<div class="mx-auto max-w-7xl">
		<div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
			<div class="max-w-2xl">
				<p class="font-mono text-xs font-bold tracking-[0.2em] text-orange-600 uppercase">
					Écosystème & Réseau
				</p>
				<h2
					id="partenaires-heading"
					class="mt-2 font-display text-3xl font-extrabold text-violet-900 sm:text-4xl"
				>
					Des partenaires engagés aux côtés de nos apprenants.
				</h2>
				<p class="mt-3 text-base leading-relaxed text-ink-muted">
					Entreprises technologiques, acteurs de l’audiovisuel et fondations s’associent à Kore-TecK
					Academy pour ancrer la formation dans les besoins réels du terrain.
				</p>
			</div>

			<div
				class="inline-flex w-fit items-center gap-2 rounded-full border border-violet-900/12 bg-white px-4 py-2 font-mono text-xs font-semibold text-violet-900 shadow-xs"
			>
				<Handshake class="h-4 w-4 text-orange-500" aria-hidden="true" />
				<span>Stages · Projets réels · Insertion</span>
			</div>
		</div>

		<!-- Partner Logo Grid -->
		<ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each PARTNERS as partner, idx (partner.id)}
				<li
					class="partner-reveal group flex flex-col justify-between rounded-2xl border border-violet-900/12 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl hover:shadow-violet-900/8"
				>
					<div
						class="flex h-36 items-center justify-center rounded-xl border border-violet-900/8 bg-white px-6 py-3"
					>
						<img
							src={partner.logoSrc}
							alt={partner.alt}
							width={partner.width}
							height={partner.height}
							loading="lazy"
							decoding="async"
							class={`w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03] ${
								partner.width === partner.height ? 'max-h-32' : 'max-h-20'
							}`}
						/>
					</div>

					<div class="mt-4 flex items-end justify-between gap-3 border-t border-violet-900/8 pt-4">
						<div>
							<p class="font-display text-base font-extrabold text-violet-900">
								{partner.name}
							</p>
							<p class="mt-0.5 text-xs font-medium text-ink-muted">
								{partner.sector}
							</p>
						</div>
						<span class="font-mono text-xs font-bold text-orange-600/80">
							0{idx + 1}
						</span>
					</div>
				</li>
			{/each}
		</ul>

		<!-- B2B Partnership Strip -->
		<div
			class="partner-reveal mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-violet-900/12 bg-violet-50/90 px-6 py-5 sm:flex-row sm:items-center"
		>
			<div>
				<p class="font-display text-base font-bold text-violet-900 sm:text-lg">
					Vous représentez une entreprise, un studio ou une institution ?
				</p>
				<p class="mt-0.5 text-sm text-ink-muted">
					Accueillez nos apprenants en stage, soumettez des cas projets ou co-construisez un
					parcours sur mesure.
				</p>
			</div>

			<button
				type="button"
				onclick={() => onBecomePartner?.()}
				class="inline-flex shrink-0 items-center gap-2 rounded-full bg-violet-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-500"
			>
				<span>Devenir partenaire</span>
				<ArrowUpRight class="h-4 w-4" aria-hidden="true" />
			</button>
		</div>
	</div>
</section>
