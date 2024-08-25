import {useEffect, useState} from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,  } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { useNavigation } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialIcons } from '@expo/vector-icons';
import language from '@/language.json';
import { Calendar } from 'react-native-calendars';
import { Tags, Icons } from '@/configs/config.json';

export default function AddFunds() {
    const backgroundColor = useThemeColor({}, 'background');
    const backgroundColor2 = useThemeColor({}, 'background2');
    const icon = useThemeColor({}, 'text');
    const recept = useThemeColor({}, 'recept');
    const lang = language['en'].AddFunds
    const navigation = useNavigation();

    const [openCalendar, setOpenCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState(() => {
        let date = new Date().toISOString().split('T')[0]
        let [y, m, d]:any = date.split('-')

        return `${d}/${m}/${y}`
    })

    const [category, setCategory] = useState('')

    // useEffect(() => {
    //   // Oculta o header para esta tela específica
    //   navigation.setOptions({ headerShown: false });
    // }, [navigation]);

    function toggleCalendar() {
        setOpenCalendar(!openCalendar);
    }

    function onDateChange(date: string) {
        let [y, m, d]:any = date.split('-')
        setSelectedDate(`${d}/${m}/${y}`);
        setOpenCalendar(false);
    }

    function filterIcon() {
        const filteredIcon = Icons.filter(icon => icon.category === category || icon.label === category)
       return filteredIcon.map((i) => (
            <TouchableOpacity key={i.name} activeOpacity={0.7}>
            {
                ( i.category === category || i.label === category )&&
                <MaterialIcons name={i?.name} size={36} color={icon}/> 
            }
            </TouchableOpacity>
        ))
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.container, {backgroundColor}]}>
                <ThemedText style={{alignSelf: 'flex-start'}} type='subtitle'>
                    {lang.header[0]}
                </ThemedText>
                <View style={styles.RowContain}>
                    <MaterialIcons name='attach-money' size={36} color={recept}/>
                    <TextInput style={styles.inpt}/>
                </View>

                <View>
                    <ThemedText> {lang.contant[0]} </ThemedText>
                    <TouchableOpacity
                    style={styles.btnCalendar}
                    onPress={toggleCalendar}
                    >
                        <MaterialIcons name='calendar-month' size={28} color={icon}/>
                        <ThemedText> {selectedDate} </ThemedText>
                    </TouchableOpacity>
                </View>
                {
                openCalendar &&
                <Calendar
                style={styles.calendar}
                theme={{
                    backgroundColor: '#fff',
                    calendarBackground: '#000',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e'
                }}
                onDayPress={(day: string) => {
                    onDateChange(day.dateString);
                }}
                markedDates={{
                    [selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                }}
                />
                }

                <View style={[styles.RowContain, {alignItems: 'flex-end', justifyContent: 'space-between', width: 300, }]}>
                    <View style={[styles.RowContain, {alignItems: 'center', justifyContent: 'center', }]}>
                        <MaterialIcons name='sync' size={24} color={icon}/>
                        <ThemedText> {lang.contant[1]} </ThemedText>
                    </View>

                    <View>
                        <ThemedText> Teste </ThemedText>
                        <TextInput style={styles.inptRecurr}/>
                    </View>
                </View>

                <View>
                    <ThemedText> {lang.contant[2]} </ThemedText>
                    <TextInput
                    style={styles.memo}
                    />
                </View>
                
                <View>
                    <ThemedText> {lang.contant[3]} </ThemedText>
                    <View
                    style={[styles.wrap, {backgroundColor: backgroundColor2}]}
                    >
                        {Tags['en'].map(tag => 
                            <TouchableOpacity key={tag.category} activeOpacity={0.7} onPress={() => setCategory(tag.category)}>
                                <Text
                                style={{
                                    borderWidth: 1, 
                                    borderRadius: 4,
                                    padding: 3,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    borderColor: tag.borderColor,
                                    backgroundColor: tag.backgroundColor,
                                    color: icon,
                                    textAlign: 'center',
                                }}>
                                    {tag.category}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                
                <View>
                    <ThemedText>{lang.contant[4]}</ThemedText>
                    <View style={[styles.wrap, {backgroundColor: backgroundColor2}]}>
                    {
                        filterIcon()
                    }  
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        paddingTop: 40,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: 'center',
    },
    RowContain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 15
    },
    inpt: {
        width: 197,
        height: 55,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    inptRecurr: {
        width: 97,
        height: 24,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    btnCalendar: {
        width: 300,
        gap: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    calendar: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 350,
        zIndex: 999,
        height: 350,
        borderRadius: 8,
        position: 'absolute',
        top: 0,
        left: -170
    },
    memo: {
        height: 70,
        width: 300,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    wrap: {
        width: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        gap: 12,
        padding:10
    }
})

