import "./global.css";
import { Slot, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font'
import { useEffect } from "react";


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf')
  })

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <Slot />
  )
}

export default RootLayout