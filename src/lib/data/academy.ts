export type ProgramCategory = 'all' | 'tech-ia' | 'infra-bureautique' | 'creation-marketing';
export type TrackFilter = 'all' | 'CQP' | 'DQP';

export interface AcademyProgram {
	id: string;
	code: string;
	index: string;
	title: string;
	shortTitle: string;
	category: Exclude<ProgramCategory, 'all'>;
	categoryLabel: string;
	tracks: ('CQP' | 'DQP')[];
	durationLabel: string;
	outcome: string;
	description: string;
	modules: string[];
	tools: string[];
	careers: string[];
	iconName: 'code' | 'sparkles' | 'shield' | 'briefcase' | 'palette' | 'film' | 'trending';
	accentTone: 'violet' | 'orange';
}

export interface PersonaProfile {
	id: string;
	tabLabel: string;
	title: string;
	subtitle: string;
	expectations: string[];
	academyAnswer: string;
	ctaLabel: string;
}

export interface CertificationTrack {
	code: 'CQP' | 'DQP';
	fullName: string;
	tagline: string;
	duration: string;
	idealFor: string;
	highlights: string[];
	pedagogy: string;
}

export interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

export interface PartnerItem {
	id: string;
	name: string;
	sector: string;
	logoSrc: string;
	alt: string;
	width: number;
	height: number;
}

export const SITE_INFO = {
	name: 'Kore-TecK Academy',
	domain: 'academy.kore-teck.com',
	parentCompany: 'Kore-TecK',
	parentUrl: 'https://kore-teck.com',
	locationPrimary: 'Bafoussam, Cameroun',
	locationBridge: 'Paris, France',
	email: 'contact@academy.kore-teck.com',
	phoneDisplay: '+237 6 00 00 00 00',
	whatsappNumber: '237600000000',
	nextCohort: 'Prochaine rentrée — Places limitées par cohorte'
} as const;

export const NAV_LINKS = [
	{ label: 'Filières', href: '#filieres' },
	{ label: 'Certifications', href: '#certifications' },
	{ label: 'Partenaires', href: '#partenaires' },
	{ label: 'La Méthode', href: '#vision' },
	{ label: 'Profils & B2B', href: '#cibles' },
	{ label: 'FAQ', href: '#faq' }
] as const;

export const PARTNERS: PartnerItem[] = [
	{
		id: 'atalaya',
		name: 'Atalaya Pictures Live',
		sector: 'Production Audiovisuelle & Live',
		logoSrc: '/partenaires/ATALAYA%20LOGO_Plan%20de%20travail%201%20copie%206.png',
		alt: 'Logo du partenaire Atalaya Pictures Live',
		width: 2010,
		height: 520
	},
	{
		id: 'nkwangtech',
		name: 'Foundation NkwangTech',
		sector: 'Innovation & Impact Tech',
		logoSrc: '/partenaires/logo-nkwangtech.jpeg',
		alt: 'Logo du partenaire Foundation NkwangTech',
		width: 447,
		height: 447
	},
	{
		id: 'weloobe',
		name: 'Weloobe',
		sector: 'Écosystème & Solutions Digitales',
		logoSrc: '/partenaires/logo_weloobe.png',
		alt: 'Logo du partenaire Weloobe',
		width: 738,
		height: 261
	}
];

export const REASSURANCE_ITEMS = [
	{ label: 'Certifications reconnues', value: 'DQP & CQP' },
	{ label: 'Filières spécialisées', value: '7 Pôles Métiers' },
	{ label: 'Pédagogie active', value: '100 % Pratique' },
	{ label: 'Passerelle cabinet', value: 'Bafoussam ↔ Paris' }
] as const;

