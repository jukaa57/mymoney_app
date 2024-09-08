import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons,  } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";

export function NavBar() {
    const backgroundColor = useThemeColor({light: '', dark: ''},'background2')
    const primaryColor = useThemeColor({light: '', dark: ''},'primary')
    const icon = useThemeColor({light: '', dark: ''}, 'icon')

    const btnData = [
        {
            name: 'currency-usd',
            router: '../addReceipts'
        },
        {
            name: 'currency-usd-off',
            router: '../addExpense'
        },
        {
            name: 'piggy-bank-outline',
            router: '/stock'
        },
        {
            name: 'finance',
            router: '/finance'
        },
        {
            name: 'file-outline',
            router: '/file'
        },
    ]

    return(
        <View style={[style.container, {backgroundColor}]}>
            {
            btnData.map(btn => (
                <TouchableOpacity style={[style.button, {backgroundColor: primaryColor}]} activeOpacity={0.7} onPress={() => router.push(btn.router) }>
                    <MaterialCommunityIcons name={btn?.name} size={24} color={icon}/>
                </TouchableOpacity>
            ))
            }
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: 58,
        width: '90%',
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})