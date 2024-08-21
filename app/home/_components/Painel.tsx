import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Image, StyleSheet, View } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import language from '@/language.json'

type PainelProps = {
    lightColor?: string,
    darkColor?: string,
    data?: {
        username?: string,
        balance?: number,
        profile?: string
    }
}

export function Painel({
    darkColor, data, lightColor
}: PainelProps) {
    const backgroundColor = useThemeColor({light: '', dark: ''},'background2')
    const color = useThemeColor({light: '', dark: ''},'icon')
    const lang = language['en'].Home;

    return (
        <View style={[style.container, {backgroundColor}]}>
            <View style={[style.row, {justifyContent: 'space-between'}]}>
                <View style={[style.row,]}>
                    <Image style={style.profile} src={data?.profile} />
                    <ThemedText>{lang.Painel[0]}, {data?.username ? `${data?.username}!` : `${lang.Painel[1]}!`}</ThemedText>
                </View>

                <View style={[style.row,  {gap: 15}]}>
                    <MaterialCommunityIcons name='eye-off' size={24} color={color} onPress={()=> console.log('Eyes')}/>
                    <MaterialIcons name='settings' size={24} color={color} onPress={()=> console.log('settings')}/>
                </View>
            </View>
            <View >
                <ThemedText type='defaultSemiBold'>{lang.Painel[2]}</ThemedText>
                <ThemedText type='subtitle'>$ {data?.balance}</ThemedText>
            </View>
            <View>
                <ThemedText>{lang.Painel[3]} 30/07</ThemedText>
                <ThemedText>- $50.00</ThemedText>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        height: 192,
        borderRadius: 10,
        padding: 15,
        gap: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 20,
    }
})