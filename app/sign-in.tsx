import {router} from 'expo-router';
import {Linking, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSession} from "../contexts/ctx";
import * as React from "react";
import {useEffect, useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Image} from 'expo-image';
import {useLanguageContext} from "../contexts/LanguageContext";
import CustomButton from "../components/CustomButton";

export default function SignIn() {
  const sessionContext = useSession();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {translations} = useLanguageContext();
  const [buttonState, setButtonState] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [pswError, setPswError] = useState(false);

  useEffect(() => {
    (() => sessionContext?.loadFromAsyncStorage('user_info').then(r => r ? JSON.parse(r).responsiblePerson.email : '').then(setEmail))();
  }, []);

  const handleSubmit = async () => {
    setButtonState(true);
    try {
      await sessionContext?.login(
        email.toString(),
        password.toString(),
        'https://ktd5kacfz5.execute-api.ap-northeast-1.amazonaws.com/default/api/auth/signIn'
      ).then(async r => {
        if (r.status !== 200) {
          setButtonState(false);
          setMailError(true);
          setPswError(true);
          setEmail('');
          setPassword('');
        } else {
          const response = await r.json();
          sessionContext?.signIn(response.token);
          sessionContext?.saveToAsyncStorage('user_info', response).then(() => router.replace('/'));
        }
      });

    } catch (e) {
      setButtonState(false);
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Image source={require('../assets/images/splash.png')} style={styles.logo}/>
      </View>
      <Text style={styles.title}>{translations.login}</Text>
      <Text style={styles.subtitle}>{translations.login_text}</Text>
      <View style={styles.row}>
        <Ionicons style={[styles.icon, mailError && styles.error]} name={'ios-mail'} size={28} color={'#ccc'}/>
        <TextInput style={[styles.input, mailError && styles.error]} placeholder={translations.login_mail} value={email}
                   onChangeText={text => {
                     setEmail(text);
                     setMailError(false);
                   }}
                   inputMode={"email"}/>
      </View>
      <Text style={[styles.errorStyle, mailError ? styles.error : styles.disappear]}>{translations.login_error}</Text>
      <View style={styles.row}>
        <Ionicons style={[styles.icon, pswError && styles.error]} name={'ios-lock-closed'} size={28} color={'#ccc'}/>
        <TextInput secureTextEntry={true} style={[styles.input, pswError && styles.error]}
                   placeholder={translations.login_password}
                   value={password}
                   onChangeText={text => {
                     setPassword(text);
                     setPswError(false);
                   }}/>
      </View>
      <Text style={[styles.errorStyle, pswError ? styles.error : styles.disappear]}>{translations.login_error}</Text>
      <Text style={styles.link} onPress={() => {
          Linking.openURL('https://www.example.com');
      }}>
        {translations.login_help}
      </Text>
      <CustomButton disabled={buttonState} customFunction={handleSubmit} title={translations.login_button}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  errorStyle: {
    color: 'red',
    textAlign: 'center',
  },
  center: {
    alignSelf: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    display: 'flex',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
    color: '#6B5E5E',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 4.5,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '70%',
  },
  link: {
    color: '#0386D0',
    fontWeight: '500',
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'right',
  },
  error: {
    borderColor: 'red',
  },
  disappear: {
    display: "none",
  }
});