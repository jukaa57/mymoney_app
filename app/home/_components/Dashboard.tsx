import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { monthString } from "@/services/util";
import { StyleSheet, View } from "react-native";
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart, Grid } from 'react-native-svg-charts'
import { Chart } from "./_Chart";
import { ResumeHistory } from "./_ResumeHistory";
import { ResumeReceipts } from "./_ResumeReceipts";
import { ResumeBillings } from "./_ResumeBillings";
import { ResumeInvestments } from "./_ResumeInvestment";

export function Dashboard() {
    const data1 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const data2 = [ -87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18 ]

    //Array of datasets, following this syntax:
    const data = [
        {
            data: data1,
            svg: {
                strokeWidth: 2,
                stroke: 'url(#gradient1)',
            }
        },
        {
            data: data2,
            svg: {
                strokeWidth: 2,
                stroke: 'url(#gradient)',
            }
        },
    ]

    const backgroundColor = useThemeColor({dark: '', light: ''}, 'background2')

    const Gradient = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient1'} x1={'0'} y1={'0%'} x2={'100%'} y2={'0%'}>
                <Stop offset={'0%'} stopColor={'#f66e84'}/>
                <Stop offset={'100%'} stopColor={'#a10d1e'}/>
            </LinearGradient>
        </Defs>
    )
    const Gradient2 = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient'} x1={'0'} y1={'0%'} x2={'100%'} y2={'0%'}>
                <Stop offset={'0%'} stopColor={'#7ab690'}/>
                <Stop offset={'100%'} stopColor={'#1a692d'}/>
            </LinearGradient>
        </Defs>
    )

    return(
        <View style={[style.container, {backgroundColor}]}>
            <View>
                <ThemedText type="subtitle">{monthString}</ThemedText>
                <Chart />
            </View>

            <View style={{gap: 20}}>
                <ResumeHistory/>
                <ResumeBillings/>
                <ResumeReceipts/>
                <ResumeInvestments/>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        padding: 15,
        borderRadius: 10,
        width: '90%',
        height: 'auto'
    }
})