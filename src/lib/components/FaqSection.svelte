<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { FAQ_ITEMS } from '#lib/data/academy.ts';

	let faqContainer = $state<HTMLElement | null>(null);
	let allExpanded = $state(false);

	function toggleAllItems() {
		if (!faqContainer) return;
		const nextState = !allExpanded;
		const detailsList = faqContainer.querySelectorAll<HTMLDetailsElement>('details.kt-accordion');
		for (const d of detailsList) {
			d.open = nextState;
		}
		allExpanded = nextState;
	}

	function syncAllExpanded() {
		if (!faqContainer) return;
		const items = Array.from(
			faqContainer.querySelectorAll<HTMLDetailsElement>('details.kt-accordion')
		);
		allExpanded = items.length > 0 && items.every((d) => d.open);
	}
</script>

<section id="faq" bind:this={faqContainer} class="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				<p class="font-mono text-xs font-bold tracking-[0.2em] text-orange-600 uppercase">
					Questions fréquentes
				</p>
				<h2
					id="faq-heading"
					class="mt-2 font-display text-3xl font-extrabold text-violet-900 sm:text-4xl"
				>
					Tout savoir avant de vous lancer.
				</h2>
			</div>

			<button
				type="button"
				aria-expanded={allExpanded}
				onclick={toggleAllItems}
				class="rounded-full border border-violet-900/15 bg-white px-4 py-2 text-xs font-bold text-violet-900 transition-colors hover:bg-violet-50"
			>
				{allExpanded ? 'Tout refermer' : 'Tout déplier'}
			</button>
		</div>

		<div class="mt-8 space-y-3" role="region" aria-labelledby="faq-heading">
			{#each FAQ_ITEMS as item, idx (item.id)}
				<details
					open={idx === 0}
					ontoggle={syncAllExpanded}
					class="kt-accordion group rounded-2xl border border-violet-900/12 bg-white transition-colors open:border-violet-900/25 open:shadow-sm"
				>
					<summary
						class="flex cursor-pointer items-center gap-3 px-5 py-4.5 text-left font-display text-base font-bold text-violet-900 select-none sm:px-6 sm:text-lg"
					>
						<ChevronDown
							aria-hidden="true"
							class="h-5 w-5 shrink-0 -rotate-90 text-orange-500 transition-transform duration-200 group-open:rotate-0"
						/>
						<span>{item.question}</span>
					</summary>
					<div
						class="border-t border-violet-900/8 px-5 pt-3 pb-5 pl-13 text-sm leading-relaxed text-ink-muted sm:px-6 sm:pl-14 sm:text-base"
					>
						{item.answer}
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>
