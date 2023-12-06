import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const LanguageSelectComponent = () => {
    const [language, setLanguage] = React.useState('en');

    const handleLanguageChange = (language) => {
        setLanguage(language);
    };

    const renderLanguageButton = (language, image) => {
        return (
            <View style={styles.languageButtonContainer}>
                <Image source={image} style={styles.languageButtonImage} />
                <Text style={styles.languageButtonText}>{language}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select your language:</Text>
            <View style={styles.languageButtonsContainer}>
                {renderLanguageButton('Japanese', require('/assets/jp_flag.png'))}
                {renderLanguageButton('Uzbek', require('/assets/uz_flag.png'))}
                {renderLanguageButton('English', require('/assets/uk_flag.png'))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    languageButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    languageButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageButtonImage: {
        width: 50,
        height: 50,
    },
    languageButtonText: {
        fontSize: 16,
    },
});

export default LanguageSelectComponent;