import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('accessToken');
            if(token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        })()
    }, [])

//   const handleAuth
    const handleSignup = async (data: any) => {
        try{
            const response = await api.post('/signup', {
                username: data.username,
                email: data.email,
                password: data.password
            })
            if(response.status == 202) {
                router.replace('/auth/ValideCode')
            }
        } catch (err: any) {
            console.error(err.response.data)
        }
    }

    const handleValideCode = async (data: any) => {
        try{
            const response = await api.get(`/validate/${data}`)
            if(response.status == 200) {
                setIsAuthenticated(true)
                router.replace('/auth/SignIn')
            }
        } catch (err: any) {
            console.error(err.response.data)
        }
    }

    const handleSignin = async (data: any) => {
        // Simulação de autenticação
        try {
            const response = await api.post('/signin', { email: data.email, password: data.password})
            if(response.status == 200) {
                let credentials = response.data.accessToken
                setIsAuthenticated(true);
                await AsyncStorage.setItem('accessToken', credentials);
                router.replace('/home')
            }
        } catch (error: any) {
            console.error(error.response.data);
            return false;
        }
    };

    const handleSignInWithGoogle = async () => {
        // Simulação de autenticação
        // try {
            const response = await api.get('/auth/google', )
            console.log(response)
            // if(response.status == 200) {
            //     setIsAuthenticated(true);
            //     router.replace('/home')
            // }
        // } catch (error: any) {
        //     console.error(error);
        //     return false;
        // }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        handleSignup,
        handleValideCode,
        handleSignin,
        handleSignInWithGoogle,
        logout,
    };
}
