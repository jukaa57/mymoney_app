import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart, Grid } from 'react-native-svg-charts'

export function Chart() {
    const data1 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const data2 = [ -87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18 ]
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
        <LineChart
            style={ { height: 152 } }
            data={ data }
            contentInset={ { top: 20, bottom: 20 } }
        >
            <Grid/>
            <Gradient/>
            <Gradient2/>
        </LineChart>
    )
}