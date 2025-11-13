import HomeHeader from '@/components/HomeHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
import { View, StyleSheet,
  Text, ScrollView,
  TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Product } from '@/type';
import { useProductStore } from '@/store/productStore';
import { AppColors } from '@/constants/theme';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router'

// #region HomeScreen
export default function HomeScreen() {
  const router = useRouter();
  // State local pour stocker les "produits en vedette"
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  // Extraction des données et méthodes depuis le store Zustand
  const {
    products, categories,
    fetchProducts, fetchCategories,
    loading, error,
  } = useProductStore();
  //#region useEffect
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
  //#endregion
  
  const navigateToCategory = (category: string) => {
    router.push({
      pathname: '/(tabs)/shop',
      params: {
        category: category
      },
    });
  }
//#region loading 
if (loading) {
  return(
    <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <LoadingSpinner fullScreen />
        </View>
      </SafeAreaView>
    )
  }
  //#endregion
  //#region error
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    )
  }
  //#endregion
  //#region return
  // Rendu principal de l'écran Home
  return (
    <View style={styles.wrapper}>
      <HomeHeader />
      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainerView}
        >
          <View style={styles.categoriesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Catégories</Text>
            </View>
            <ScrollView
            horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category) => (
            <TouchableOpacity
            style={styles.categoryButton}
            key={category}
            onPress={()=>navigateToCategory(category)}
            >
              <AntDesign
              name='tag'
              size={16}
              color={AppColors.primary[500]}
              />
              <Text style={styles.categoryText}>
                {category.charAt(0).toUpperCase() +
                 category.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
//#endregion

//#region styles
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
  },
  contentContainer: {
    paddingLeft:20,
    // paddingHorizontal: 20,
  },
  categoryText: {
    marginLeft: 6,
    fontFamily: 'Inter-Medium',
    fontSize: 12, 
    color: AppColors.text.primary,
    textTransform: 'capitalize',
  },
  scrollContainerView: {
    paddingBottom: 300,
  },
  categoriesSection: {
    marginTop: 10,
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.secondary,
    paddingVertical:10,
    paddingHorizontal:12,
    borderRadius: 8,
    marginRight: 5,
    minWidth: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: AppColors.text.primary[500],
  },
});
//#endregion
