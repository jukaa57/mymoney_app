import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import language from '@/language.json'
import { ThemedLine } from "@/components/ThemedLine";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ResumeHistory() {
    const backgroundColor = useThemeColor({}, 'primary')
    const bill = useThemeColor({}, 'billing')
    const recept = useThemeColor({}, 'recept')
    const icon = useThemeColor({}, 'text')
    let locale: 'br' | 'en' = 'en'
    const lang = language[locale].Home

    const mock = [
        {
            date: '20/07/2024',
            title: 'Salary',
            icon: 'cash-multiple',
            type: 'c',
            value: 800
        },
        {
            date: '18/07/2024',
            title: 'IFood',
            icon: 'food',
            type: 'd',
            value: 100
        },
        {
            date: '12/07/2024',
            title: 'electricity bill',
            icon: 'flash',
            type: 'd',
            value: 98
        },
        {
            date: '10/07/2024',
            title: 'Hair',
            icon: 'hair-dryer-outline',
            type: 'd',
            value: 25
        },
        {
            date: '05/07/2024',
            title: 'salary',
            icon: 'cash-multiple',
            type: 'c',
            value: 400
        }
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

                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 4, width: '35%'}}>
                        {resume?.icon &&
                        <MaterialCommunityIcons name={resume?.icon} size={24} color={icon} />
                        }
                        <ThemedText style={styles.text}>{resume.title.length > 15 ? resume.title.substring(0, 13) + '...' :  resume.title}</ThemedText>
                    </View>

                    <Text style={[styles.text, {color: resume.type == 'c' ? recept : bill, fontWeight: '700'}]}>{resume.type == 'c' ? `+ ${currency.format(resume.value)}`: `- ${currency.format(resume.value)}`}</Text>
                </View>
            ))
        )
    }

    return (
        <View>
            <ThemedText type="defaultSemiBold" >{lang.Dashboard[0]}</ThemedText>
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