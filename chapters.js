/**
 * TRIVIAL PURSUIT ÉDUCATIF - Chapitres
 * Pour ajouter un chapitre : donne le fichier CSV à Claude/ChatGPT avec le prompt fourni
 */

const DIFFICULTY_LEVELS = [
    { id: 'discovery', name: 'Découverte', color: '#22c55e', points: 1 },
    { id: 'easy', name: 'Facile', color: '#3b82f6', points: 2 },
    { id: 'medium', name: 'Moyen', color: '#eab308', points: 3 },
    { id: 'hard', name: 'Difficile', color: '#f97316', points: 4 },
    { id: 'expert', name: 'Expert', color: '#ef4444', points: 5 },
    { id: 'challenge', name: 'Challenge', color: '#a855f7', points: 6 }
];

const CHAPTERS = [
    // ============================================
    // CHAPITRE: LA RÉVOLUTION FRANÇAISE
    // ============================================
    {
        id: 'revolution-francaise',
        title: 'La Révolution Française',
        subject: 'Histoire',
        icon: '🏰',
        description: 'De 1789 à 1799',
        questions: {
            discovery: [
                {
                    question: "En quelle année la République est-elle proclamée ?",
                    answers: ["1792", "1789", "1799", "1804"],
                    correct: 0,
                    courseReminder: "Après la victoire de Valmy la monarchie est abolie pour laisser place à la République."
                },
                {
                    question: "Quelles sont les trois couleurs du drapeau révolutionnaire ?",
                    answers: ["Bleu blanc rouge", "Rouge et noir", "Bleu et jaune", "Blanc et or"],
                    correct: 0,
                    courseReminder: "Le blanc du roi est entouré par le bleu et le rouge de la ville de Paris."
                },
                {
                    question: "Qui est à la tête de l'État sous la monarchie absolue ?",
                    answers: ["Louis XVI", "Napoléon", "Robespierre", "Lafayette"],
                    correct: 0,
                    courseReminder: "Avant 1789 le souverain détient tous les pouvoirs seul."
                },
                {
                    question: "Quel mois de 1789 est marqué par la fin de la société d'ordres ?",
                    answers: ["Août", "Juillet", "Mai", "Septembre"],
                    correct: 0,
                    courseReminder: "C'est le moment où les privilèges sont abolis par les députés."
                },
                {
                    question: "Quel pays est le principal ennemi de la France en avril 1792 ?",
                    answers: ["L'Autriche", "L'Angleterre", "La Prusse", "L'Espagne"],
                    correct: 0,
                    courseReminder: "L'Assemblée déclare la guerre à ce pays pour diffuser les idées de la Révolution."
                }
            ],
            easy: [
                {
                    question: "Comment appelle-t-on les révolutionnaires parisiens qui portent le pantalon ?",
                    answers: ["Les sans-culottes", "Les jacobins", "Les girondins", "Les montagnards"],
                    correct: 0,
                    courseReminder: "Ils se distinguent des nobles qui portent la culotte courte."
                },
                {
                    question: "Dans quelle ville le Roi est-il arrêté lors de sa fuite en 1791 ?",
                    answers: ["Varennes", "Metz", "Strasbourg", "Verdun"],
                    correct: 0,
                    courseReminder: "Louis XVI tentait de rejoindre des troupes à l'Est pour reprendre son pouvoir."
                },
                {
                    question: "Quel est le symbole de l'unité du peuple libéré ?",
                    answers: ["Le bonnet phrygien", "La cocarde", "L'écharpe tricolore", "Le drapeau blanc"],
                    correct: 0,
                    courseReminder: "Il s'agit d'un bonnet rouge porté par les citoyens."
                },
                {
                    question: "Quel chant est créé pour défendre les valeurs révolutionnaires en 1792 ?",
                    answers: ["La Marseillaise", "Le Chant du Départ", "Ça ira", "L'Internationale"],
                    correct: 0,
                    courseReminder: "Ce chant d'unité nationale est né pendant la mobilisation contre l'Autriche."
                },
                {
                    question: "Quelle fête célèbre l'unité des Français le 14 juillet 1790 ?",
                    answers: ["La Fête de la Fédération", "La Fête Nationale", "La Fête de la Liberté", "La Fête du Roi"],
                    correct: 0,
                    courseReminder: "Elle a lieu un an après la prise de la Bastille en présence du Roi."
                }
            ],
            medium: [
                {
                    question: "Quelle structure administrative est créée en 1790 pour diviser la France ?",
                    answers: ["Les départements", "Les régions", "Les provinces", "Les cantons"],
                    correct: 0,
                    courseReminder: "L'Assemblée crée ces zones pour mieux encadrer la population et maintenir l'ordre."
                },
                {
                    question: "Quelle force armée protège les maires des communes dès 1789 ?",
                    answers: ["La Garde nationale", "L'armée royale", "La milice", "Les gendarmes"],
                    correct: 0,
                    courseReminder: "Cette force est chargée de maintenir l'ordre dans les nouvelles communes."
                },
                {
                    question: "Quelle assemblée est élue au suffrage universel masculin en 1792 ?",
                    answers: ["La Convention", "L'Assemblée Législative", "Les États généraux", "Le Directoire"],
                    correct: 0,
                    courseReminder: "Cette nouvelle assemblée remplace l'Assemblée Législative après la chute du Roi."
                },
                {
                    question: "Qui dirige les nouvelles communes créées en 1789 ?",
                    answers: ["Le maire", "Le préfet", "L'intendant", "Le seigneur"],
                    correct: 0,
                    courseReminder: "Ces responsables sont désormais élus par les citoyens de la commune."
                },
                {
                    question: "Comment appelle-t-on le vote où seuls les plus riches peuvent voter ?",
                    answers: ["Le suffrage censitaire", "Le suffrage universel", "Le vote aristocratique", "L'élection directe"],
                    correct: 0,
                    courseReminder: "Dans ce système il faut payer un impôt pour être électeur."
                }
            ],
            hard: [
                {
                    question: "Combien de temps dure le droit de veto du Roi selon la Constitution ?",
                    answers: ["4 ans", "2 ans", "6 ans", "Illimité"],
                    correct: 0,
                    courseReminder: "Le Roi peut suspendre l'application d'une loi mais pas l'annuler définitivement."
                },
                {
                    question: "Qu'est-ce que l'État nationalise en 1789 pour payer ses dettes ?",
                    answers: ["Les biens du clergé", "Les châteaux", "Les usines", "Les banques"],
                    correct: 0,
                    courseReminder: "L'Assemblée saisit ces richesses pour les revendre à la bourgeoisie."
                },
                {
                    question: "Comment appelle-t-on les prêtres qui doivent prêter serment à l'État ?",
                    answers: ["Les prêtres jureurs", "Les prêtres réfractaires", "Les curés royaux", "Les abbés constitutionnels"],
                    correct: 0,
                    courseReminder: "La Constitution civile du clergé transforme les religieux en fonctionnaires."
                },
                {
                    question: "Quelle classe sociale s'enrichit en rachetant les terres de l'Église ?",
                    answers: ["La bourgeoisie", "La noblesse", "Les paysans", "Les artisans"],
                    correct: 0,
                    courseReminder: "Avec la noblesse restée en France ils profitent de la vente des biens nationaux."
                },
                {
                    question: "Sur quelle question l'Assemblée se divise-t-elle après Varennes ?",
                    answers: ["Le sort de la Constitution", "La guerre", "La mort du Roi", "La religion"],
                    correct: 0,
                    courseReminder: "Le départ du Roi pose problème pour la survie du nouveau régime."
                }
            ],
            expert: [
                {
                    question: "Combien de Français sont des citoyens actifs en 1791 ?",
                    answers: ["4.4 millions", "10 millions", "1 million", "28 millions"],
                    correct: 0,
                    courseReminder: "Sur 28 millions d'habitants seule une petite partie possède le droit de vote."
                },
                {
                    question: "Quelle est la date exacte de la prise du palais des Tuileries ?",
                    answers: ["10 août 1792", "14 juillet 1789", "21 janvier 1793", "9 thermidor an II"],
                    correct: 0,
                    courseReminder: "C'est le jour où le peuple parisien emprisonne la famille royale."
                },
                {
                    question: "Quelle est la première grande victoire de l'armée révolutionnaire ?",
                    answers: ["Valmy", "Jemappes", "Fleurus", "Austerlitz"],
                    correct: 0,
                    courseReminder: "Cette bataille a lieu le 20 septembre 1792 juste avant la République."
                },
                {
                    question: "Combien de députés composent l'Assemblée Législative de 1791 ?",
                    answers: ["745 députés", "500 députés", "1000 députés", "300 députés"],
                    correct: 0,
                    courseReminder: "Ces députés sont élus pour une durée de deux ans."
                },
                {
                    question: "Quel pays rejoint l'Autriche et la Prusse contre la France en 1792 ?",
                    answers: ["L'Angleterre", "L'Espagne", "La Russie", "Les Pays-Bas"],
                    correct: 0,
                    courseReminder: "Ces trois puissances craignent la diffusion des idées révolutionnaires."
                }
            ],
            challenge: [
                {
                    question: "À quel pays le Roi se compare-t-il car il se sent sous contrôle ?",
                    answers: ["L'Angleterre", "Les États-Unis", "La Hollande", "La Suisse"],
                    correct: 0,
                    courseReminder: "Le Roi est déçu par la Constitution car elle limite son pouvoir exécutif."
                },
                {
                    question: "À quel pays le peuple se compare-t-il car il se sent exclu du vote ?",
                    answers: ["L'Amérique", "L'Angleterre", "La Suisse", "La Pologne"],
                    correct: 0,
                    courseReminder: "Les citoyens sont déçus car le suffrage censitaire favorise les riches."
                },
                {
                    question: "Quel impôt faut-il payer pour être considéré comme citoyen actif ?",
                    answers: ["Le cens", "La taille", "La gabelle", "La dîme"],
                    correct: 0,
                    courseReminder: "Le nom du suffrage censitaire vient directement du nom de cette taxe."
                },
                {
                    question: "Combien d'électeurs sont choisis par les citoyens actifs en 1791 ?",
                    answers: ["45 000 hommes", "100 000 hommes", "10 000 hommes", "1 million d'hommes"],
                    correct: 0,
                    courseReminder: "Ces hommes forment le second niveau du système de vote avant les députés."
                },
                {
                    question: "Quel groupe de nobles quitte la France et refuse la fin des privilèges ?",
                    answers: ["Les émigrés", "Les girondins", "Les feuillants", "Les jacobins"],
                    correct: 0,
                    courseReminder: "Ils s'installent à l'étranger et s'opposent à la vente des biens du clergé."
                },
                {
                    question: "Qui partage le pouvoir exécutif avec le Roi en 1791 ?",
                    answers: ["Des fonctionnaires élus", "L'Assemblée", "Les ministres royaux", "Les nobles"],
                    correct: 0,
                    courseReminder: "Le Roi n'est plus seul à diriger l'administration de l'État."
                }
            ]
        }
    }

    // ============================================
    // AJOUTE D'AUTRES CHAPITRES ICI
    // Utilise le prompt fourni pour générer le code
    // ============================================
];
