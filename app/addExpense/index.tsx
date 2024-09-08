import {useEffect, useState} from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,  } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { useNavigation } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialIcons,  } from '@expo/vector-icons';
import language from '@/language.json';
import { Calendar } from 'react-native-calendars';
import { Tags, Icons } from '@/configs/config.json';
import { moneyMask } from '@/services/util';

export default function AddExpense() {
    const backgroundColor = useThemeColor({}, 'background');
    const backgroundColor2 = useThemeColor({}, 'background2');
    const primary = useThemeColor({}, 'primary');
    const blueColor = useThemeColor({}, 'secondary');
    const red = useThemeColor({}, 'billing');
    const icon = useThemeColor({}, 'text');
    const recept = useThemeColor({}, 'recept');
    const lang = language['en'].AddExpense
    const navigation = useNavigation();

    const [amount, setAmount] = useState('')
    const [openCalendar, setOpenCalendar] = useState(false)
    const [category, setCategory] = useState('')
    const [selectedDate, setSelectedDate] = useState(() => {
        let date = new Date().toISOString().split('T')[0]
        let [y, m, d]:any = date.split('-')

        return `${d}/${m}/${y}`
    })
    const [selectedIcon, setSelectedIcon] = useState('')

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
            <TouchableOpacity
            key={i.name}
            activeOpacity={0.7} 
            style={[styles.btnIcon, {backgroundColor: i.name == selectedIcon?'white':'transparent'}]}
            onPress={() => i.name == selectedIcon ? setSelectedIcon('') : setSelectedIcon(i.name)}
            >
            {
                ( i.category === category || i.label === category )&&
                <MaterialIcons name={i?.name} size={36} color={ i.name == selectedIcon ? backgroundColor : icon}/> 
            }
            </TouchableOpacity>
        ))
    }
    
    function cancel() {
        Alert.alert(lang.buttonAction[0], lang.buttonAction[1], [
            {
              text: lang.buttonAction[2],
              style: 'cancel',
            },
            {text: lang.buttonAction[3], onPress: () => navigation.goBack() },
        ])
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.container, {backgroundColor}]}>
                <ThemedText style={{alignSelf: 'flex-start'}} type='subtitle'>
                    {lang.header[0]}
                </ThemedText>

                <View>
                    <ThemedText> {lang.contant[0]} </ThemedText>
                    <TextInput
                    style={styles.descr}
                    />
                </View>

                <View>
                    <ThemedText> {lang.contant[1]} </ThemedText>
                    <TouchableOpacity
                    style={styles.btnCalendar}
                    onPress={toggleCalendar}
                    >
                        <MaterialIcons name='calendar-month' size={28} color={icon}/>
                        <ThemedText> {selectedDate} </ThemedText>
                    </TouchableOpacity>
                </View>
                <>
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
                </>

                <View style={[styles.RowContain, {alignItems: 'flex-end', justifyContent: 'space-between', width: 300, }]}>
                    <View style={[styles.RowContain, {alignItems: 'center', justifyContent: 'center', }]}>
                        <MaterialIcons name='sync' size={24} color={icon}/>
                        <ThemedText> {lang.contant[2]} </ThemedText>
                    </View>

                    <View>
                        <ThemedText> {lang.contant[3]} </ThemedText>
                        <TextInput style={styles.inptRecurr}/>
                    </View>
                </View>

                <View style={styles.RowContain}>
                    <MaterialIcons name='attach-money' size={36} color={red}/>
                    <TextInput keyboardType='numeric' inputMode='numeric' style={styles.inpt} value={amount} onChangeText={e => setAmount(moneyMask(e))} />
                </View>
                
                <View>
                    <ThemedText> {lang.contant[4]} </ThemedText>
                    <TextInput
                    style={styles.memo}
                    />
                </View>

                <View>
                    <ThemedText> {lang.contant[5]} </ThemedText>
                    <View
                    style={[styles.wrapContainer, {backgroundColor: backgroundColor2}]}
                    >
                        <View style={styles.wrap}>
                        {Tags['en'].map(tag => 
                            <TouchableOpacity
                            key={tag.category}
                            activeOpacity={0.7}
                            onPress={() => setCategory(tag.category)}>
                                <Text
                                style={{
                                    borderWidth: 1, 
                                    borderRadius: 4,
                                    padding: 3,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    borderColor: tag.borderColor,
                                    backgroundColor: tag.category == category ? tag.borderColor : tag.backgroundColor,
                                    color: icon,
                                    textAlign: 'center',
                                }}>
                                    {tag.category}
                                </Text>
                            </TouchableOpacity>
                        )}
                        </View>
                    </View>
                </View>

                <View>
                    <ThemedText>{lang.contant[6]}</ThemedText>
                    <View style={[styles.wrapContainer, {backgroundColor: backgroundColor2}]}>
                        <ThemedText>{category}</ThemedText>
                        <View style={[styles.wrap, ]}>
                        { filterIcon() }  
                        </View>
                    </View>
                </View>

                <View>
                    <ThemedText>{lang.contant[7]}</ThemedText>
                    <TouchableOpacity style={[styles.file, {backgroundColor: backgroundColor2,}]} activeOpacity={0.8}>
                        <ThemedText type='subtitle'>{lang.contant[8]}</ThemedText>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={[styles.button, {backgroundColor: primary, marginTop: 40,}]} activeOpacity={0.8}>
                    <ThemedText type='subtitle'>{lang.contant[9]}</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.button, {backgroundColor: red, }]}
                activeOpacity={0.8}
                onPress={cancel}
                >
                    <ThemedText type='subtitle'>{lang.contant[10]}</ThemedText>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
        paddingTop: 40,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: 'center',
        paddingBottom: 15
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
        backgroundColor: 'white',
        paddingHorizontal: 10,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'right'
    },
    inptRecurr: {
        width: 97,
        height: 40,
        paddingHorizontal: 10,
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
    descr: {
        height: 40,
        width: 300,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    memo: {
        height: 70,
        width: 300,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    wrapContainer: {
        width: 300,
        marginBottom: 15,
        gap: 12,
        padding:10,
        borderRadius: 8
    },
    wrap: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        gap: 12,
    },
    btnIcon: {
        borderRadius: 5,
        backgroundColor: 'transparent',
        padding:2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    file: {
        width: 300,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#ccc'
    },
    button : {
        width: 300,
        height: 50,        
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    }
})

