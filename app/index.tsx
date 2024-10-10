// app/index.tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Link } from 'expo-router';
import { Text, View, StatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    'Rimouski-SB': require('../assets/fonts/rimouski sb.otf'), // Adjust path if necessary
  });

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch (error) {
        console.error("Error locking orientation:", error);
      }
    };

    const hideSplashScreen = async () => {
      if (loaded || error) {
        await SplashScreen.hideAsync();
      }
    };

    lockOrientation();
    hideSplashScreen();
  }, [loaded, error]);

  // Show nothing until fonts are loaded
  if (!loaded && !error) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Hide the status bar */}
      <StatusBar hidden={true} />
      <Text style={{ fontFamily: 'Rimouski-SB' }}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <Link style={{ fontFamily: 'Rimouski-SB' }} href={"/home"}>
        Go to Home
      </Link>
    </View>
  );
}
