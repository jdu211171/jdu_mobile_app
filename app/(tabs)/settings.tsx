import {View} from "react-native";
import * as React from "react";
import ContactInfo from "../../components/ContactInfo";

export default function Settings() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ContactInfo />
        </View>
    );
}