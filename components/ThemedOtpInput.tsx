import { TextInput, type TextInputProps , StyleSheet, View, Keyboard  } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import React, { useEffect, useRef, useState } from 'react';

export type ThemedOtpInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  label?: string;
  numberOfInputs: number;
  styleLabel?: any;
  styleContainer?: any;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  setCode: (code: string) => void;
  code: string;
};
  
export function ThemedOtpInput({
  style,
  lightColor,
  darkColor,
  type = 'default',
  label,
  numberOfInputs,
  styleContainer,
  styleLabel,
  setCode,
  code,
  ...rest
}: ThemedOtpInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'placeholder');



  const handleInputChange = (text: string) => {
    setCode(text);
  };

  return (
    <View style={[styles.container, styleContainer]}>
      <ThemedText type='defaultSemiBold' style={{marginBottom: 50}}>{label}</ThemedText>
      <View style={styles.containInput}>
        <TextInput
          style={[styles.input, style]}
          {...rest}
          returnKeyType='done'
          onChangeText={text => handleInputChange(text)}
          maxLength={6}
          keyboardType='number-pad'
          value={code}
        />
      </View>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containInput: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  },
  input: {
    width: 250,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    color: '#333',
    borderWidth: 1,
    fontSize: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
  