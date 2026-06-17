export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "devenir-auto-entrepreneur-2026",
    category: "Auto-entrepreneur",
    title: "Devenir auto-entrepreneur en 2026 : le guide complet des démarches",
    excerpt:
      "Inscription sur le portail autoentrepreneur.urssaf.fr, choix du régime fiscal, première déclaration de chiffre d'affaires — toutes les étapes dans l'ordre, sans rien oublier.",
    date: "12 juin 2026",
    content: [
      "Devenir auto-entrepreneur (le terme officiel est désormais « micro-entrepreneur », mais l'usage courant garde « auto-entrepreneur ») reste l'une des façons les plus simples de démarrer une activité en France. Pas besoin de capital social, de statuts à rédiger ou d'expert-comptable pour démarrer : la création se fait en ligne, gratuitement, en quelques étapes.",
      "La première étape consiste à créer son compte sur le portail officiel autoentrepreneur.urssaf.fr (ou via le guichet unique des formalités des entreprises, formalites.entreprises.gouv.fr, qui centralise désormais toutes les créations d'entreprise en France). Tu devras renseigner ton identité, l'adresse de ton activité, et surtout le code d'activité principale (APE) qui correspond à ton métier.",
      "Vient ensuite le choix du régime fiscal. Par défaut, tu es imposé au régime micro-fiscal classique : tes revenus sont déclarés avec un abattement forfaitaire (71% pour la vente de marchandises, 50% pour les prestations commerciales et artisanales, 34% pour les professions libérales). Tu peux aussi opter pour le versement fiscal libératoire si ton revenu fiscal de référence ne dépasse pas certains seuils — cela permet de payer l'impôt sur le revenu en même temps que les cotisations sociales, au même taux chaque mois.",
      "Une fois immatriculé, tu reçois ton numéro SIRET, généralement sous 1 à 3 semaines. C'est ce numéro qui te permet de facturer légalement. Attention : tu ne peux pas émettre de factures avant de l'avoir reçu, même si tu peux déjà prospecter et signer des devis.",
      "Chaque mois ou chaque trimestre (au choix), tu devras déclarer ton chiffre d'affaires encaissé sur le portail Urssaf, même s'il est nul. C'est cette déclaration qui calcule automatiquement tes cotisations sociales, prélevées dans les jours qui suivent. Oublier une déclaration peut entraîner une pénalité, donc mets un rappel récurrent dans ton agenda.",
      "Dernier point essentiel : la micro-entreprise est soumise à des plafonds de chiffre d'affaires annuel (188 700 € pour la vente de marchandises, 77 700 € pour les prestations de services et professions libérales, seuils 2026). Si tu les dépasses deux années de suite, tu bascules automatiquement vers un régime réel d'imposition — ce qui implique souvent de changer de statut juridique pour rester optimisé fiscalement.",
    ],
  },
  {
    slug: "trouver-premiers-clients-freelance",
    category: "Premiers clients",
    title: "5 stratégies gratuites pour trouver ses premiers clients en freelance",
    excerpt:
      "LinkedIn, bouche-à-oreille, portfolio en ligne, cold email, groupes Facebook — voici les méthodes qui fonctionnent vraiment quand on démarre sans budget pub.",
    date: "8 juin 2026",
    content: [
      "Trouver ses premiers clients est souvent le plus grand défi quand on se lance en freelance ou en auto-entrepreneur. La bonne nouvelle : il n'est pas nécessaire d'avoir un budget publicitaire pour démarrer. Voici cinq leviers gratuits, à activer en parallèle dès le premier jour.",
      "1. LinkedIn. C'est aujourd'hui l'un des canaux les plus efficaces pour les indépendants en B2B. Optimise ton profil comme une page de vente : titre clair sur ce que tu fais et pour qui, bannière professionnelle, section « À propos » qui répond directement au problème que tu résous. Publie régulièrement du contenu utile lié à ton métier, et commente les publications de ton secteur pour gagner en visibilité auprès des bonnes personnes.",
      "2. Le bouche-à-oreille structuré. Beaucoup d'indépendants attendent passivement que des recommandations arrivent. Au contraire, sois proactif : contacte ton réseau personnel et professionnel pour annoncer ton activité, en étant précis sur ce que tu proposes. Demande explicitement à tes premiers clients satisfaits s'ils connaissent quelqu'un qui pourrait avoir besoin de tes services.",
      "3. Un portfolio ou site vitrine simple. Même basique, un site avec quelques réalisations, un descriptif clair de ton offre et un moyen de te contacter rassure énormément un prospect qui hésite. Tu peux créer cela gratuitement avec des outils comme Notion, Carrd ou un site WordPress basique.",
      "4. Le cold email ciblé. Identifie une vingtaine d'entreprises qui correspondent exactement à ta cible, et envoie un message court et personnalisé qui montre que tu as fait tes recherches sur leur activité. Évite les messages génériques envoyés en masse, qui finissent en spam : la personnalisation fait toute la différence sur le taux de réponse.",
      "5. Les groupes et communautés en ligne (Facebook, Slack, Discord, forums spécialisés). De nombreux groupes rassemblent justement des porteurs de projet ou des entreprises qui cherchent des prestataires. Participe activement, réponds à des questions sans rien vendre directement, et les opportunités viendront naturellement de ta crédibilité construite dans la durée.",
    ],
  },
  {
    slug: "auto-entrepreneur-ou-sasu",
    category: "Statut juridique",
    title: "Auto-entrepreneur ou SASU : lequel choisir pour créer son entreprise ?",
    excerpt:
      "Charges sociales, protection, flexibilité, crédibilité — on compare les deux statuts sur tous les critères pour t'aider à faire le bon choix selon ta situation.",
    date: "3 juin 2026",
    content: [
      "Le choix entre auto-entrepreneur (micro-entreprise) et SASU revient très souvent dès qu'on envisage de créer son entreprise en France. Les deux statuts ont des logiques très différentes, et le bon choix dépend essentiellement de ton activité, de ton chiffre d'affaires prévisionnel et de ton besoin de protection.",
      "Côté simplicité administrative, la micro-entreprise gagne largement. La création est gratuite, la comptabilité se limite à un livre des recettes, et il n'y a pas de TVA à gérer jusqu'à un certain seuil. La SASU, en revanche, demande de rédiger des statuts, d'ouvrir un compte bancaire professionnel dédié, et d'avoir une comptabilité en partie double, généralement confiée à un expert-comptable.",
      "Sur le plan des charges sociales, la micro-entreprise applique un taux fixe sur le chiffre d'affaires encaissé (autour de 12,3% pour la vente, 21,2% pour les prestations de services en 2026), peu importe si tu te rémunères ou non. La SASU, elle, ne génère des cotisations que sur la rémunération réellement versée au dirigeant — ce qui peut être un avantage si tu veux laisser de la trésorerie dans l'entreprise sans te payer immédiatement.",
      "La protection sociale diffère aussi nettement : le président de SASU est assimilé salarié, ce qui lui donne accès au régime général de la Sécurité sociale (hors chômage), avec une meilleure couverture que celle de la micro-entreprise. En contrepartie, les cotisations sociales en SASU sont globalement plus élevées sur un même niveau de rémunération.",
      "Enfin, la crédibilité commerciale peut jouer un rôle, notamment si tu travailles avec de grandes entreprises ou des institutions qui préfèrent contractualiser avec une société plutôt qu'avec un statut individuel. La SASU permet aussi de s'associer plus facilement par la suite ou de lever des fonds, ce qui est impossible en micro-entreprise.",
      "En résumé : si tu démarres une activité simple, avec un chiffre d'affaires modéré et que tu veux tester ton marché sans prise de risque administrative, la micro-entreprise reste imbattable. Si ton activité a vocation à grossir rapidement, à embaucher, ou si tu as besoin d'une meilleure protection sociale, la SASU devient pertinente — au prix d'une gestion plus lourde.",
    ],
  },
  {
    slug: "plafonds-micro-entreprise-2026",
    category: "Micro-entreprise",
    title: "Plafonds de la micro-entreprise en 2026 : tout ce qu'il faut savoir",
    excerpt:
      "Chiffre d'affaires maximum, seuils de TVA, conséquences du dépassement — le point complet sur les plafonds qui s'appliquent aux micro-entrepreneurs en France.",
    date: "28 mai 2026",
    content: [
      "Le régime de la micro-entreprise est encadré par des plafonds de chiffre d'affaires annuel qu'il est essentiel de connaître pour ne pas se faire surprendre en cours d'activité. Ces seuils sont réévalués périodiquement par l'administration fiscale et sont valables pour 2026.",
      "Pour les activités de vente de marchandises, de restauration ou d'hébergement, le plafond de chiffre d'affaires annuel est fixé à 188 700 €. Pour les prestations de services commerciales ou artisanales et les professions libérales relevant des BNC ou des BIC, le plafond est de 77 700 €.",
      "Si ton activité est mixte (vente de marchandises et prestations de services), un plafond global de 188 700 € s'applique, avec un sous-plafond de 77 700 € pour la partie prestations de services.",
      "Le franchissement de ces plafonds n'entraîne pas une sortie immédiate du régime micro : tu ne perds le bénéfice du régime que si tu dépasses le seuil pendant deux années civiles consécutives. La première année de dépassement, tu restes en micro-entreprise ; c'est seulement si le dépassement se répète l'année suivante que tu bascules vers un régime réel d'imposition à partir du 1er janvier de l'année suivante.",
      "Il existe également un seuil de franchise en base de TVA, distinct du plafond de chiffre d'affaires : 37 500 € pour les prestations de services et 85 000 € pour la vente de marchandises (seuils 2026). Au-delà, tu deviens redevable de la TVA, ce qui signifie facturer la TVA à tes clients et la reverser à l'État, même si tu restes en micro-entreprise sur le plan du régime fiscal et social.",
      "Bien suivre son chiffre d'affaires cumulé tout au long de l'année, à l'aide d'un tableau simple ou d'un outil de facturation, permet d'anticiper ces seuils plutôt que de les découvrir trop tard, au moment où les conséquences administratives et fiscales sont déjà enclenchées.",
    ],
  },
  {
    slug: "faire-business-plan-simple",
    category: "Business plan",
    title: "Comment faire un business plan simple quand on crée son entreprise ?",
    excerpt:
      "Pas besoin d'un MBA pour rédiger un business plan convaincant. Voici une structure en 5 parties que tu peux compléter en une journée, même sans formation en finance.",
    date: "20 mai 2026",
    content: [
      "Un business plan n'a pas besoin d'être un document de 50 pages truffé de jargon financier pour être utile. Pour la grande majorité des créateurs d'entreprise, en particulier en micro-entreprise ou en activité individuelle, un document clair de quelques pages suffit largement, à condition qu'il couvre les bons points.",
      "1. La présentation du projet. En quelques phrases, explique ce que tu vends, à qui, et pourquoi ce projet a du sens maintenant. Cette partie doit pouvoir être comprise par quelqu'un qui ne connaît rien à ton secteur.",
      "2. L'étude de marché. Qui sont tes clients potentiels, quelle est la taille de ce marché, et qui sont tes concurrents directs ou indirects ? Tu n'as pas besoin d'études coûteuses : des recherches en ligne, des échanges avec des clients potentiels et l'observation de la concurrence suffisent à dégager une vision réaliste.",
      "3. L'offre et le positionnement. Décris précisément ce que tu vends (produit ou service), à quel prix, et ce qui te différencie de la concurrence. C'est souvent la partie la plus négligée alors qu'elle conditionne directement ta capacité à attirer des clients.",
      "4. La stratégie commerciale. Comment vas-tu trouver tes clients concrètement ? Quels canaux (réseaux sociaux, bouche-à-oreille, prospection directe, partenariats) ? Avec quel budget, même minime ? Cette partie doit rester actionnable, pas théorique.",
      "5. Le prévisionnel financier simplifié. Liste tes charges fixes mensuelles (assurances, abonnements, éventuel loyer), estime un chiffre d'affaires réaliste sur les 12 premiers mois, et calcule le seuil à partir duquel ton activité devient rentable. Pas besoin d'un tableau Excel complexe : une feuille de calcul simple avec entrées et sorties mensuelles suffit pour démarrer.",
      "L'objectif d'un business plan, surtout pour une petite structure, n'est pas d'impressionner un banquier mais avant tout de clarifier ta propre réflexion et de repérer les failles de ton projet avant de te lancer réellement.",
    ],
  },
  {
    slug: "auto-entrepreneur-et-chomage",
    category: "Régime fiscal",
    title: "Auto-entrepreneur et chômage : peut-on cumuler les deux en 2026 ?",
    excerpt:
      "ARE, ACRE, maintien des allocations, déclaration à France Travail — on fait le point sur les règles qui encadrent le cumul entre l'activité d'auto-entrepreneur et les indemnités chômage.",
    date: "14 mai 2026",
    content: [
      "Beaucoup de créateurs d'entreprise se lancent en micro-entreprise tout en étant inscrits à France Travail (anciennement Pôle emploi). La bonne nouvelle est que ce cumul est tout à fait possible en 2026, sous certaines conditions précises.",
      "Si tu perçois l'Allocation de retour à l'emploi (ARE), tu peux continuer à la toucher en partie pendant que tu développes ton activité de micro-entrepreneur. Le principe est simple : France Travail déduit de ton allocation mensuelle un montant proportionnel aux revenus que tu déclares issus de ton activité. Plus tu gagnes via ta micro-entreprise, moins tu perçois d'ARE ce mois-là — mais tu ne perds jamais la totalité de tes droits du jour au lendemain.",
      "Pour bénéficier de ce maintien partiel, il est impératif de continuer à s'actualiser chaque mois auprès de France Travail, en déclarant precisement le chiffre d'affaires encaissé. Une fausse déclaration ou un oubli peut entraîner une suspension des droits, voire des sanctions plus lourdes.",
      "Une autre option consiste à demander le versement de tes allocations chômage restantes sous forme de capital, via l'aide à la reprise ou à la création d'entreprise (ARCE). Tu touches alors 60% du reliquat de tes droits ARE en deux versements, ce qui peut constituer un capital de départ appréciable. Attention : ce choix est exclusif du maintien mensuel de l'ARE, il faut donc bien évaluer laquelle des deux options correspond le mieux à ton besoin de trésorerie.",
      "Il existe également l'ACRE (aide aux créateurs et repreneurs d'entreprise), qui n'est pas liée au chômage mais qui permet une exonération partielle de cotisations sociales pendant la première année d'activité, sous conditions de ressources. Elle est cumulable avec le maintien des allocations chômage, ce qui en fait un dispositif particulièrement intéressant pour démarrer en limitant les charges les premiers mois.",
      "Dans tous les cas, il est recommandé de signaler ta création d'entreprise à ton conseiller France Travail dès l'immatriculation, afin de mettre en place le bon dispositif dès le départ plutôt que de devoir régulariser une situation après coup.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
