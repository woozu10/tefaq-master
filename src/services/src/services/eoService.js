const topics = [

  {

    title:
      "Votre ville",

    instruction:
      "Présentez votre ville et expliquez pourquoi vous l'aimez."

  },

  {

    title:
      "Le travail",

    instruction:
      "Parlez de votre emploi idéal."

  },

  {

    title:
      "Les vacances",

    instruction:
      "Décrivez vos dernières vacances."

  },

  {

    title:
      "Les études",

    instruction:
      "Parlez de vos études et de vos projets."

  },

  {

    title:
      "Les transports",

    instruction:
      "Quels moyens de transport utilisez-vous ?"

  }

];

export function getRandomTopic() {

  return topics[
    Math.floor(
      Math.random() *
      topics.length
    )
  ];

}
