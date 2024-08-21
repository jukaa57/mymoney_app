import {useEffect} from 'react'
import { ScrollView, View,  } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { useNavigation } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function AddFunds() {
    const backgroundColor = useThemeColor({}, 'background');

    const navigation = useNavigation();

    // useEffect(() => {
    //   // Oculta o header para esta tela específica
    //   navigation.setOptions({ headerShown: false });
    // }, [navigation]);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, gap: 10, paddingTop: 40, paddingBottom: 15, justifyContent: "center", alignItems: 'center', backgroundColor}}>
                <ThemedText></ThemedText>
            </View>
        </ScrollView>
    )
}