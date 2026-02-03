/**
 * TRIVIAL PURSUIT ÉDUCATIF - Chapitres
 * Pour ajouter un chapitre : utilise le prompt dans PROMPT_GENERATION_CHAPITRES.md
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
                    answers: ["1792", "1789", "1791", "1793"],
                    correct: 0,
                    courseReminder: "Après la victoire de Valmy la monarchie est abolie pour laisser place à la République le 21 septembre."
                },
                {
                    question: "Quelles sont les trois couleurs du drapeau révolutionnaire ?",
                    answers: ["Bleu blanc rouge", "Rouge et noir", "Bleu et jaune", "Blanc et or"],
                    correct: 0,
                    courseReminder: "Le blanc du roi est entouré par le bleu et le rouge de la ville de Paris."
                },
                {
                    question: "Qui est à la tête de l'État sous la monarchie absolue ?",
                    answers: ["Louis XVI", "Louis XIV", "Louis-Philippe", "Napoléon"],
                    correct: 0,
                    courseReminder: "Avant 1789 le souverain détient tous les pouvoirs seul par droit divin."
                },
                {
                    question: "Quel mois de 1789 est marqué par l'abolition des privilèges ?",
                    answers: ["Août", "Juillet", "Juin", "Mai"],
                    correct: 0,
                    courseReminder: "C'est lors de la nuit du 4 août que les privilèges de la noblesse et du clergé sont supprimés."
                },
                {
                    question: "Quel pays est le principal ennemi de la France en avril 1792 ?",
                    answers: ["L'Autriche", "L'Angleterre", "La Prusse", "La Russie"],
                    correct: 0,
                    courseReminder: "L'Assemblée déclare la guerre à l'Autriche pour diffuser les idées de la Révolution."
                }
            ],
            easy: [
                {
                    question: "Comment appelle-t-on les révolutionnaires parisiens en pantalon ?",
                    answers: ["Les sans-culottes", "Les montagnards", "Les girondins", "Les jacobins"],
                    correct: 0,
                    courseReminder: "Ils portent le pantalon long par opposition à la culotte courte portée par les aristocrates."
                },
                {
                    question: "Dans quelle ville le Roi est-il arrêté lors de sa fuite en 1791 ?",
                    answers: ["Varennes", "Versailles", "Valmy", "Verdun"],
                    correct: 0,
                    courseReminder: "Louis XVI tentait de rejoindre des troupes à l'Est mais il est reconnu et ramené à Paris."
                },
                {
                    question: "Que symbolise le bonnet phrygien pour le peuple ?",
                    answers: ["La fin de l'esclavage", "La victoire militaire", "La religion d'État", "Le pouvoir royal"],
                    correct: 0,
                    courseReminder: "Il symbolise l'unité du peuple libéré de son état d'esclave sous l'Ancien régime."
                },
                {
                    question: "Quel chant né en 1792 devient le symbole de l'unité nationale ?",
                    answers: ["La Marseillaise", "Le Chant du départ", "L'Internationale", "Le Temps des cerises"],
                    correct: 0,
                    courseReminder: "Il est composé pour l'armée du Rhin lors de la mobilisation contre l'Autriche."
                },
                {
                    question: "Quelle fête célèbre l'unité des Français le 14 juillet 1790 ?",
                    answers: ["La Fête de la Fédération", "La Fête de la Raison", "La Fête de l'Être Suprême", "La Fête du Roi"],
                    correct: 0,
                    courseReminder: "Elle célèbre le premier anniversaire de la prise de la Bastille sur le Champ-de-Mars."
                }
            ],
            medium: [
                {
                    question: "Quelle structure administrative est créée en 1790 ?",
                    answers: ["Les départements", "Les régions", "Les préfectures", "Les cantons"],
                    correct: 0,
                    courseReminder: "L'Assemblée crée les départements pour simplifier l'administration et maintenir l'ordre."
                },
                {
                    question: "Quelle force armée protège les maires des communes dès 1789 ?",
                    answers: ["La Garde nationale", "La Maréchaussée", "La Garde royale", "La Milice citoyenne"],
                    correct: 0,
                    courseReminder: "Cette force armée est composée de citoyens pour protéger les nouvelles institutions."
                },
                {
                    question: "Quelle assemblée remplace la Législative en septembre 1792 ?",
                    answers: ["La Convention", "La Constituante", "Le Conseil des Cinq-Cents", "Le Sénat"],
                    correct: 0,
                    courseReminder: "La Convention est la première assemblée élue au suffrage universel masculin."
                },
                {
                    question: "Qui dirige les communes créées lors de la simplification administrative ?",
                    answers: ["Un maire élu", "Un intendant royal", "Un préfet", "Un seigneur"],
                    correct: 0,
                    courseReminder: "Désormais les communes sont dirigées par un maire élu et protégées par la garde nationale."
                },
                {
                    question: "Comment qualifie-t-on le suffrage basé sur le paiement d'un impôt ?",
                    answers: ["Le suffrage censitaire", "Le suffrage universel", "Le suffrage indirect", "Le suffrage aristocratique"],
                    correct: 0,
                    courseReminder: "Dans ce système il faut payer le cens (un impôt) pour avoir le droit de voter."
                }
            ],
            hard: [
                {
                    question: "Quelle est la durée maximale du droit de veto du Roi en 1791 ?",
                    answers: ["4 ans", "2 ans", "6 ans", "1 an"],
                    correct: 0,
                    courseReminder: "Le Roi peut suspendre l'application d'une loi pendant deux législatures soit 4 ans."
                },
                {
                    question: "Qu'est-ce que l'État nationalise pour régler la dette en 1789 ?",
                    answers: ["Les biens du clergé", "Les terres des nobles", "Les ports de commerce", "Les châteaux"],
                    correct: 0,
                    courseReminder: "L'Assemblée saisit les terres de l'Église pour les revendre sous forme de biens nationaux."
                },
                {
                    question: "Comment appelle-t-on les prêtres qui prêtent serment à l'État ?",
                    answers: ["Les prêtres jureurs", "Les prêtres réfractaires", "Les prêtres émigrés", "Les prêtres laïcs"],
                    correct: 0,
                    courseReminder: "La Constitution civile du clergé oblige les religieux à prêter un serment de fidélité à la Nation."
                },
                {
                    question: "Qui s'enrichit principalement en rachetant les terres de l'Église ?",
                    answers: ["La bourgeoisie", "Les paysans sans terre", "Les sans-culottes", "Les artisans"],
                    correct: 0,
                    courseReminder: "La bourgeoisie et la noblesse restée en France profitent de la vente des biens nationaux."
                },
                {
                    question: "Sur quel point l'Assemblée se divise-t-elle après Varennes ?",
                    answers: ["Le sort de la Constitution", "La mort du Roi", "L'abolition de l'esclavage", "Le choix du drapeau"],
                    correct: 0,
                    courseReminder: "L'Assemblée se divise sur la question du maintien de la Constitution et du sort du Roi."
                }
            ],
            expert: [
                {
                    question: "Combien de Français sont considérés comme citoyens actifs en 1791 ?",
                    answers: ["4.4 millions", "1 million", "10 millions", "28 millions"],
                    correct: 0,
                    courseReminder: "Sur une population totale de 28 millions seule une minorité riche possède le droit de vote."
                },
                {
                    question: "Quelle est la date précise de la prise du palais des Tuileries ?",
                    answers: ["10 août 1792", "14 juillet 1791", "20 septembre 1792", "21 janvier 1793"],
                    correct: 0,
                    courseReminder: "L'attaque des Tuileries par les sans-culottes marque la chute définitive de la monarchie."
                },
                {
                    question: "Quelle bataille du 20 septembre 1792 sauve la Révolution ?",
                    answers: ["Valmy", "Jemappes", "Fleurus", "Austerlitz"],
                    correct: 0,
                    courseReminder: "C'est la première grande victoire de l'armée populaire révolutionnaire contre les Prussiens."
                },
                {
                    question: "Combien de députés siègent à l'Assemblée Législative ?",
                    answers: ["745 députés", "500 députés", "1000 députés", "300 députés"],
                    correct: 0,
                    courseReminder: "L'Assemblée législative est composée de 745 députés élus pour un mandat de 2 ans."
                },
                {
                    question: "Quelles puissances s'allient à l'Autriche contre la France en 1792 ?",
                    answers: ["La Prusse et l'Angleterre", "L'Espagne et la Russie", "La Suède et le Danemark", "L'Italie et la Suisse"],
                    correct: 0,
                    courseReminder: "L'Autriche la Prusse et l'Angleterre s'allient par crainte de la diffusion des idées révolutionnaires."
                }
            ],
            challenge: [
                {
                    question: "À quel modèle étranger le Roi compare-t-il sa perte de pouvoir ?",
                    answers: ["L'Angleterre", "Les États-Unis", "La Hollande", "L'Espagne"],
                    correct: 0,
                    courseReminder: "Le Roi se sent déchu car il est placé sous le contrôle de la loi comme en Angleterre."
                },
                {
                    question: "À quel pays le peuple compare-t-il le suffrage censitaire ?",
                    answers: ["L'Amérique", "L'Angleterre", "La Suisse", "La Pologne"],
                    correct: 0,
                    courseReminder: "Le peuple est déçu car le vote est réservé à la bourgeoisie fortunée comme aux États-Unis."
                },
                {
                    question: "Comment appelle-t-on l'impôt qui donne accès au vote ?",
                    answers: ["Le cens", "La taille", "La gabelle", "La dîme"],
                    correct: 0,
                    courseReminder: "Le suffrage censitaire tire son nom du cens le montant d'impôt requis pour voter."
                },
                {
                    question: "Combien d'électeurs sont élus par les citoyens actifs ?",
                    answers: ["45 000 hommes", "100 000 hommes", "10 000 hommes", "1 million"],
                    correct: 0,
                    courseReminder: "Les citoyens actifs élisent des électeurs qui eux-mêmes élisent les députés au second degré."
                },
                {
                    question: "Quel nom donne-t-on aux nobles qui fuient la France ?",
                    answers: ["Les émigrés", "Les exilés", "Les réfractaires", "Les suspects"],
                    correct: 0,
                    courseReminder: "Les nobles émigrés quittent la France dès 1789 et refusent la fin des privilèges."
                },
                {
                    question: "Qui partage le pouvoir exécutif avec le Roi en 1791 ?",
                    answers: ["Des fonctionnaires élus", "L'Assemblée", "Les préfets royaux", "Les ducs"],
                    correct: 0,
                    courseReminder: "Le pouvoir exécutif est désormais partagé entre le roi et des fonctionnaires élus par le peuple."
                }
            ]
        }
    }

    // ============================================
    // AJOUTE D'AUTRES CHAPITRES ICI
    // ============================================
];
