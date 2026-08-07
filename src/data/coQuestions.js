export const coQuestions = [

  {
    id: 1,
    level: "B2",
    audio: "/tefaq-master/public/audio/001.mp3",
    question: "Pourquoi Marie téléphone-t-elle ?",
    choices: [
      "Pour réserver un hôtel",
      "Pour annuler un rendez-vous",
      "Pour demander un renseignement"
    ],
    answer: 1,
    explanation: "Marie téléphone pour annuler son rendez-vous."
  },

  {
    id: 2,
    level: "B2",
    audio: "/tefaq-master/public/audio/002.mp3",
    question: "Que doit faire le client ?",
    choices: [
      "Signer le contrat",
      "Envoyer un courriel",
      "Téléphoner demain"
    ],
    answer: 0,
    explanation: "Le client doit signer le contrat."
  },

  {
    id: 3,
    level: "B2",
    audio: "/tefaq-master/public/audio/003.mp3",
    question: "À quelle heure commence la réunion ?",
    choices: [
      "À 8 h",
      "À 9 h",
      "À 10 h"
    ],
    answer: 2,
    explanation: "La réunion commence à 10 heures."
  },
  
{
  id: 4,
  category: "Transport",
  level: "B2",
  audio: "/tefaq-master/public/audio/004.mp3",
  duration: 20,
  transcript: `
Bonjour Madame,
En raison de travaux sur la ligne orange,
le métro sera interrompu entre Berri-UQAM et Beaubien
à partir de 22 heures ce soir.
Un service d'autobus de remplacement sera mis en place.
Nous vous remercions de votre compréhension.
`,
  question: "Pourquoi cette annonce est-elle diffusée ?",
  choices: [
    "Pour annoncer une fermeture temporaire du métro",
    "Pour informer d'une augmentation du prix du billet",
    "Pour présenter une nouvelle ligne de métro"
  ],
  answer: 0,
  explanation: "Le métro sera interrompu en raison de travaux.",
  vocabulary: [
    "travaux",
    "interrompu",
    "ligne",
    "service de remplacement"
  ]
},
{
  id: 5,
  category: "Banque",
  level: "B2",
  audio: "/tefaq-master/public/audio/005.mp3",
  duration: 18,
  transcript: `
Bonjour Monsieur.
Votre nouvelle carte bancaire est arrivée.
Vous pouvez venir la récupérer à partir de demain
avec une pièce d'identité.
`,
  question: "Que doit faire le client ?",
  choices: [
    "Activer sa carte par téléphone",
    "Venir chercher sa carte à la banque",
    "Envoyer une copie de son passeport"
  ],
  answer: 1,
  explanation: "Le client doit venir récupérer sa nouvelle carte.",
  vocabulary: [
    "carte bancaire",
    "récupérer",
    "pièce d'identité"
  ]
},
  
  {
  id: 6,
  category: "Logement",
  level: "B2",
  audio: "/tefaq-master/public/audio/006.mp3",
  duration: 22,
  transcript: `
Bonjour.
Je vous appelle concernant l'appartement.
Je souhaiterais organiser une visite samedi matin,
si cela est toujours possible.
`,
  question: "Pourquoi la personne téléphone-t-elle ?",
  choices: [
    "Pour annuler son bail",
    "Pour organiser une visite",
    "Pour signaler une panne"
  ],
  answer: 1,
  explanation: "La personne souhaite visiter l'appartement.",
  vocabulary: [
    "appartement",
    "organiser",
    "visite",
    "samedi matin"
  ]
},
  {
  id: 7,
  category: "Travail",
  level: "B2",
  audio: "/tefaq-master/public/audio/007.mp3",
  duration: 18,
  transcript: `
Bonjour Madame.
Votre entretien est confirmé pour mardi à 14 heures.
Merci d'apporter votre CV ainsi qu'une pièce d'identité.
À bientôt.
`,
  question: "Pourquoi cette personne appelle-t-elle ?",
  choices: [
    "Pour confirmer un entretien",
    "Pour annuler une réunion",
    "Pour proposer un emploi"
  ],
  answer: 0,
  explanation: "L'entretien est confirmé pour mardi.",
  vocabulary: [
    "entretien",
    "confirmer",
    "CV",
    "pièce d'identité"
  ]
},
  {
  id: 8,
  category: "Travail",
  level: "B2",
  audio: "/tefaq-master/public/audio/008.mp3",
  duration: 16,
  transcript: `
Bonjour.
Je serai en retard d'une quinzaine de minutes
à cause de la circulation.
Merci de votre compréhension.
`,
  question: "Pourquoi la personne téléphone-t-elle ?",
  choices: [
    "Pour signaler un retard",
    "Pour demander un congé",
    "Pour démissionner"
  ],
  answer: 0,
  explanation: "La personne prévient qu'elle arrivera en retard.",
  vocabulary: [
    "retard",
    "circulation",
    "prévenir"
  ]
},
  {
  id: 9,
  category: "Travail",
  level: "B2",
  audio: "/tefaq-master/public/audio/009.mp3",
  duration: 20,
  transcript: `
Nous vous rappelons que la réunion débutera
à 9 heures précises.
Merci d'arriver quelques minutes à l'avance.
`,
  question: "Que doivent faire les employés ?",
  choices: [
    "Arriver un peu avant la réunion",
    "Reporter la réunion",
    "Travailler à domicile"
  ],
  answer: 0,
  explanation: "Les employés doivent arriver avant 9 heures.",
  vocabulary: [
    "réunion",
    "débuter",
    "à l'avance"
  ]
},
  {
  id: 10,
  category: "Travail",
  level: "B2",
  audio: "/tefaq-master/public/audio/010.mp3",
  duration: 18,
  transcript: `
Votre période d'essai est terminée.
Nous sommes heureux de confirmer votre embauche.
Bienvenue dans notre équipe.
`,
  question: "Quelle est la bonne nouvelle ?",
  choices: [
    "La personne est embauchée",
    "La personne change de poste",
    "La personne prend sa retraite"
  ],
  answer: 0,
  explanation: "L'entreprise confirme son embauche.",
  vocabulary: [
    "embauche",
    "équipe",
    "période d'essai"
  ]
}
  
];
