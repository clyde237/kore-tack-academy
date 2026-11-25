<script lang="ts">
	import { cn } from '#lib/utils/cn.ts';

	interface Props {
		variant?: 'light-bg' | 'dark-bg';
		compact?: boolean;
		class?: string;
	}

	let { variant = 'light-bg', compact = false, class: className = '' }: Props = $props();
</script>

{#if variant === 'light-bg' && !compact}
	<span class={cn('inline-flex items-center', className)}>
		<img
			src="/images/logo-full.png"
			alt="Kore-TecK Academy"
			class="h-10 w-auto object-contain sm:h-11"
			width="176"
			height="57"
			decoding="async"
		/>
	</span>
{:else}
	<span class={cn('inline-flex items-center gap-3', className)}>
		<span
			class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-violet-900/10"
		>
			<img
				src="/images/logo-mark.png"
				alt=""
				aria-hidden="true"
				class="h-full w-full object-contain"
				width="32"
				height="36"
				decoding="async"
			/>
		</span>
		{#if !compact}
			<span class="flex flex-col leading-none">
				<span
					class={cn(
						'font-display text-lg font-extrabold tracking-tight sm:text-xl',
						variant === 'dark-bg' ? 'text-white' : 'text-violet-900'
					)}
				>
					Kore-TecK
				</span>
				<span
					class="font-mono text-[10px] font-semibold tracking-[0.26em] text-orange-500 uppercase"
				>
					ACADEMY
				</span>
			</span>
		{/if}
	</span>
{/if}
