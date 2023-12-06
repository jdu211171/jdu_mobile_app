import * as React from "react";
import {View, Text, TextInput, Button, Linking} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from "expo-web-browser";

const SignUpForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = () => {
        // Sign up logic here
    }

    return (
        <View style={{ padding: 20, }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Kirish</Text>
            <Text style={{ display: 'flex', fontSize: 14, marginVertical: 10, textAlign: 'center', color: '#6B5E5E' }}>Ushbu dasturga kirish orqali siz bizning shart va siyosatimizga rozilik bildirasiz</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Ionicons
                    style={{ borderBottomWidth: 1, borderColor: '#ccc', padding: 4 }}
                    name={'ios-mail'}
                    size={28}
                    color={'#ccc'} />
                <TextInput
                    style={{ height: 40, borderBottomWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, width: '70%' }}
                    placeholder="E-pochta manzili"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Ionicons
                    style={{ borderBottomWidth: 1, borderColor: '#ccc', padding: 4 }}
                    name={'ios-lock-closed'}
                    size={28}
                    color={'#ccc'} />
                <TextInput
                    secureTextEntry={true}
                    style={{ height: 40, borderBottomWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, width: '70%' }}
                    placeholder="Parol"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <Text
                style={{ color: '#0386D0', fontWeight: '500', paddingTop: 15, paddingBottom: 15 , textAlign: 'right' }}
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
                style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center', padding: 10, backgroundColor: '#1A2857', borderRadius: 10 }}
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
                Kirish
            </Text>
        </View>
    );
}

export default SignUpForm;
