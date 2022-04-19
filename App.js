import {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './src/screens/AuthScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check if hardware has biometric support
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible)
    })();
  });

  // function to Authenticate
  function onAuthenticate () {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Touch ID',
      fallbackLabel: 'Enter password'
    });
    auth.then(result => {
      setIsAuthenticated(result.success);
      console.log(result);
    }); 
  }
  
  return (
    <View style={styles.container}>
      {/* conditionally render page based on authentication state */}
      {
        isAuthenticated ? 
        <PaymentScreen setIsAuthenticated = {setIsAuthenticated}/> : 
        <Auth onAuthenticate = {onAuthenticate}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
