import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { router, Stack } from 'expo-router';
import SignIn from './auth/SignIn';
import HomeScreen from './home';

export default function root() {
  const { isAuthenticated } = useAuth();
  
  if( !isAuthenticated) <SignIn />

  return (
    <HomeScreen />
  )
}