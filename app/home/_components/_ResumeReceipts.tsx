import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import language from '@/language.json'
import { ThemedLine } from "@/components/ThemedLine";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ResumeReceipts() {
    const backgroundColor = useThemeColor({}, 'primary')
    const color = useThemeColor({}, 'recept')
    const icon = useThemeColor({}, 'text')	
    let locale: 'br' | 'en' = 'en'
    const lang = language[locale].Home

    const mock = [
        {
            date: '30/07/2024',
            title: 'Salary',
            icon: 'cash-multiple',
            type: 'c',
            value: 1550
        },
        {
            date: '12/07/2024',
            title: 'electricity bill',
            icon: 'flash',
            type: 'd',
            value: 98
        },
        {
            date: '12/07/2024',
            title: 'electricity bill',
            icon: 'flash',
            type: 'd',
            value: 98
        },
      
    ]
    
    let currency = locale == 'en' ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }) : new Intl.NumberFormat('br-PT', {
        style: 'currency',
        currency: 'BRL',
    });

    function RenderResume() {
        return (
            mock.map(resume => (
                <View style={styles.row}>
                    <ThemedText style={styles.text} >{resume.date}</ThemedText>

                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 4, width: '33%'}}>
                        {resume?.icon &&
                        <MaterialCommunityIcons name={resume?.icon} size={24} color={icon} />
                        }
                        <ThemedText style={styles.text}>{resume.title.length > 15 ? resume.title.substring(0, 13) + '...' :  resume.title}</ThemedText>
                    </View>

                    <Text style={[ {color, fontWeight: '700'}]}>{`+ ${currency.format(resume.value)}`}</Text>
                </View>
            ))
        )
    }

    return (
        <View>
            <ThemedText type="defaultSemiBold" >{lang.Dashboard[2]}</ThemedText>
            <ThemedLine />
            <RenderResume />

            <TouchableOpacity style={[styles.button, {backgroundColor,}]} activeOpacity={0.8}>
                <Text style={[styles.text, {color: '#fff', textAlign: 'center'}]}>{lang.Dashboard[4]}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    space: {
        marginHorizontal: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        fontWeight: '500',
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 15,
        width: 120,
        color: '#fff',
        textAlign: 'center',
        marginTop: 15,
    }
})