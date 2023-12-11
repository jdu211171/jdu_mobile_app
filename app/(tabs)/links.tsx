import * as React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import SNSLink from "../../components/SNSLink";
import {useLanguageContext} from "../../contexts/LanguageContext";

export default function Links() {
  const { translations } = useLanguageContext();
  return (
    <ScrollView>
      <View style={styles.container}>
        <SNSLink image={require('../../assets/google.png')} link={'https://jdu.uz/'} text={translations.web_sahifasi} />
        <SNSLink image={require('../../assets/youtube.png')} link={'https://www.youtube.com/@JapanDigitalUniversity'} text={translations.youtube_sahifasi} />
        <SNSLink image={require('../../assets/facebook.png')} link={'https://www.facebook.com/jdu.uz/'} text={translations.facebook_sahifasi} />
        <SNSLink image={require('../../assets/instagram.png')} link={'https://www.instagram.com/jdu.uz/'} text={translations.instagram_sahifasi} />
        <SNSLink image={require('../../assets/telegram.png')} link={'https://t.me/jduniversity_uz'} text={translations.telegram_sahifasi} />
        <SNSLink image={require('../../assets/x.png')} link={'https://twitter.com/jdu_edutain'} text={translations.twitter_sahifasi} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 30,
    rowGap: 30
  },
  link: {
    textDecorationLine: 'underline',
    color: '#1560BD',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});