export const PROGRAMS: AcademyProgram[] = [
	{
		id: 'developpement-logiciel',
		code: 'DEV',
		index: '01',
		title: 'Développement Logiciel',
		shortTitle: 'Dev Logiciel',
		category: 'tech-ia',
		categoryLabel: 'Tech & IA',
		tracks: ['CQP', 'DQP'],
		durationLabel: 'CQP 6 mois · DQP 12 mois',
		outcome: 'Concevoir, coder et déployer des applications web, mobiles et métiers complètes.',
		description:
			'Maîtrisez l’architecture moderne du code en conditions réelles de cabinet : interfaces réactives, API sécurisées, bases de données et mise en production.',
		modules: [
			'Algorithmique appliquée, Git & architecture logicielle',
			'Développement Frontend moderne (TypeScript, SvelteKit / React)',
			'Backend, API REST, bases de données SQL & sécurité',
			'Applications mobiles & déploiement cloud continu'
		],
		tools: ['TypeScript', 'Python', 'PostgreSQL', 'Docker', 'Git'],
		careers: [
			'Développeur Web Full-Stack',
			'Développeur Mobile & Applicatif',
			'Intégrateur / Développeur Frontend',
			'Développeur Freelance'
		],
		iconName: 'code',
		accentTone: 'violet'
	},
	{
		id: 'intelligence-artificielle',
		code: 'IA',
		index: '02',
		title: 'Intelligence Artificielle (IA)',
		shortTitle: 'Intelligence Artificielle',
		category: 'tech-ia',
		categoryLabel: 'Tech & IA',
		tracks: ['CQP', 'DQP'],
		durationLabel: 'CQP 4–6 mois · DQP 12 mois',
		outcome:
			'Exploiter l’IA générative, automatiser des processus et intégrer des modèles en entreprise.',
		description:
			'Passez de l’usage basique à l’ingénierie concrète : prompt engineering avancé, automatisation de workflows métiers, agents IA et intégration API.',
		modules: [
			'Fondamentaux de l’IA & ingénierie de prompts professionnels',
			'Automatisation no-code / low-code & workflows d’entreprise',
			'Python pour la donnée & intégration d’API LLM / RAG',
			'Éthique, confidentialité des données & cas pratiques cabinet'
		],
		tools: ['Python', 'API LLM', 'n8n / Make', 'RAG', 'Data Analytics'],
		careers: [
			'Spécialiste Automatisation & IA',
			'Intégrateur de Solutions IA',
			'Consultant Productivité IA',
			'Analyste Data & IA Junior'
		],
		iconName: 'sparkles',
		accentTone: 'orange'
	},
	{
		id: 'reseaux-securite',
		code: 'NET',
		index: '03',
		title: 'Réseaux & Sécurité Informatique',
		shortTitle: 'Réseaux & Sécurité',
		category: 'infra-bureautique',
		categoryLabel: 'Infra & Bureautique',
		tracks: ['CQP', 'DQP'],
		durationLabel: 'CQP 6 mois · DQP 12 mois',
		outcome:
			'Administrer des systèmes, sécuriser les réseaux d’entreprise et prévenir les cybermenaces.',
		description:
			'Apprenez à bâtir, superviser et défendre des infrastructures fiables : câblage, routage, administration Linux/Windows Server et hygiène cybersécurité.',
		modules: [
			'Architecture réseaux TCP/IP, switching & routage',
			'Administration systèmes Linux & Windows Server',
			'Pare-feu, VPN, sauvegardes & durcissement système',
			'Diagnostic incidents, audit de vulnérabilités & support N2'
		],
		tools: ['Linux', 'Cisco / MikroTik', 'pfSense', 'Virtualisation', 'Wireshark'],
		careers: [
			'Administrateur Systèmes & Réseaux',
			'Technicien Support & Infrastructure',
			'Assistant Analyste Cybersécurité',
			'Gestionnaire de Parc Informatique'
		],
		iconName: 'shield',
		accentTone: 'violet'
	},
	{
		id: 'bureautique-collaboratif',
		code: 'BUR',
		index: '04',
		title: 'Bureautique & Outils Collaboratifs',
		shortTitle: 'Bureautique Avancée',
		category: 'infra-bureautique',
		categoryLabel: 'Infra & Bureautique',
		tracks: ['CQP'],
		durationLabel: 'CQP 3 mois intensifs',
		outcome: 'Piloter sa productivité administrative et collaborative avec rigueur et rapidité.',
		description:
			'Bien plus que du traitement de texte : tableaux de bord décisionnels, automatisation bureautique, gestion documentaire cloud et présentation exécutive.',
		modules: [
			'Excel avancé : formules, tableaux croisés & reporting',
			'Rédaction structurée (Word) & présentations percutantes',
			'Suite collaborative Cloud (Google Workspace / Microsoft 365)',
			'Organisation digitale, gestion de réunions & assistants IA'
		],
		tools: ['Excel Avancé', 'PowerPoint', 'Google Workspace', 'Microsoft 365', 'Notion'],
		careers: [
			'Assistant(e) de Direction Digital',
			'Gestionnaire Administratif & Reporting',
			'Secrétaire Bureautique Polyvalent',
			'Opérateur de Saisie & Données'
		],
		iconName: 'briefcase',
		accentTone: 'orange'
	},
	{
		id: 'infographie-design',
		code: 'DES',
		index: '05',
		title: 'Infographie & Design Graphique',
		shortTitle: 'Design Graphique',
		category: 'creation-marketing',
		categoryLabel: 'Création & Marketing',
		tracks: ['CQP', 'DQP'],
		durationLabel: 'CQP 6 mois · DQP 12 mois',
		outcome: 'Créer des identités visuelles mémorables, supports print et interfaces digitales.',
		description:
			'Maîtrisez la grammaire visuelle (typographie, couleur, composition) et les logiciels de référence pour concevoir logos, chartes graphiques et maquettes web.',
		modules: [
			'Fondamentaux graphiques : typographie, grille & colorimétrie',
			'Identité visuelle, logos & vectoriel professionnel',
			'Retouche photo, affiches print & packaging',
			'Design d’interfaces UI/UX & prototypage interactif'
		],
		tools: ['Illustrator', 'Photoshop', 'Figma', 'InDesign', 'Canva Pro'],
		careers: [
			'Infographiste / Designer Graphique',
			'Brand Designer Junior',
			'UI Designer Web & Mobile',
			'Directeur Artistique Junior en agence'
		],
		iconName: 'palette',
		accentTone: 'violet'
	},
	{
		id: 'audiovisuel',
		code: 'AUD',
		index: '06',
		title: 'Audiovisuel',
		shortTitle: 'Audiovisuel & Vidéo',
		category: 'creation-marketing',
		categoryLabel: 'Création & Marketing',
		tracks: ['CQP', 'DQP'],
		durationLabel: 'CQP 6 mois · DQP 12 mois',
		outcome:
			'Tourner, monter et habiller des contenus vidéo professionnels prêts pour la diffusion.',
		description:
			'De la prise de vue au montage final : cadrage, prise de son, étalonnage couleur, motion design et formats courts ou institutionnels.',
		modules: [
			'Prise de vue, lumière, cadrage & prise de son claire',
			'Montage narratif & rythme sur Premiere Pro / DaVinci',
			'Étalonnage colorimétrique & mixage audio',
			'Motion design, habillage vidéo & formats réseaux sociaux'
		],
		tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'CapCut Pro', 'Audition'],
		careers: [
			'Monteur Vidéo Professionnel',
			'Vidéaste & Réalisateur Corporate',
			'Motion Designer Junior',
			'Créateur de Contenus Multimédias'
		],
		iconName: 'film',
		accentTone: 'orange'
	},
	{
		id: 'marketing-digital',
		code: 'MKT',
		index: '07',
		title: 'Marketing Digital',
		shortTitle: 'Marketing Digital',
		category: 'creation-marketing',
		categoryLabel: 'Création & Marketing',
		tracks: ['CQP', 'DQP'],
		durationLabel: 'CQP 6 mois · DQP 12 mois',
		outcome: 'Bâtir des stratégies d’acquisition, animer des communautés et convertir en ligne.',
		description:
			'Apprenez à générer de la croissance mesurable pour les entreprises : stratégie de contenu, publicité ciblée Meta/Google, SEO et analyse de performance.',
		modules: [
			'Stratégie digitale, tunnel de conversion & copywriting',
			'Community management & calendrier éditorial multicanal',
			'Publicité payante (Meta Ads, Google Ads) & ciblage local',
			'Référencement naturel (SEO), Analytics & reporting ROI'
		],
		tools: ['Meta Business', 'Google Ads', 'GA4', 'Search Console', 'IA Copywriting'],
		careers: [
			'Chargé de Marketing Digital',
			'Community & Content Manager',
			'Traffic Manager Junior',
			'Consultant Visibilité PME'
		],
		iconName: 'trending',
		accentTone: 'violet'
	}
];

