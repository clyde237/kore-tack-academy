<script lang="ts">
	import { Menu, X, ArrowUpRight, MessageCircle, Sparkles } from '@lucide/svelte';
	import BrandLogo from './BrandLogo.svelte';
	import { NAV_LINKS, SITE_INFO } from '#lib/data/academy.ts';
	import { cn } from '#lib/utils/cn.ts';

	interface Props {
		onOpenPreInscription?: () => void;
	}

	let { onOpenPreInscription }: Props = $props();

	let showAnnouncement = $state(true);
	let scrolled = $state(false);
	let activeHash = $state('#filieres');
	let mobileMenuEl = $state<HTMLUListElement | null>(null);
	let menuButtonEl = $state<HTMLButtonElement | null>(null);

	$effect(() => {
		const updateScroll = () => {
			scrolled = window.scrollY > 24;
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
			const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
			document.documentElement.style.setProperty('--scroll-progress', ratio.toFixed(4));
		};

		updateScroll();
		window.addEventListener('scroll', updateScroll, { passive: true });
		return () => window.removeEventListener('scroll', updateScroll);
	});

	function positionMobilePopover() {
		if (!mobileMenuEl || !menuButtonEl) return;
		if (typeof CSS !== 'undefined' && CSS.supports('top', 'anchor(--kt-menu-btn bottom)')) {
			return;
		}
		const rect = menuButtonEl.getBoundingClientRect();
		mobileMenuEl.style.top = `${Math.round(rect.bottom + 8)}px`;
	}

	function handleMobileNavClick(href: string) {
		activeHash = href;
		try {
			mobileMenuEl?.hidePopover();
		} catch {
			// Fallback if popover API is unavailable
		}
	}

	function handleCtaClick(e: MouseEvent) {
		if (onOpenPreInscription) {
			e.preventDefault();
			onOpenPreInscription();
		}
	}
</script>

