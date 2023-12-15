import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useSession} from "../contexts/ctx";
import {useLanguageContext} from "../contexts/LanguageContext";
import {ChangeLanguage} from "./ChangeLanguage";

const ContactInfo = () => {
    const {translations, language} = useLanguageContext();
    const sessionContext = useSession();
    const [showModal, setShowModal] = useState(false);
    const [contactInfo, setContactInfo] = useState({});
    useEffect(() => {
        (() => sessionContext?.loadFromAsyncStorage('user_info').then(r => r ? JSON.parse(r).student : {}).then(setContactInfo))();
    }, []);
    return (
      <View style={styles.container}>
          <View style={styles.row}>
              <Text style={styles.infoLabel}>{translations.ism}:</Text>
              <Text style={styles.infoValue}>{contactInfo.firstname}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.infoLabel}>{translations.familiya}:</Text>
              <Text style={styles.infoValue}>{contactInfo.lastname}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.infoLabel}>{translations.id_raqami}:</Text>
              <Text style={styles.infoValue}>{contactInfo.student_number}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.infoLabel}>{translations.telefon_raqami}:</Text>
              <Text style={styles.infoValue}>{contactInfo.phone_number}</Text>
          </View>

          <View style={{height: 1, backgroundColor: '#8C8C8C', marginTop: 20, marginBottom: 20}}/>

          <View style={styles.row}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    name={'call-outline'}
                    size={24}
                    color={'#575757'}
                  />
                  <Text style={{padding: 10}}>{translations.raqamni_ozgartirish}</Text>
              </View>
          </View>

          <View style={styles.row}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    name={'keypad-outline'}
                    size={24}
                    color={'#575757'}
                  />
                  <Text style={{padding: 10}}>{translations.parolni_ozgartirish}</Text>
              </View>
          </View>

          <Pressable onPress={() => setShowModal(prevState => !prevState)}>
              <View style={styles.row}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicons
                        name={'language-outline'}
                        size={24}
                        color={'#575757'}
                      />
                      <Text style={{padding: 10}}>{translations.tilni_ozgartirish}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text>{language === 'jp' ? '日本語 ' : language === 'uzb' ? 'o\'zbek' : 'english'}</Text>
                      <Ionicons
                        name={'chevron-forward'}
                        size={15}
                        color={'#0386D0'}
                      />
                  </View>
              </View>
          </Pressable>
          {showModal && <ChangeLanguage/>}

          <View style={styles.row}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    name={'exit-outline'}
                    size={24}
                    color={'red'}
                  />
                  <Text onPress={() => {
                      sessionContext.signOut();
                  }} style={{padding: 10, color: 'red'}}>{translations.akkountdan_chiqish}</Text>
              </View>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 25,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    infoLabel: {
        fontSize: 16,
        color: "#8C8C8C",
        paddingTop: 10,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: "bold",
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 16,
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default ContactInfo;