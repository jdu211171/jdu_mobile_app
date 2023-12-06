import {router} from 'expo-router';
import {Linking, Platform, Text, TextInput, View} from 'react-native';
import {useSession} from "../contexts/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";
import {Image} from 'expo-image';

export default function SignIn() {
  const sessionContext = useSession()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  
  const handleSubmit = async () => {
    try {
      sessionContext?.signIn();
      const token = await sessionContext?.sendCredentials(email, password, 'https://5gt6i3c4bh.execute-api.eu-north-1.amazonaws.com/default/api/signIn/');
      await saveToAsyncStorage(token);
      router.replace('/');
    } catch (error) {
      console.error('Authentication failed:', error);
      // Handle authentication error as needed (e.g., show an error message)
    }
  };
  
  const saveToAsyncStorage = async (token: string | undefined) => {
    await AsyncStorage.setItem('token', token || ''); // use `token || ''` to handle the case where `token` is undefined
  }
  
  return (
    <View style={{flex: 1, paddingLeft: 20, paddingRight: 20, marginTop: 20, alignContent: 'center', justifyContent: 'center'}}>
      <View style={{alignSelf: 'center'}}>
        <Image source={require('../assets/images/jdu_logo.png')} style={{width: 180, height: 180}}/>
      </View>
      <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Kirish</Text>
      <Text style={{display: 'flex', fontSize: 14, marginVertical: 10, textAlign: 'center', color: '#6B5E5E'}}>Ushbu
        dasturga kirish orqali siz bizning shart va siyosatimizga rozilik bildirasiz</Text>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
        <Ionicons
          style={{borderBottomWidth: 1, borderColor: '#ccc', padding: 4}}
          name={'ios-mail'}
          size={28}
          color={'#ccc'}/>
        <TextInput
          style={{height: 40, borderBottomWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, width: '70%'}}
          placeholder="E-pochta manzili"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
        <Ionicons
          style={{borderBottomWidth: 1, borderColor: '#ccc', padding: 4}}
          name={'ios-lock-closed'}
          size={28}
          color={'#ccc'}/>
        <TextInput
          secureTextEntry={true}
          style={{height: 40, borderBottomWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, width: '70%'}}
          placeholder="Parol"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Text
        style={{color: '#0386D0', fontWeight: '500', paddingTop: 15, paddingBottom: 15, textAlign: 'right'}}
        onPress={() => {
          if (Platform.OS !== 'web') {
            // Open the link in an in-app browser.
            WebBrowser.openBrowserAsync('https://www.example.com');
          } else {
            // On web, launch the link in a new tab.
            Linking.openURL('https://www.example.com');
          }
        }}
      >
        Parolni unutdingizmi?
      </Text>
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          padding: 10,
          backgroundColor: '#1A2857',
          borderRadius: 10,
          overflow: 'hidden'
        }}
        onPress={handleSubmit}
      >
        Kirish
      </Text>
    </View>
  );
}
