import { Button, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { ThemedOtpInput } from '@/components/ThemedOtpInput';
import text from "@/language.json"
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ButtonGradient } from "@/components/ButtonGradient";
import { ThemedText } from '@/components/ThemedText';
import { Link, router } from "expo-router";
import { useNavigation } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
export default function ValideCode() {
    const { handleValideCode } = useAuth()
    const [code, setCode] = useState('');
    const language = "en"
    const lang = text[language]
    const backgroundColor = useThemeColor({}, 'background');
    const color = useThemeColor({}, 'primary');
    const navigation = useNavigation();
    
    useEffect(() => {
      // Oculta o header para esta tela específica
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const onSubmit = async () => {
        handleValideCode(code);
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                paddingHorizontal: 30,
                paddingTop: 120,
                backgroundColor
            }}
        >
            <ThemedText type='defaultSemiBold' style={{ marginBottom: 120, fontSize: 18 }} >{lang.ValidateCode.title}</ThemedText>

            <ThemedOtpInput label={lang.ValidateCode.label} numberOfInputs={6} code={code} setCode={setCode}/>
            
            <ButtonGradient title={lang.ValidateCode.button} onPress={onSubmit}/>

            <TouchableOpacity style={{marginTop: 30}} onPress={() => console.log('resend code')} >
                <ThemedText style={{color, textDecorationLine: "underline"}}>{lang.ValidateCode.resend}</ThemedText>
            </TouchableOpacity>
        </View>
    )
} 