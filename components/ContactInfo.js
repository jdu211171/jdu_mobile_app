import React, {useContext, useState} from "react";
import {StyleSheet, View, Text, Image, Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import UniversalModal from "./UniversalModal";
import DropdownList from "./DropdownList";
import {useSession} from "../contexts/ctx";
import {LanguageProvider, useLanguageContext} from "../contexts/LanguageContext";
import {ChangeLanguage} from "./ChangeLanguage";
// import {TranslationsContext} from "./LanguageSelectionScreen";

const ContactInfo = () => {
    const userLanguage = useLanguageContext();
    const sessionContext = useSession();
    const [contactInfo, setContactInfo] = useState({
        name: "Jahongir Saydaxmatov",
        id: "210286",
        phone: "998 (97) 665 35 28",
    });
    const [showModal, setShowModal] = useState(false);
    
    
    // const { locale, setLocale } = useContext(TranslationsContext);
    // const [selectedLanguage, setSelectedLanguage] = useState(locale);

    // const handleLanguageSelection = (language) => {
        // setSelectedLanguage(language);
        // setLocale(language);
        // Reload translations
    // };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.infoLabel}>ism:</Text>
                <Text style={styles.infoValue}>Jahongir</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.infoLabel}>familiya:</Text>
                <Text style={styles.infoValue}>Saydaxmatov</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.infoLabel}>id raqami:</Text>
                <Text style={styles.infoValue}>210285</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.infoLabel}>telefon raqami:</Text>
                <Text style={styles.infoValue}>998 (97) 665 35 28</Text>
            </View>

            <View style={{ height: 1, backgroundColor: '#8C8C8C', marginTop: 20, marginBottom: 20 }} />

            {/*<View style={styles.row}>*/}
            {/*    <View style={{ flexDirection: 'row', alignItems: 'center' }}>*/}
            {/*        <Ionicons*/}
            {/*            name={'megaphone-outline'}*/}
            {/*            size={24}*/}
            {/*            color={'#575757'}*/}
            {/*        />*/}
            {/*        <Text style={{ padding: 10 }}>Bildirishnomalar</Text>*/}
            {/*    </View>*/}
            {/*    <Ionicons*/}
            {/*        name={'toggle'}*/}
            {/*        size={38}*/}
            {/*        color={'#0386D0'}*/}
            {/*    />*/}
            {/*</View>*/}
            {/*<View style={styles.row}>*/}
            {/*    <View style={{ flexDirection: 'row', alignItems: 'center' }}>*/}
            {/*        <Ionicons*/}
            {/*            name={'moon-outline'}*/}
            {/*            size={24}*/}
            {/*            color={'#575757'}*/}
            {/*        />*/}
            {/*        <Text style={{ padding: 10 }}>Tungi rejim</Text>*/}
            {/*    </View>*/}
            {/*    <Ionicons*/}
            {/*        name={'toggle'}*/}
            {/*        size={38}*/}
            {/*        color={'#0386D0'}*/}
            {/*    />*/}
            {/*</View>*/}
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name={'call-outline'}
                        size={24}
                        color={'#575757'}
                    />
                    <Text style={{ padding: 10 }}>Raqamni o'zgartirish</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name={'keypad-outline'}
                        size={24}
                        color={'#575757'}
                    />
                    <Text style={{ padding: 10 }}>Parolni o'zgartirish</Text>
                </View>
            </View>
            
            {/*<UniversalModal container={*/}
            {/*        <View style={styles.row}>*/}
            {/*            <View style={{ flexDirection: 'row', alignItems: 'center' }}>*/}
            {/*                <Ionicons*/}
            {/*                    name={'language-outline'}*/}
            {/*                    size={24}*/}
            {/*                    color={'#575757'}*/}
            {/*                />*/}
            {/*                <Text style={{ padding: 10 }}>Tilni o'zgartirish</Text>*/}
            {/*            </View>*/}
            {/*            <View style={{ flexDirection: 'row', alignItems: 'center' }}>*/}
            {/*                /!*<Text>{userLanguage === 'jp' ? : "日本語" : language === 'eng': "english" : "o'zbek"}</Text>*!/*/}
            {/*                <Text>{userLanguage.language === 'jp' ? '日本語' : userLanguage.language === 'eng' ? 'english' : 'uzbek'}</Text>*/}
            {/*                <Ionicons*/}
            {/*                    name={'chevron-forward'}*/}
            {/*                    size={15}*/}
            {/*                    color={'#0386D0'}*/}
            {/*                />*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    }*/}
            {/*    contents={*/}
            {/*        <DropdownList />*/}
            {/*    }*/}
            {/*/>*/}
            
            <Pressable onPress={() => setShowModal(prevState => !prevState)}>
                <View style={styles.row}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name={'language-outline'}
                            size={24}
                            color={'#575757'}
                        />
                        <Text style={{ padding: 10 }}>Tilni o'zgartirish</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/*<Text>{userLanguage.language === 'jp' ? '日本語' : userLanguage.language === 'eng' ? 'english' : 'uzbek'}</Text>*/}
                        <Text>o'zbek</Text>
                        <Ionicons
                            name={'chevron-forward'}
                            size={15}
                            color={'#0386D0'}
                        />
                    </View>
                </View>
            </Pressable>
            {showModal && <ChangeLanguage />}
            
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name={'exit-outline'}
                        size={24}
                        color={'red'}
                    />
                    <Text onPress={() => {sessionContext.signOut()}} style={{ padding: 10, color: 'red' }}>Akkountdan chiqish</Text>
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