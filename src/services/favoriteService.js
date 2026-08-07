export function addFavorite(question){

  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  if(!favorites.find(q => q.id === question.id)){
    favorites.push(question);
  }

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

}

export function getFavorites(){

  return JSON.parse(
    localStorage.getItem("favorites")
  ) || [];

}

export function removeFavorite(id){

  const favorites = getFavorites()
    .filter(q => q.id !== id);

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

}
