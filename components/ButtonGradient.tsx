import { LinearGradient } from "expo-linear-gradient"
import { Button, TouchableOpacity } from "react-native"
import { ThemedText } from "./ThemedText"
import { useThemeColor } from "@/hooks/useThemeColor"

type buttonType = {
    title: string,
    onPress?: () => void,
    buttonType?: buttonType
}

export const ButtonGradient = ({title, onPress}: buttonType) => {
    const color = useThemeColor({}, 'text')
    return (
        <TouchableOpacity
        style={{ marginTop: 40 }}
        onPress={onPress}
        >
            <LinearGradient
            colors={["#7338AC", "#219BE4"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 1, y: 0.2 }}
            style={{
                width: 285,
                height: 45,
                
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                <ThemedText style={{fontSize: 20, fontWeight: '700', color: '#fff'}}>{title}</ThemedText>
            </LinearGradient>
        </TouchableOpacity>
    )
}