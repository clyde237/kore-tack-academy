<script lang="ts">
	import Navbar from '#lib/components/Navbar.svelte';
	import HeroSection from '#lib/components/HeroSection.svelte';
	import ProgramsSection from '#lib/components/ProgramsSection.svelte';
	import VisionMethodSection from '#lib/components/VisionMethodSection.svelte';
	import AudienceSection from '#lib/components/AudienceSection.svelte';
	import CertificationsSection from '#lib/components/CertificationsSection.svelte';
	import PartnersSection from '#lib/components/PartnersSection.svelte';
	import FaqSection from '#lib/components/FaqSection.svelte';
	import PreInscriptionSection from '#lib/components/PreInscriptionSection.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let selectedProgramId = $state('developpement-logiciel');
	let selectedTrack = $state<'CQP' | 'DQP'>('DQP');
	let selectedProfile = $state('Jeune / Bachelier');

	function scrollToPreInscription() {
		document.getElementById('preinscription')?.scrollIntoView({ behavior: 'smooth' });
	}

	function handleProgramApply(programId: string) {
		selectedProgramId = programId;
		if (programId === 'bureautique-collaboratif') {
			selectedTrack = 'CQP';
		}
		scrollToPreInscription();
	}

	function handlePersonaAction(personaId: string) {
		if (personaId === 'jeunes') {
			selectedProfile = 'Jeune / Bachelier';
			document.getElementById('filieres')?.scrollIntoView({ behavior: 'smooth' });
			return;
		}
		if (personaId === 'parents') {
			selectedProfile = 'Parent / Prescripteur';
		} else if (personaId === 'reconversion') {
			selectedProfile = 'Professionnel en reconversion';
			selectedTrack = 'CQP';
		} else if (personaId === 'entreprises') {
			selectedProfile = 'Entreprise / Partenaire B2B';
		}
		scrollToPreInscription();
	}

	function handleChooseTrack(track: 'CQP' | 'DQP') {
		selectedTrack = track;
		scrollToPreInscription();
	}
</script>

<div class="min-h-dvh bg-paper text-ink">
	<a
		href="#main-content"
		class="visually-hidden focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
	>
		Aller au contenu principal
	</a>

	<Navbar onOpenPreInscription={scrollToPreInscription} />

	<main id="main-content">
		<HeroSection onQuickApply={() => scrollToPreInscription()} />
		<ProgramsSection onSelectForApply={handleProgramApply} />
		<VisionMethodSection />
		<AudienceSection onActionClick={handlePersonaAction} />
		<CertificationsSection onChooseTrack={handleChooseTrack} />
		<PartnersSection onBecomePartner={() => handlePersonaAction('entreprises')} />
		<FaqSection />
		<PreInscriptionSection bind:selectedProgramId bind:selectedTrack bind:selectedProfile />
	</main>

	<Footer />
</div>
