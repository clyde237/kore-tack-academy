<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Kore-TecK Academy — Formations Numériques Certifiantes DQP & CQP à Bafoussam</title>
	<meta
		name="description"
		content="Kore-TecK Academy forme la nouvelle génération de talents tech à Bafoussam (passerelle Cameroun ↔ France) : Développement Logiciel, IA, Réseaux & Sécurité, Bureautique, Design, Audiovisuel, Marketing Digital."
	/>
</svelte:head>

{@render children()}
