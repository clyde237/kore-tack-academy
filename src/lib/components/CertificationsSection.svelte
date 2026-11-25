<script lang="ts">
	import { Check, ArrowRight, Clock, Award } from '@lucide/svelte';
	import { CERTIFICATIONS } from '#lib/data/academy.ts';
	import { cn } from '#lib/utils/cn.ts';

	interface Props {
		onChooseTrack: (track: 'CQP' | 'DQP') => void;
	}

	let { onChooseTrack }: Props = $props();
</script>

<section id="certifications" class="bg-violet-50/70 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<div class="mx-auto max-w-2xl text-center">
			<p class="font-mono text-xs font-bold tracking-[0.2em] text-orange-600 uppercase">
				Deux niveaux de qualification
			</p>
			<h2 class="mt-2 font-display text-3xl font-extrabold text-violet-900 sm:text-4xl">
				Parcours CQP vs DQP : lequel correspond à votre rythme ?
			</h2>
			<p class="mt-3 text-base text-ink-muted">
				Que vous visiez une montée en compétences rapide ou une expertise complète sur 12 mois,
				chaque parcours valide un savoir-faire concret devant jury.
			</p>
		</div>

		<div class="mt-12 grid gap-6 lg:grid-cols-2">
			{#each CERTIFICATIONS as cert (cert.code)}
				{@const isDqp = cert.code === 'DQP'}
				<article
					class={cn(
						'flex flex-col justify-between rounded-3xl p-7 transition-all sm:p-9',
						isDqp
							? 'border-2 border-violet-900 bg-violet-900 text-white shadow-xl shadow-violet-900/15'
							: 'border border-violet-900/15 bg-white text-ink shadow-sm'
					)}
				>
					<div>
						<div class="flex flex-wrap items-center justify-between gap-3">
							<span
								class={cn(
									'inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-xs font-bold uppercase',
									isDqp ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600'
								)}
							>
								<Award class="h-3.5 w-3.5" aria-hidden="true" />
								Parcours {cert.code}
							</span>

							<span
								class={cn(
									'inline-flex items-center gap-1.5 font-mono text-xs font-semibold',
									isDqp ? 'text-violet-100' : 'text-ink-muted'
								)}
							>
								<Clock class="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />
								{cert.duration}
							</span>
						</div>

						<h3
							class={cn(
								'mt-4 font-display text-2xl font-extrabold sm:text-3xl',
								isDqp ? 'text-white' : 'text-violet-900'
							)}
						>
							{cert.fullName}
						</h3>

						<p
							class={cn(
								'mt-2 text-base font-medium',
								isDqp ? 'text-orange-400' : 'text-orange-600'
							)}
						>
							{cert.tagline}
						</p>

						<div
							class={cn(
								'mt-5 rounded-2xl p-4 text-sm',
								isDqp ? 'bg-white/8 text-violet-100' : 'bg-violet-50 text-ink'
							)}
						>
							<span class="font-bold">Pour qui ?</span>
							{cert.idealFor}
						</div>

						<ul class="mt-6 space-y-3">
							{#each cert.highlights as item (item)}
								<li class="flex items-start gap-3 text-sm sm:text-base">
									<span
										class={cn(
											'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
											isDqp ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-50 text-orange-600'
										)}
									>
										<Check class="h-3.5 w-3.5" aria-hidden="true" />
									</span>
									<span class={isDqp ? 'text-violet-100/90' : 'text-ink-muted'}>{item}</span>
								</li>
							{/each}
						</ul>
					</div>

					<div
						class={cn(
							'mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6',
							isDqp ? 'border-white/15' : 'border-violet-900/10'
						)}
					>
						<p class={cn('font-mono text-xs', isDqp ? 'text-violet-100/75' : 'text-ink-muted')}>
							{cert.pedagogy}
						</p>
						<button
							type="button"
							onclick={() => onChooseTrack(cert.code)}
							class={cn(
								'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all',
								isDqp
									? 'bg-orange-500 text-white hover:bg-orange-600'
									: 'bg-violet-900 text-white hover:bg-violet-800'
							)}
						>
							<span>Choisir le {cert.code}</span>
							<ArrowRight class="h-4 w-4" aria-hidden="true" />
						</button>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