export const HORIZONS = [
	{
		number: '01',
		title: 'Excellence locale aux standards globaux',
		description:
			'Offrir à Bafoussam et au Cameroun un niveau d’exigence pédagogique et technique aligné sur les pratiques européennes et internationales.'
	},
	{
		number: '02',
		title: 'Appropriation concrète de l’innovation',
		description:
			'Faire de l’intelligence artificielle et des métiers du digital des leviers d’émancipation économique accessibles à tous.'
	},
	{
		number: '03',
		title: 'Un écosystème complet et vertueux',
		description:
			'Relier la formation (Academy), la pratique réelle en entreprise (cabinet Kore-TecK) et l’insertion durable (partenaires & entrepreneuriat).'
	}
] as const;

export const MISSION_ENGAGEMENTS = [
	{
		title: 'Former par la pratique (Learning by Doing)',
		description:
			'Ateliers quotidiens, cas clients inspirés du cabinet Kore-TecK et résolution de vrais problèmes métiers plutôt que la mémorisation passive.'
	},
	{
		title: 'Certifier les compétences (DQP & CQP)',
		description:
			'Préparation rigoureuse aux qualifications professionnelles reconnues pour valoriser chaque parcours auprès des employeurs.'
	},
	{
		title: 'Accompagner vers l’emploi et l’autonomie',
		description:
			'Portfolio de projets concrets, simulation d’entretiens, posture freelance et mise en relation avec l’écosystème d’entreprises.'
	},
	{
		title: 'Maintenir des programmes vivants',
		description:
			'Contenus actualisés en continu : intégration native de l’IA, outils de développement actuels, sécurité et création digitale.'
	}
] as const;