{#if showAnnouncement}
	<div
		class="relative z-50 border-b border-white/10 bg-violet-950 px-4 py-2 text-xs text-white/90 sm:text-sm"
	>
		<div class="mx-auto flex max-w-7xl items-center justify-between gap-3">
			<p class="flex items-center gap-2 font-medium">
				<span
					class="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-orange-400"
				>
					<Sparkles class="h-3 w-3" aria-hidden="true" />
					NOUVEAU
				</span>
				<span>
					<strong class="font-semibold text-white">Bafoussam ↔ Paris</strong> — {SITE_INFO.nextCohort}
				</span>
			</p>
			<div class="flex items-center gap-3">
				<a
					href="#preinscription"
					class="hidden items-center gap-1 font-semibold text-orange-400 underline-offset-4 hover:underline sm:inline-flex"
				>
					Réserver ma place
					<ArrowUpRight class="h-3.5 w-3.5" aria-hidden="true" />
				</a>
				<button
					type="button"
					onclick={() => (showAnnouncement = false)}
					aria-label="Fermer l’annonce"
					class="rounded-md p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
				>
					<X class="h-4 w-4" aria-hidden="true" />
				</button>
			</div>
		</div>
	</div>
{/if}

<header
	class={cn(
		'sticky top-0 z-40 transition-all duration-300',
		scrolled
			? 'border-b border-violet-900/10 bg-paper/90 py-2.5 shadow-sm backdrop-blur-md'
			: 'border-b border-transparent bg-paper/75 py-4 backdrop-blur-sm'
	)}
>
	<!-- Scroll progress hairline -->
	<div
		aria-hidden="true"
		class="scroll-progress-bar pointer-events-none absolute inset-x-0 bottom-0 h-[2.5px] bg-orange-500"
	></div>

	<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
		<a
			href="#top"
			class="shrink-0 rounded-lg transition-transform duration-200 hover:scale-[1.01]"
			aria-label="Kore-TecK Academy — Retour à l’accueil"
		>
			<BrandLogo variant="light-bg" />
		</a>

		<nav aria-label="Navigation principale" class="flex items-center gap-2 lg:gap-6">
			<!-- Desktop inline navigation -->
			<ul class="hidden items-center gap-1 lg:flex">
				{#each NAV_LINKS as item (item.href)}
					<li>
						<!-- eslint-disable svelte/no-navigation-without-resolve -->
						<a
							href={item.href}
							onclick={() => (activeHash = item.href)}
							aria-current={activeHash === item.href ? 'location' : undefined}
							class={cn(
								'relative rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors',
								activeHash === item.href
									? 'text-violet-900'
									: 'text-ink-muted hover:bg-violet-900/5 hover:text-violet-900'
							)}
						>
							{item.label}
							{#if activeHash === item.href}
								<span
									aria-hidden="true"
									class="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-orange-500"
								></span>
							{/if}
						</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					</li>
				{/each}
			</ul>

			<!-- Desktop actions -->
			<div class="hidden items-center gap-2.5 sm:flex">
				<a
					href={`https://wa.me/${SITE_INFO.whatsappNumber}`}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 rounded-full border border-violet-900/15 bg-white px-4 py-2 text-sm font-semibold text-violet-900 transition-colors hover:border-violet-900/30 hover:bg-violet-50"
				>
					<MessageCircle class="h-4 w-4 text-orange-600" aria-hidden="true" />
					<span>WhatsApp</span>
				</a>
				<a
					href="#preinscription"
					onclick={handleCtaClick}
					class="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-orange-600 active:translate-y-0"
				>
					<span>Se pré-inscrire</span>
					<ArrowUpRight class="h-4 w-4" aria-hidden="true" />
				</a>
			</div>

			<!-- Mobile popover menu button -->
			<button
				bind:this={menuButtonEl}
				type="button"
				popovertarget="mobile-site-menu"
				popovertargetaction="toggle"
				aria-controls="mobile-site-menu"
				style="anchor-name: --kt-menu-btn;"
				class="inline-flex items-center gap-2 rounded-full border border-violet-900/15 bg-white px-3.5 py-2 text-sm font-semibold text-violet-900 shadow-xs lg:hidden"
			>
				<Menu class="h-4 w-4" aria-hidden="true" />
				<span>Menu</span>
			</button>

			<!-- Mobile native popover menu -->
			<ul
				bind:this={mobileMenuEl}
				id="mobile-site-menu"
				popover="auto"
				ontoggle={(e) => {
					if ((e as ToggleEvent).newState === 'open') {
						positionMobilePopover();
					}
				}}
				class="kt-mobile-menu fixed inset-x-4 z-50 m-0 max-h-[75dvh] w-auto overflow-auto rounded-2xl border border-violet-900/12 bg-white p-3 shadow-2xl lg:hidden"
			>
				<li
					class="mb-1 flex items-center justify-between border-b border-violet-900/10 px-3 pt-1 pb-2.5"
				>
					<span class="font-mono text-xs font-bold tracking-wider text-orange-600 uppercase">
						Navigation
					</span>
					<button
						type="button"
						onclick={() => mobileMenuEl?.hidePopover()}
						aria-label="Fermer le menu"
						class="rounded-full p-1 text-ink-muted hover:bg-violet-50 hover:text-violet-900"
					>
						<X class="h-4 w-4" aria-hidden="true" />
					</button>
				</li>
				{#each NAV_LINKS as item (item.href)}
					<li>
						<!-- eslint-disable svelte/no-navigation-without-resolve -->
						<a
							href={item.href}
							onclick={() => handleMobileNavClick(item.href)}
							class="flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-violet-900 transition-colors hover:bg-violet-50"
						>
							<span>{item.label}</span>
							<ArrowUpRight class="h-4 w-4 text-orange-500" aria-hidden="true" />
						</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					</li>
				{/each}
				<li class="mt-2 border-t border-violet-900/10 pt-3">
					<a
						href="#preinscription"
						onclick={() => handleMobileNavClick('#preinscription')}
						class="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white"
					>
						<span>Se pré-inscrire maintenant</span>
						<ArrowUpRight class="h-4 w-4" aria-hidden="true" />
					</a>
				</li>
			</ul>
		</nav>
	</div>
</header>
