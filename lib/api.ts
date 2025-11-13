import { Product } from "@/type";

const API_URL = "https://fakestoreapi.com";

//#region Tous les produits

// on defini une fonction asynchrone getProducts qui retourne une promesse d'un tableau de produits
const getProducts = async (): Promise<Product[]> => {  // (): Promise<Product[]>   CAD retourne un tableau de produits
  try {
    // appel api au endpoint des produits
    const response = await fetch(`${API_URL}/products`);

    // si la reponse n'est pas ok on interropmt et o lance une erreur
    if (!response.ok) {
      // gestion de l'erreur
      throw new Error('Network response was not ok');
    }
    // conversion du corps de la réponse, en tableau de produits
    return await response.json();
  } catch (error) {
    console.log('Error fetching products:', error);
    throw error;
  }
};
//#endregion

//#region Toutes les catégories
const getCategories = async (): Promise<string[]> => {
  try {
    // appel api au endpoint des catégories
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // conversion du corps de la réponse, en tableau de catégories
    return await response.json();
  } catch (error) {
    console.log('Error fetching products:', error);
    throw error;
  }
};
//#endregion

// export des deux fonctions
export { getProducts, getCategories };