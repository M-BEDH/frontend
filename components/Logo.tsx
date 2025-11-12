import { 
  StyleSheet, Text, 
  TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { AppColors } from '@/constants/theme'
import { useRouter } from 'expo-router'

const Logo = () => {
  // pernet la navigation entre les diffents screens/pages
  const router = useRouter()
  return (
    // composant qui rend son contenu cliquable et "fond" le button dans le background
    <TouchableOpacity style={styles.logoView} onPress={() => router.push("/")}>

      {/* logo de l'application dans Material_Icons(librairie icons sur expo*/}
      <MaterialIcons 
        name="shopping-cart" 
        size={25} 
        color={AppColors.primary[700]}
      />
      <Text style={styles.logoText}>ShopNGo</Text>
    </TouchableOpacity>
  )
}

export default Logo

const styles = StyleSheet.create({
  logoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    marginLeft: 2,
    fontFamily: 'Inter-Bold',
    color: AppColors.primary[700]
  }
})
