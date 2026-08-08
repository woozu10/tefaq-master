import topics from "../../public/data/ee/B2.json";

export function getRandomTopic() {

  return topics[
    Math.floor(Math.random() * topics.length)
  ];

}

export function getAllTopics() {

  return topics;

}
