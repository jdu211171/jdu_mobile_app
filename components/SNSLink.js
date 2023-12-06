import React from 'react';
import {View, Text, Image, StyleSheet, Pressable, Platform, Linking} from 'react-native';
import Colors from "../constants/Colors";
import {ExternalLink} from "./ExternalLink";

const SNSLink = ({ image, link, text }) => {
  return (
      <Pressable onPress={() => Linking.openURL(link)}  style={[styles.container, styles.shadow]}>
        <Image
          source={image}
          style={[styles.padding, styles.image]}
        />
        <ExternalLink
          style={styles.helpLink}
          href={link}>
          <Text style={[styles.helpLinkText, styles.link]} lightColor={Colors.light.tint}>
            {text}
          </Text>
        </ExternalLink>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '40%',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 4,
  },
  padding: {
    padding: 20,
    marginTop: 10
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.45)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.45,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      }
    })
  },
  image: {
    width: 90,
    height: 90,
  },
  helpLink: {
    paddingVertical: 15,
  },
  text: {
    color: 'blue',
    fontSize: 20,
    marginTop: 10,
  },
});

export default SNSLink;
