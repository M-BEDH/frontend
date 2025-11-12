import HomeHeader from '@/components/HomeHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Product } from '@/type';
import { useProductStore } from '@/store/productStore';
import { AppColors } from '@/constants/theme';

export default function HomeScreen() {
  // State local pour stocker les "produits en vedette"
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  // Extraction des données et méthodes depuis le store Zustand
  const {
    products, categories,
    fetchProducts, fetchCategories,
    loading, error,
  } = useProductStore();
  // Premier effet : chargement des produits et catégories à l'ouverture de l'écran
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  // Deuxième effet : sélection de produits "en vedette" quand products change
  useEffect(() => {
    // Si la liste des produits n'est pas vide
    if (products.length > 0) {
      // Crée une copie inversée des produits (pour simuler une sélection récente en tête de liste)
      const reverseProducts = [...products].reverse();
      // Met à jour le state local "featuredProducts"
      setFeaturedProducts(reverseProducts as Product[]);
    }
  }, [products]);
  
  if (loading) {
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <LoadingSpinner fullScreen />
        </View>
      </SafeAreaView>
    )
  }
  
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    )
  }
  
  return (
    <View style={styles.wrapper}>
      <HomeHeader />
      <View>
        <ScrollView>
          <View>
            <View>
              <Text>Catégories</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: AppColors.accent[500],
    textAlign: 'center',
  },
  wrapper: {
    flex: 1,
  }
});
