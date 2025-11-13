// Import des fonctions d'API et des types nécessaires
import { getCategories, getProducts } from '@/lib/api';
// Import du type Product
import { Product } from '@/type';
// Import des bibliothèques nécessaires pour la gestion de l'état avec persistance
import AsyncStorage from '@react-native-async-storage/async-storage';
// Zustand pour la gestion de l'état, création du store
import { create } from 'zustand';
// Middleware pour la persistance de l'état
import { createJSONStorage, persist } from 'zustand/middleware';


// Définition de l'interface pour le state du store
interface ProductsState {
  products: Product[];                    // Liste complète des produits
  filteredProducts: Product[];           // Liste des produits filtrés
  categories: string[];                  // Liste des catégories de produits disponibles
  loading: boolean;                      // Indicateur de chargement
  error: string | null;                  // Message d'erreur, s'il y en a

  // Méthode pour récupérer les produits depuis l'API
  fetchProducts: () => Promise<void>;
  // Méthode pour récupérer les catégories depuis l'API
  fetchCategories: () => Promise<void>;
}

//#region Création du store avec Zustand et persistance avec AsyncStorage
export const useProductStore = create<ProductsState>()(
  // Middleware de persistance
  persist(
    (set, get) => ({                           
      // Initialisation des valeurs du state
      products: [],
      filteredProducts: [],
      categories: [],
      loading: false,
      error: null,
      //#region FetchProduct
      // Méthode pour récupérer les produits depuis l'API
      fetchProducts: async () => {
        try {
          // Active le mode de chargement et réinitialise les erreurs
          set({ loading: true, error: null });
          // Appel de l'API pour récupérer les produits
          const products = await getProducts();
          // Mise à jour du state (donc le store) avec les produits récupérés
          set({
            products,                          // Liste complète des produits
            filteredProducts: products,        // Initialement, les produits filtrés sont la liste complète
            loading: false                     // Désactive le mode de chargement
          });
        } catch (error: any) {
          // Enregistre l'erreur et stoppe le chargement
          set({ error: error.message, loading: false });
        }
      },
      //#region FetchCategories
      // Méthode pour récupérer les catégories depuis l'API
      fetchCategories: async () => {
        try {
          set({ loading: true, error: null });
          const categories = await getCategories();
          set({
            categories,
            loading: false
          });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    // Options du middleware de persistance
    {
      name: 'product-storage', // nom unique pour le stockage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);