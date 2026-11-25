<script lang="ts">
	import { Target, CheckCircle2, Compass, Sparkles } from '@lucide/svelte';
	import { HORIZONS, MISSION_ENGAGEMENTS, VALUES } from '#lib/data/academy.ts';
	import { getGsap, prefersFullMotion } from '#lib/utils/motion.ts';
	import { cn } from '#lib/utils/cn.ts';

	let sectionEl = $state<HTMLElement | null>(null);
	let activeValueCode = $state<string>(VALUES[0].code);

	const activeValue = $derived(VALUES.find((v) => v.code === activeValueCode) ?? VALUES[0]);

	$effect(() => {
		if (!sectionEl || !prefersFullMotion()) return;
		const { gsap } = getGsap();
		const ctx = gsap.context(() => {
			gsap.from('.vision-reveal', {
				y: 20,
				opacity: 0,
				duration: 0.55,
				stagger: 0.08,
				ease: 'power2.out',
				clearProps: 'transform,opacity',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 85%',
					once: true
				}
			});
		}, sectionEl);

		return () => ctx.revert();
	});
</script>

<section
	id="vision"
	bind:this={sectionEl}
	class="relative overflow-hidden bg-violet-900 py-20 text-white sm:py-28"
>
	<div
		aria-hidden="true"
		class="bg-arch-grid-dark pointer-events-none absolute inset-0 opacity-60"
	></div>
	<div
		aria-hidden="true"
		class="pointer-events-none absolute top-0 right-0 h-[28rem] w-[28rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-orange-500/15 blur-3xl"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-12 lg:gap-14">
			<!-- Sticky Left Column: Vision & 3 Horizons -->
			<div class="lg:col-span-5">
				<div class="lg:sticky lg:top-28">
					<p class="font-mono text-xs font-bold tracking-[0.22em] text-orange-400 uppercase">
						Pourquoi Kore-TecK Academy ?
					</p>
					<h2
						class="mt-3 font-display text-3xl leading-tight font-extrabold text-white sm:text-4xl"
					>
						Un pont d’expertise entre <span class="text-orange-400">Bafoussam</span> et
						<span class="text-orange-400">Paris</span>.
					</h2>

					<blockquote
						class="mt-6 rounded-2xl border border-white/15 bg-white/6 p-5 text-base leading-relaxed text-violet-100"
					>
						<Target class="mb-2.5 h-5 w-5 text-orange-400" aria-hidden="true" />
						« Devenir le pôle de référence en formation numérique au Cameroun et en Afrique centrale,
						reconnu pour l’excellence pratique de ses diplômés. »
					</blockquote>

					<div class="mt-8 space-y-4">
						<p class="font-mono text-xs font-semibold tracking-wider text-violet-100/70 uppercase">
							Nos 3 horizons stratégiques
						</p>
						{#each HORIZONS as horizon (horizon.number)}
							<div
								class="vision-reveal flex items-start gap-4 rounded-2xl border border-white/10 bg-violet-950/60 p-4"
							>
								<span class="font-mono text-sm font-bold text-orange-400">
									{horizon.number}
								</span>
								<div>
									<h3 class="font-display text-base font-bold text-white">
										{horizon.title}
									</h3>
									<p class="mt-1 text-sm leading-relaxed text-violet-100/80">
										{horizon.description}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Right Column: 4 Mission Engagements + 5 Interactive Values -->
			<div class="space-y-10 lg:col-span-7">
				<div>
					<div class="flex items-center gap-2">
						<Compass class="h-5 w-5 text-orange-400" aria-hidden="true" />
						<h3 class="font-display text-2xl font-extrabold text-white">
							Notre mission au quotidien
						</h3>
					</div>
					<p class="mt-2 text-base text-violet-100/85">
						Combler le fossé entre l’enseignement classique et les attentes concrètes des
						entreprises grâce à l’adossement direct au cabinet Kore-TecK.
					</p>

					<div class="mt-6 grid gap-4 sm:grid-cols-2">
						{#each MISSION_ENGAGEMENTS as item, idx (item.title)}
							<div
								class="vision-reveal rounded-2xl border border-white/12 bg-white/8 p-5 transition-colors hover:border-orange-400/50 hover:bg-white/11"
							>
								<div class="flex items-center justify-between">
									<span
										class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 font-mono text-xs font-bold text-white"
									>
										0{idx + 1}
									</span>
									<CheckCircle2 class="h-5 w-5 text-orange-400" aria-hidden="true" />
								</div>
								<h4 class="mt-4 font-display text-lg font-bold text-white">
									{item.title}
								</h4>
								<p class="mt-2 text-sm leading-relaxed text-violet-100/85">
									{item.description}
								</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Interactive 5 Values Selector -->
				<div class="rounded-3xl border border-white/15 bg-violet-950/85 p-6 sm:p-8">
					<div class="flex flex-wrap items-center justify-between gap-2">
						<div>
							<p class="font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
								Nos 5 valeurs fondamentales
							</p>
							<h3 class="mt-1 font-display text-xl font-extrabold text-white sm:text-2xl">
								Ce qui guide chaque cohorte
							</h3>
						</div>
						<Sparkles class="h-6 w-6 text-orange-400" aria-hidden="true" />
					</div>

					<div class="mt-5 flex flex-wrap gap-2">
						{#each VALUES as val (val.code)}
							<button
								type="button"
								aria-pressed={activeValueCode === val.code}
								onclick={() => (activeValueCode = val.code)}
								class={cn(
									'rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm',
									activeValueCode === val.code
										? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
										: 'border border-white/15 bg-white/6 text-violet-100 hover:bg-white/12 hover:text-white'
								)}
							>
								{val.title}
							</button>
						{/each}
					</div>

					<div class="mt-5 rounded-2xl border border-white/12 bg-white/6 p-5">
						<p class="font-mono text-xs font-semibold text-orange-400">
							{activeValue.code} · ENGAGEMENT PÉDAGOGIQUE
						</p>
						<p class="mt-1.5 font-display text-lg font-bold text-white">
							{activeValue.title}
						</p>
						<p class="mt-1.5 text-sm leading-relaxed text-violet-100/90 sm:text-base">
							{activeValue.summary}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
