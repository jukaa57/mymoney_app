import { LabelInput } from "@/components/LabelIput";
import { Text, View, TextInput, TouchableOpacity} from "react-native";
import { useThemeColor } from '@/hooks/useThemeColor';
import { ButtonGradient } from "@/components/ButtonGradient";
import text from "@/language.json"
import { ThemedText } from "@/components/ThemedText";
import { Link, router } from "expo-router";
import { useNavigation } from 'expo-router';
import { useEffect, useRef } from "react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from "react-hook-form"
import { useAuth } from "@/hooks/useAuth";
import LogoGoole from '@/assets/svgs/google.svg'

const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8, ''),
})


export default function SignIn() {
  const language = "en"
  const lang = text[language]
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'primary');
  const navigation = useNavigation();
  const { handleSignin, handleSignInWithGoogle } = useAuth()
  const passRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm ({
    resolver: zodResolver(signInSchema),
  })
  
  useEffect(() => {
    // Oculta o header para esta tela específica
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onSubmit = handleSubmit(async (data) => {
    handleSignin(data)
  })

  const handleSubmitGoogle = () => {
    handleSignInWithGoogle()
  }

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
            <LabelInput label={lang.SignIn.label[0]} placeholder={lang.SignIn.placeholder[0]} 
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
            <LabelInput label={lang.SignIn.label[1]} placeholder={lang.SignIn.placeholder[1]}
            autoComplete="off"
            reference={passRef}
            returnKeyType="next"
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
      </View>
      <ButtonGradient  title={lang.SignIn.button} onPress={onSubmit} />

      <ThemedText style={{marginBottom: 15}}>{lang.SignIn.other}</ThemedText>

      <TouchableOpacity style={{marginTop: 5, padding: 5, borderRadius: 5, flexDirection: 'row', alignItems: 'center', gap: 15, backgroundColor: '#fff'}} onPress={() => handleSubmitGoogle()}>
        <LogoGoole width={25} height={40} />
        <ThemedText style={{color: backgroundColor}} type="defaultSemiBold">{lang.SignIn.google}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop: 5}} onPress={() => router.replace('/auth/SignUp')}>
        <ThemedText style={{color, textDecorationLine: "underline"}}>{lang.SignIn.signup}</ThemedText>
      </TouchableOpacity>
    </View>
  );
}