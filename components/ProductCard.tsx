import {
  View, StyleSheet,
  Text, StyleProp,
  ViewStyle,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { use } from 'react';
import { Product } from '@/type';
import { AppColors } from '@/constants/theme';
import Button from '@/components/Button';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface ProductCardProps {
    product: Product;
    compact?: boolean; // optionnel pour afficher la version compacte de la card
    customStyle?: StyleProp<ViewStyle>; // optionnel pour styles personnalisés
}

const ProductCard: React.FC<ProductCardProps> = ({
    product, compact=false, customStyle
}) => {
    const {id, title, price, category, image} = product;

    const router = useRouter();
    const handleProductRoute = (e: any) => {
      //Logique de navigation vers la page du produit
      router.push(`product/${id}` as any);

    }

    const handleAddToCart = () => {
      // Logique pour ajouter le produit au panier
      Toast.show({
        type: 'success',
        text1: `${title} ajouté au panier`,
        text2: `Voir le panier pour finaliser votre achat.`,
        visibilityTime: 3000,
      });
    }

  return (
    <TouchableOpacity 
    onPress={handleProductRoute}
    style={[ styles.card, compact && styles.compactCard, customStyle ]}
    activeOpacity={0.8}
    >
            <View style={styles.imageContainer}>
                <Image
                source={{uri: image}}
                style={styles.image}
                resizeMode='contain'
                />
            </View>
            <View 
            style={styles.content}>
                <Text style={styles.category}>{category}</Text>
                <Text
                style={styles.title}
                numberOfLines={ compact ? 1 :2}
                ellipsizeMode='tail'
                >
                    {title}
                </Text>

                  <View style={styles.footer}>
                    <Text style={[styles.price, !compact && { marginBottom: 6 }]}>€{price.toFixed(2)}</Text>
                    {!compact && (<Button title='Ajout panier' size='small' variant='outline' onPress={handleAddToCart} />)}
                </View>

                                    {/* Ou autre affichage avec Icone --- ci-dessous */}

                {/* <View style={styles.footer}>
                    <Text style={[styles.price, !compact && { marginBottom: 6 }]}>€{price.toFixed(2)}</Text>
                    {!compact && (
                        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                            <MaterialCommunityIcons 
                                name="cart-outline" 
                                size={18} 
                                color={AppColors.primary[700]}
                            />
                        </TouchableOpacity>
                    )}
                </View> */}

            </View>
    </TouchableOpacity>
  )
}

export default ProductCard


//#region style
const styles = StyleSheet.create({
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.primary[600],
    marginBottom: 5,
  },
  footer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  title: {
    fontSize: 14,
    marginBottom:8,
    fontWeight: '500',
    color: AppColors.text.primary,
  },
  category: {
    fontSize: 12,
    color: AppColors.text.tertiary,
    textTransform: 'capitalize',
    marginBottom:4,
  },
  content: {
    padding: 12,
    backgroundColor: AppColors.background.secondary,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffffffcc',
    borderRadius: 18,
    padding: 2,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppColors.accent[600],
  },
  cartButton: {
    backgroundColor: AppColors.background.primary,
    borderWidth: 1,
    borderColor: AppColors.primary[700],
    borderRadius: 6,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    position: 'relative',
    height: 150,
    backgroundColor: AppColors.background.primary,
    padding: 5,
  },
  compactCard: {
    width: 150,
    marginRight: 12,
  },
  card: {
    backgroundColor: AppColors.background.primary,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    width: '48%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.gray[200],
  },
})
//#endregion