export const VALUES = [
	{
		code: 'V1',
		title: 'Pragmatisme & Excellence',
		summary: 'Chaque heure de formation rapproche l’apprenant de la maîtrise concrète d’un métier.'
	},
	{
		code: 'V2',
		title: 'Innovation utile',
		summary: 'Intégrer les technologies modernes, notamment l’IA, pour résoudre des besoins réels.'
	},
	{
		code: 'V3',
		title: 'Exigence bienveillante',
		summary: 'Un encadrement structuré, humain et exigeant qui pousse chacun à se dépasser.'
	},
	{
		code: 'V4',
		title: 'Proximité & Accessibilité',
		summary: 'Un ancrage fort à Bafoussam ouvert sur le monde, rendant la tech compréhensible.'
	},
	{
		code: 'V5',
		title: 'Impact & Employabilité',
		summary:
			'Notre véritable indicateur de réussite est l’insertion professionnelle de nos diplômés.'
	}
] as const;

export const PERSONAS: PersonaProfile[] = [
	{
		id: 'jeunes',
		tabLabel: 'Jeunes & Bacheliers',
		title: 'Lancer une vraie carrière dans la tech',
		subtitle:
			'Étudiants, bacheliers ou jeunes diplômés cherchant un métier concret, moderne et recherché.',
		expectations: [
			'Des débouchés clairs en entreprise, en agence ou en freelance',
			'Une durée maîtrisée et une progression 100 % orientée projets',
			'Une qualification officielle DQP ou CQP reconnue sur le marché'
		],
		academyAnswer:
			'Vous sortez avec un portfolio de réalisations réelles, des outils actuels (dont l’IA) et une certification DQP/CQP qui atteste de votre savoir-faire.',
		ctaLabel: 'Choisir ma filière'
	},
	{
		id: 'parents',
		tabLabel: 'Parents & Prescripteurs',
		title: 'Investir dans une formation sérieuse et encadrée',
		subtitle:
			'Décideurs familiaux souhaitant offrir à leurs enfants un avenir professionnel solide et sécurisé à Bafoussam.',
		expectations: [
			'La crédibilité institutionnelle et la valeur officielle des diplômes DQP/CQP',
			'Un encadrement strict, assidu et bienveillant en présentiel',
			'L’adossement à un véritable cabinet tech actif (Kore-TecK)'
		],
		academyAnswer:
			'Vos enfants sont suivis dans un cadre structuré à Bafoussam, aux standards franco-camerounais, avec des évaluations pratiques régulières et un suivi vers l’emploi.',
		ctaLabel: 'Contacter un conseiller'
	},
	{
		id: 'reconversion',
		tabLabel: 'Professionnels & Reconversion',
		title: 'Monter en compétences rapidement et efficacement',
		subtitle:
			'Salariés, indépendants ou entrepreneurs voulant intégrer l’IA, la bureautique avancée ou le digital.',
		expectations: [
			'Des parcours courts et ciblés (CQP) avec retour sur investissement immédiat',
			'Des cas pratiques applicables dès le lendemain au travail',
			'Des créneaux adaptés aux contraintes professionnelles'
		],
		academyAnswer:
			'Nos modules intensifs (Bureautique, IA, Marketing Digital, Infographie) vous rendent autonome rapidement sans détour académique superflu.',
		ctaLabel: 'Voir les parcours CQP'
	},
	{
		id: 'entreprises',
		tabLabel: 'Entreprises & Partenaires',
		title: 'Former vos équipes ou recruter des profils fiables',
		subtitle:
			'PME, institutions et organisations cherchant des talents immédiatement opérationnels ou de la formation sur mesure.',
		expectations: [
			'Des profils formés sur des méthodologies d’entreprise (Git, délais, qualité)',
			'L’expertise technique et conseil du cabinet Kore-TecK',
			'Des programmes intra-entreprise adaptés à vos outils'
		],
		academyAnswer:
			'Accédez à un vivier de diplômés formés aux réalités terrain et bénéficiez de plans de formation continue bâtis avec les consultants Kore-TecK.',
		ctaLabel: 'Échanger en B2B'
	}
];

