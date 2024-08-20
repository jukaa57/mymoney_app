import { useThemeColor } from "@/hooks/useThemeColor";
import { View, ViewProps } from "react-native";

type LineProps = ViewProps & {

}

export function ThemedLine({ style, ...rest}: LineProps){
    const backgroundColor = useThemeColor({}, 'primary')
    return <View style={[style, {height: 2, backgroundColor, marginBottom: 20 }]} />;
} 