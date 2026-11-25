<script lang="ts">
	import { ArrowUpRight, Globe2 } from '@lucide/svelte';
	import BrandLogo from './BrandLogo.svelte';
	import { NAV_LINKS, PROGRAMS, SITE_INFO } from '#lib/data/academy.ts';
</script>

<footer class="bg-violet-950 px-4 pt-16 pb-10 text-white sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="grid gap-10 border-b border-white/12 pb-12 md:grid-cols-12">
			<div class="space-y-4 md:col-span-5">
				<BrandLogo variant="dark-bg" />
				<p class="max-w-sm text-sm leading-relaxed text-violet-100/80">
					Centre de formation professionnelle certifiante (DQP & CQP) à Bafoussam, adossé au cabinet
					tech <strong class="text-white">{SITE_INFO.parentCompany}</strong>. Passerelle
					d’excellence Cameroun ↔ France.
				</p>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3.5 py-1.5 font-mono text-xs text-orange-400"
				>
					<Globe2 class="h-3.5 w-3.5" aria-hidden="true" />
					<span>{SITE_INFO.domain}</span>
				</div>
			</div>

			<div class="md:col-span-3">
				<h2 class="font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
					Navigation
				</h2>
				<ul class="mt-4 space-y-2.5 text-sm text-violet-100/80">
					{#each NAV_LINKS as item (item.href)}
						<li>
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a href={item.href} class="transition-colors hover:text-white">
								{item.label}
							</a>
						</li>
					{/each}
					<li>
						<a href="#preinscription" class="font-semibold text-orange-400 hover:underline">
							Pré-inscription
						</a>
					</li>
				</ul>
			</div>

			<div class="md:col-span-4">
				<h2 class="font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
					Les 7 Pôles Métiers
				</h2>
				<ul class="mt-4 grid grid-cols-1 gap-2 text-sm text-violet-100/80">
					{#each PROGRAMS as prog (prog.id)}
						<li>
							<a
								href="#filieres"
								class="inline-flex items-center gap-1.5 transition-colors hover:text-white"
							>
								<span class="font-mono text-xs text-orange-400">{prog.index}</span>
								<span>{prog.title}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div
			class="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-violet-100/65 sm:flex-row sm:items-center"
		>
			<p>
				© {new Date().getFullYear()}
				{SITE_INFO.name} — Propulsé par le cabinet {SITE_INFO.parentCompany}.
			</p>
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href={SITE_INFO.parentUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1 font-semibold text-violet-100 hover:text-orange-400"
			>
				<span>Découvrir le cabinet {SITE_INFO.parentCompany}</span>
				<ArrowUpRight class="h-3.5 w-3.5" aria-hidden="true" />
			</a>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		</div>
	</div>
</footer>
