import { StyleSheet, Text, 
    View,  Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '@/constants/theme';

// sert de container sûr pour l'affichage du contenu des onglets
const Wrapper = ({ children } : { children: React.ReactNode }) => {
  return (
    // prend en compte les zones à éviter sur les différents appareils
    <SafeAreaView style ={styles.safeView}>
      {/* vue principale contenant la vue enfant */}
        <View style ={styles.container}>
            {children} {/* affiche dynamiquement ce que le wrapper enveloppe */}
        </View>
    </SafeAreaView>
  )
}                          

export default Wrapper

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.primary[50],
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.primary[50],
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
})