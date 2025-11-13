import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle, ActivityIndicator, StyleProp } from 'react-native'
import React from 'react'
import { AppColors } from '../constants/theme'

interface ButtonProps {
  title: string
  onPress: () => void
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  disabled?: boolean
  fullWidth?: boolean
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  
}

const Button:React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled
  ]

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    textStyle
  ]

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' || variant === 'secondary' ? '#fff' : AppColors.primary[500]} 
          size="small" 
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

export default Button


//#region style
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  
  // Variants
  primary: {
    backgroundColor: AppColors.primary[500],
  },
  secondary: {
    backgroundColor: AppColors.accent[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: AppColors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Style bu btn
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  outlineText: {
    color: AppColors.primary[500],
  },
  ghostText: {
    color: AppColors.primary[500],
  },
  
  // Tailles du btn
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  
 
  },
  medium: {
      paddingVertical: 12,
    paddingHorizontal: 24,
  
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

})
//#endregion