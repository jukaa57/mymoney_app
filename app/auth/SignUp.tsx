import { LabelInput } from "@/components/LabelIput";
import { View, TouchableOpacity, TextInput, Alert} from "react-native";
import { useThemeColor } from '@/hooks/useThemeColor';
import { ButtonGradient } from "@/components/ButtonGradient";
import text from "@/language.json"
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form"
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from 'expo-router';
import { useEffect, useRef } from "react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const signUpSchema= z.object({
  username: z.string(),
  email: z.string().trim().email(),
  password: z.string().trim().min(8, ''),
  confirmPassword: z.string().min(8, ''),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type signUpType = z.infer<typeof signUpSchema>

export default function SignUp() {
  const language = "en"
  const lang = text[language]
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'primary');
  const { handleSignup } = useAuth()

  const emailRef = useRef<TextInput>(null);
  const passRef = useRef<TextInput>(null);
  const confirmPassRef = useRef<TextInput>(null);
  const buttonRef = useRef<any>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm ({
    resolver: zodResolver(signUpSchema),
  })
  const navigation = useNavigation();

  useEffect(() => {
    // Oculta o header para esta tela específica
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onSubmit = handleSubmit(async (data) => {
    handleSignup(data)
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor
      }}
    >
      <View
      style={{ gap: 20 }}
      >
        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInput returnKeyType="next" onSubmitEditing={() => emailRef.current?.focus()} onBlur={onBlur} onChangeText={onChange} value={value} label={lang.SignUp.label[0]} placeholder={lang.SignUp.placeholder[0]} />
          )}
          name="username"
        />
        {errors.username && <ThemedText>This is required.</ThemedText>}

        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInput reference={emailRef} label={lang.SignUp.label[1]} placeholder={lang.SignUp.placeholder[1]} 
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => passRef.current?.focus()}
            onBlur={onBlur} onChangeText={onChange} value={value}
            autoCapitalize="none"
            autoCorrect={false}
            />
          )}
          name="email"
        />
        {errors.email && <ThemedText>This is required.</ThemedText>}   

        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInput label={lang.SignUp.label[2]} placeholder={lang.SignUp.placeholder[2]} 
            autoComplete="off"
            reference={passRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPassRef.current?.focus()}
            autoCapitalize="none"
            onBlur={onBlur} onChangeText={onChange} value={value}
            autoCorrect={false}
            secureTextEntry={true}
            passwordRules={"required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"}
            />
          )}
          name="password"
        />
        {errors.password && <ThemedText>This is required.</ThemedText>}   

        <Controller
          control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInput label={lang.SignUp.label[3]} placeholder={lang.SignUp.placeholder[3]} 
            reference={confirmPassRef} 
            returnKeyType="done"
            onSubmitEditing={() => buttonRef.current?.onPress()}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={onBlur} onChangeText={onChange} value={value}
            secureTextEntry={true}
            passwordRules={"required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"}
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && <ThemedText>This is required.</ThemedText>}   
      </View>

      <ButtonGradient title={lang.SignUp.button} onPress={onSubmit}/>

      <TouchableOpacity style={{marginTop: 5}} onPress={() => router.replace('/auth/SignIn')} >
        <ThemedText style={{color, textDecorationLine: "underline"}}>{lang.SignUp.other}</ThemedText>
      </TouchableOpacity>
    </View>
  );
}