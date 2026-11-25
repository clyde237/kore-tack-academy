<script lang="ts">
	import {
		ArrowRight,
		Award,
		Code2,
		Cpu,
		Globe2,
		Layers,
		Sparkles,
		Terminal,
		Palette,
		ShieldCheck
	} from '@lucide/svelte';
	import { REASSURANCE_ITEMS, SITE_INFO } from '#lib/data/academy.ts';
	import { getGsap, prefersFullMotion } from '#lib/utils/motion.ts';
	import { cn } from '#lib/utils/cn.ts';

	interface Props {
		onQuickApply?: (programId?: string) => void;
	}

	let { onQuickApply }: Props = $props();

	let heroContainer = $state<HTMLElement | null>(null);
	let activeStudioMode = $state<'dev-ia' | 'design-video' | 'infra-mkt'>('dev-ia');
	let tiltX = $state(0);
	let tiltY = $state(0);

	const studioModes = [
		{
			id: 'dev-ia' as const,
			label: 'Code & IA',
			badge: 'Pôles 01 & 02',
			title: 'Atelier Applications & Agents IA',
			command: 'kt build --stack svelte,python-ia --prod',
			metrics: [
				{ k: 'Pratique réelle', v: '80 % atelier' },
				{ k: 'Livrable cohorte', v: 'App déployée + API IA' }
			],
			tags: ['TypeScript', 'Python IA', 'Git Workflow', 'API REST']
		},
		{
			id: 'design-video' as const,
			label: 'Design & Vidéo',
			badge: 'Pôles 05 & 06',
			title: 'Studio Identité Visuelle & Montage',
			command: 'kt render --brand kore-teck --4k-social',
			metrics: [
				{ k: 'Portfolio élève', v: '6 projets clients' },
				{ k: 'Outils pro', v: 'Figma · Premiere · DaVinci' }
			],
			tags: ['Branding', 'UI/UX Figma', 'Motion', 'Montage 4K']
		},
		{
			id: 'infra-mkt' as const,
			label: 'Infra & Ads',
			badge: 'Pôles 03, 04 & 07',
			title: 'Lab Cybersécurité & Acquisition Digitale',
			command: 'kt audit --netsec && ads --roi +34%',
			metrics: [
				{ k: 'Infrastructure', v: 'Labs Linux & Réseaux' },
				{ k: 'Certification', v: 'CQP / DQP' }
			],
			tags: ['Linux', 'Sécurité', 'Excel Pro', 'Meta & Google Ads']
		}
	];

	const activeStudio = $derived(
		studioModes.find((m) => m.id === activeStudioMode) ?? studioModes[0]
	);

	$effect(() => {
		if (!heroContainer || !prefersFullMotion()) return;
		const { gsap } = getGsap();
		const ctx = gsap.context(() => {
			gsap.from('.hero-stagger', {
				y: 22,
				opacity: 0,
				duration: 0.65,
				stagger: 0.08,
				ease: 'power3.out',
				clearProps: 'transform,opacity'
			});
		}, heroContainer);

		return () => ctx.revert();
	});

	function handlePointerMove(e: PointerEvent) {
		if (!prefersFullMotion() || e.pointerType !== 'mouse') return;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const normX = (e.clientX - rect.left) / rect.width - 0.5;
		const normY = (e.clientY - rect.top) / rect.height - 0.5;
		tiltX = normY * -5;
		tiltY = normX * 6;
	}

	function resetTilt() {
		tiltX = 0;
		tiltY = 0;
	}
</script>

