export interface Product {
  id: number;           // Identifiant unique du produit
  title: string;        // Nom/titre du produit
  price: number;        // Prix du produit
  description: string;  // Description du produit
  category: string;     // Catégorie du produit
  image: string;        // URL de l'image du produit
  rating: {            // Objet imbriqué pour les évaluations
    rate: number;      // Note moyenne (ex: 4.5)
    count: number;     // Nombre d'évaluations
  };
}