export const CERTIFICATIONS: CertificationTrack[] = [
	{
		code: 'CQP',
		fullName: 'Certificat de Qualification Professionnelle',
		tagline: 'Parcours ciblé pour maîtriser rapidement un métier opérationnel.',
		duration: '3 à 6 mois intensifs',
		idealFor: 'Insertion rapide, reconversion ciblée ou spécialisation métier immédiate.',
		highlights: [
			'Concentration maximale sur la maîtrise technique d’un poste clé',
			'Ateliers pratiques intensifs & mise en situation réelle',
			'Évaluation par jury sur livrable professionnel concret',
			'Idéal pour démarrer rapidement en entreprise ou en freelance'
		],
		pedagogy: '80 % ateliers & projets · 20 % fondamentaux structurants'
	},
	{
		code: 'DQP',
		fullName: 'Diplôme de Qualification Professionnelle',
		tagline: 'Parcours approfondi pour acquérir une expertise métier complète et polyvalente.',
		duration: '12 mois (avec immersion projet)',
		idealFor: 'Bacheliers, jeunes talents et futurs experts visant une maîtrise complète.',
		highlights: [
			'Socle technique approfondi + gestion de projet & posture pro',
			'Projets transversaux encadrés par des praticiens du cabinet Kore-TecK',
			'Immersion pratique / stage de professionnalisation en fin de cycle',
			'Polyvalence forte ouvrant vers des postes à responsabilité ou l’entrepreneuriat'
		],
		pedagogy: 'Pratique intensive + projets longs + préparation insertion'
	}
];

export const FAQ_ITEMS: FaqItem[] = [
	{
		id: 'faq-1',
		question: 'Quelle est la différence entre le CQP et le DQP ?',
		answer:
			'Le CQP (Certificat de Qualification Professionnelle) est un parcours court et ciblé (3 à 6 mois) conçu pour devenir opérationnel rapidement sur un métier précis. Le DQP (Diplôme de Qualification Professionnelle) est un parcours approfondi (12 mois) qui couvre l’ensemble des compétences techniques, la gestion de projet et une immersion pratique poussée.'
	},
	{
		id: 'faq-2',
		question: 'Faut-il déjà savoir coder ou avoir un diplôme informatique pour s’inscrire ?',
		answer:
			'Non pour nos parcours d’entrée (CQP Bureautique, Infographie, Marketing Digital, ou la majorité des parcours débutants). Chaque filière précise les prérequis adaptés : la motivation, l’assiduité et un entretien d’orientation permettent de vous positionner au bon niveau dès le départ.'
	},
	{
		id: 'faq-3',
		question: 'En quoi Kore-TecK Academy se distingue-t-elle d’un centre classique ?',
		answer:
			'Kore-TecK Academy est directement adossée au cabinet tech actif Kore-TecK (Bafoussam ↔ Paris). Vous n’apprenez pas sur des exercices théoriques figés : vous travaillez avec les mêmes outils, méthodes de qualité et exigences de livraison que les équipes d’un cabinet professionnel.'
	},
	{
		id: 'faq-4',
		question: 'Où se déroulent les formations et quels sont les horaires ?',
		answer:
			'Les formations se tiennent sur notre campus à Bafoussam, dans des salles équipées favorisant la pratique en petits groupes. Des créneaux en journée ainsi que des sessions adaptées aux professionnels en activité sont proposés selon les cohortes.'
	},
	{
		id: 'faq-5',
		question: 'Comment connaître les tarifs, les modalités de paiement et les dates de rentrée ?',
		answer:
			'Après votre pré-inscription via le formulaire ci-contre (ou un message direct sur WhatsApp), un conseiller pédagogique vous transmet la fiche tarifaire détaillée de la filière choisie, les facilités de paiement échelonné et le calendrier de la prochaine rentrée.'
	},
	{
		id: 'faq-6',
		question:
			'Les entreprises peuvent-elles former leurs collaborateurs ou recruter des diplômés ?',
		answer:
			'Oui. Nous proposons des programmes sur mesure pour les PME et institutions (bureautique avancée, IA, sécurité, marketing digital) ainsi que l’accès direct à nos meilleurs profils diplômés pour des stages ou recrutements.'
	}
];