<section id="top" bind:this={heroContainer} class="px-3 pt-3 pb-10 sm:px-6 lg:px-8">
	<div
		class="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-violet-900 px-5 py-10 text-white shadow-2xl shadow-violet-950/20 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
	>
		<!-- Architectural grid & ambient light -->
		<div
			aria-hidden="true"
			class="bg-arch-grid-dark pointer-events-none absolute inset-0 opacity-70"
		></div>
		<div
			aria-hidden="true"
			class="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"
		></div>
		<div
			aria-hidden="true"
			class="pointer-events-none absolute -bottom-36 -left-24 h-80 w-80 rounded-full bg-violet-700/40 blur-3xl"
		></div>

		<div class="relative z-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
			<!-- Left Editorial Column -->
			<div class="min-w-0 lg:col-span-7">
				<div
					class="hero-stagger mb-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm sm:mb-6 sm:gap-2.5 sm:text-sm"
				>
					<span class="inline-flex h-2 w-2 shrink-0 rounded-full bg-orange-500"></span>
					<span>{SITE_INFO.locationPrimary}</span>
					<span class="text-white/40" aria-hidden="true">↔</span>
					<span>{SITE_INFO.locationBridge}</span>
					<span class="hidden text-white/30 sm:inline" aria-hidden="true">|</span>
					<span class="font-mono text-xs font-semibold text-orange-400"> Parcours DQP & CQP </span>
				</div>

				<h1
					class="hero-stagger font-display text-[1.95rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.65rem]"
				>
					Formez-vous aux métiers du numérique. Devenez
					<span class="relative inline-block text-orange-400">
						opérationnel.
						<svg
							aria-hidden="true"
							viewBox="0 0 220 12"
							fill="none"
							class="absolute -bottom-1.5 left-0 w-full"
						>
							<path
								d="M2 9C55 2.5 148 1.5 218 8.5"
								stroke="#FF6B00"
								stroke-width="3.5"
								stroke-linecap="round"
							/>
						</svg>
					</span>
				</h1>

				<p
					class="hero-stagger mt-6 max-w-2xl text-base leading-relaxed text-violet-100/90 sm:text-lg"
				>
					<strong class="font-semibold text-white">Kore-TecK Academy</strong> est le centre de
					formation professionnelle certifiante adossé au cabinet tech
					<strong class="font-semibold text-white">Kore-TecK</strong>. Transformer le potentiel en
					compétences immédiatement employables grâce à la pratique sur projets réels.
				</p>

				<div class="hero-stagger mt-8 flex flex-wrap items-center gap-3.5">
					<a
						href="#filieres"
						class="inline-flex items-center gap-2.5 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:bg-orange-600 sm:text-base"
					>
						<span>Découvrir nos 7 filières</span>
						<ArrowRight class="h-4 w-4" aria-hidden="true" />
					</a>
					<button
						type="button"
						onclick={() => onQuickApply?.()}
						class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15 sm:text-base"
					>
						<span>Se pré-inscrire</span>
					</button>
				</div>

				<!-- 3 concise value anchors -->
				<div
					class="hero-stagger mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-white/12 pt-6 text-sm text-violet-100/85"
				>
					<span class="inline-flex items-center gap-2">
						<Award class="h-4 w-4 text-orange-400" aria-hidden="true" />
						Qualifications officielles DQP & CQP
					</span>
					<span class="inline-flex items-center gap-2">
						<Layers class="h-4 w-4 text-orange-400" aria-hidden="true" />
						Apprentissage 100 % terrain (Learning by Doing)
					</span>
					<span class="inline-flex items-center gap-2">
						<Globe2 class="h-4 w-4 text-orange-400" aria-hidden="true" />
						Standards internationaux
					</span>
				</div>
			</div>

			<!-- Right Interactive Studio Card -->
			<div class="hero-stagger min-w-0 lg:col-span-5">
				<div
					role="region"
					aria-label="Aperçu interactif de l’écosystème pédagogique Kore-TecK Academy"
					onpointermove={handlePointerMove}
					onpointerleave={resetTilt}
					style={`transform: perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg);`}
					class="min-w-0 rounded-3xl border border-white/15 bg-violet-950/90 p-4 shadow-2xl transition-transform duration-200 ease-out sm:p-6"
				>
					<!-- Header with real emblem -->
					<div
						class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4"
					>
						<div class="flex min-w-0 items-center gap-3">
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm sm:h-11 sm:w-11"
							>
								<img
									src="/images/logo-mark.png"
									alt="Emblème Kore-TecK Academy"
									class="h-full w-full object-contain"
									width="36"
									height="40"
								/>
							</div>
							<div class="min-w-0">
								<p
									class="font-mono text-[11px] font-semibold tracking-wider text-orange-400 uppercase"
								>
									Écosystème Kore-TecK
								</p>
								<p class="font-display text-sm font-bold text-white">
									Formation × Cabinet × Emploi
								</p>
							</div>
						</div>
						<span
							class="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-300 sm:text-[11px]"
						>
							PRATIQUE ACTIVE
						</span>
					</div>

					<!-- Mode switcher pills -->
					<div class="mt-4 flex flex-wrap gap-1.5 rounded-xl bg-white/6 p-1 sm:grid sm:grid-cols-3">
						{#each studioModes as mode (mode.id)}
							<button
								type="button"
								onclick={() => (activeStudioMode = mode.id)}
								class={cn(
									'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold whitespace-nowrap transition-all',
									activeStudioMode === mode.id
										? 'bg-orange-500 text-white shadow-sm'
										: 'text-violet-100/75 hover:bg-white/8 hover:text-white'
								)}
							>
								{#if mode.id === 'dev-ia'}
									<Code2 class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
								{:else if mode.id === 'design-video'}
									<Palette class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
								{:else}
									<ShieldCheck class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
								{/if}
								<span>{mode.label}</span>
							</button>
						{/each}
					</div>

					<!-- Dynamic preview canvas -->
					<div class="mt-4 min-w-0 rounded-2xl border border-white/10 bg-violet-900/70 p-4">
						<div class="flex items-center justify-between gap-2">
							<span class="font-mono text-[11px] font-semibold text-orange-400 uppercase">
								{activeStudio.badge}
							</span>
							<Sparkles class="h-4 w-4 text-orange-400" aria-hidden="true" />
						</div>
						<h2 class="mt-1 font-display text-lg font-bold text-white">
							{activeStudio.title}
						</h2>

						<!-- Terminal / Studio line -->
						<div
							class="mt-3 flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-violet-950/95 px-3 py-2.5 font-mono text-xs text-violet-100"
						>
							<Terminal class="h-3.5 w-3.5 shrink-0 text-orange-400" aria-hidden="true" />
							<code class="min-w-0 flex-1 truncate">{activeStudio.command}</code>
						</div>

						<!-- Two metrics -->
						<div class="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
							{#each activeStudio.metrics as metric (metric.k)}
								<div class="rounded-xl bg-white/6 px-3 py-2.5">
									<p class="text-[11px] text-violet-100/70">{metric.k}</p>
									<p class="mt-0.5 text-xs font-bold text-white sm:text-sm">{metric.v}</p>
								</div>
							{/each}
						</div>

						<!-- Tool tags -->
						<div class="mt-3 flex flex-wrap gap-1.5">
							{#each activeStudio.tags as tag (tag)}
								<span
									class="rounded-md border border-white/12 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-violet-100"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>

					<!-- 3-step pipeline footer -->
					<div class="mt-4 grid grid-cols-1 gap-2 text-center sm:grid-cols-3">
						<div class="rounded-xl border border-white/10 bg-white/5 px-2 py-2">
							<p class="font-mono text-[10px] text-orange-400">01 · ACADEMY</p>
							<p class="mt-0.5 text-xs font-semibold text-white">Ateliers intensifs</p>
						</div>
						<div class="rounded-xl border border-white/10 bg-white/5 px-2 py-2">
							<p class="font-mono text-[10px] text-orange-400">02 · KORE-TECK</p>
							<p class="mt-0.5 text-xs font-semibold text-white">Projets cabinet</p>
						</div>
						<div class="rounded-xl border border-white/10 bg-white/5 px-2 py-2">
							<p class="font-mono text-[10px] text-orange-400">03 · AVENIR</p>
							<p class="mt-0.5 text-xs font-semibold text-white">Emploi & Freelance</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bandeau de réassurance -->
	<div class="mx-auto mt-5 max-w-7xl">
		<div
			class="grid grid-cols-2 gap-3 rounded-2xl border border-violet-900/10 bg-white p-4 shadow-sm sm:p-5 lg:grid-cols-4"
		>
			{#each REASSURANCE_ITEMS as item, idx (item.label)}
				<div
					class={cn(
						'flex items-center gap-3 px-2 py-1',
						idx < REASSURANCE_ITEMS.length - 1 ? 'lg:border-r lg:border-violet-900/10' : ''
					)}
				>
					<div
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600"
					>
						{#if idx === 0}
							<Award class="h-5 w-5" aria-hidden="true" />
						{:else if idx === 1}
							<Cpu class="h-5 w-5" aria-hidden="true" />
						{:else if idx === 2}
							<Terminal class="h-5 w-5" aria-hidden="true" />
						{:else}
							<Globe2 class="h-5 w-5" aria-hidden="true" />
						{/if}
					</div>
					<div>
						<p class="font-display text-base font-extrabold text-violet-900 sm:text-lg">
							{item.value}
						</p>
						<p class="text-xs font-medium text-ink-muted">{item.label}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
