import { Text, TextInput,  type TextInputProps, View, type ViewProps} from "react-native"
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from "./ThemedText";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

type labelInputProps = TextInputProps &{
    label: string,
    placeholder: string,
    reference?: any
}

export const LabelInput = ({label, placeholder, style, reference, ...inpt }: labelInputProps, { ...otherProps }: ThemedViewProps) => {
    const color = useThemeColor({ }, 'placeholder');

    return (
        <View 
            {...otherProps}
        >
            <ThemedText >{label}</ThemedText>
            <TextInput 
            ref={reference}
            placeholder={placeholder} 
            style={[{ 
            height: 40,
            borderColor: "gray",
            width: 332,
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#f5f5f5'
             }, style]}
            placeholderTextColor={color}
            {...inpt}
            passwordRules={"required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"}
            />
        </View>
    )
}