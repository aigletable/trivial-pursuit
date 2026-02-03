# Prompt pour Générer des Chapitres Trivial Pursuit

Copie ce prompt et donne-le à ChatGPT, Claude ou Gemini avec ton contenu de cours :

---

## PROMPT À COPIER :

```
Tu es un expert en création de quiz éducatifs. Je vais te donner un chapitre de cours et tu dois me générer du code JavaScript pour un jeu Trivial Pursuit éducatif.

RÈGLES IMPORTANTES :
1. Génère exactement 5-6 questions par niveau de difficulté
2. Les niveaux sont : discovery, easy, medium, hard, expert, challenge
3. Chaque question a 4 réponses possibles
4. La bonne réponse est TOUJOURS à l'index 0 (le jeu mélange automatiquement)
5. Le rappel de cours aide l'élève à comprendre la réponse
6. Varie les positions logiques des réponses (ne mets pas toujours la bonne réponse en logique évidente)

FORMAT DE SORTIE (copie exactement cette structure) :

{
    id: 'nom-du-chapitre',
    title: 'Titre du Chapitre',
    subject: 'Matière',
    icon: '📚',
    description: 'Description courte',
    questions: {
        discovery: [
            {
                question: "Question facile pour découvrir ?",
                answers: ["Bonne réponse", "Mauvaise 1", "Mauvaise 2", "Mauvaise 3"],
                correct: 0,
                courseReminder: "Explication pédagogique qui aide à retenir."
            }
        ],
        easy: [
            // 5-6 questions faciles
        ],
        medium: [
            // 5-6 questions moyennes
        ],
        hard: [
            // 5-6 questions difficiles
        ],
        expert: [
            // 5-6 questions expert
        ],
        challenge: [
            // 5-6 questions challenge (les plus dures)
        ]
    }
}

---

VOICI LE CONTENU DE MON COURS :

[COLLE TON COURS ICI]

---

Génère le code JavaScript complet avec 30+ questions réparties sur tous les niveaux.
```

---

## EXEMPLE D'UTILISATION :

1. Copie le prompt ci-dessus
2. Remplace `[COLLE TON COURS ICI]` par ton cours (texte, PDF copié, notes, etc.)
3. Envoie à ChatGPT/Claude/Gemini
4. Copie le code JavaScript généré
5. Colle-le dans `chapters.js` dans le tableau `CHAPTERS`

## CONSEIL :

Si tu as un fichier CSV avec tes questions, tu peux aussi dire :

```
Convertis ce CSV en format JavaScript pour Trivial Pursuit :
[COLLE TON CSV]
```
