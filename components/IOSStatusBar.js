import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const IOSStatusBar = ({backgroundColor, ...props}) => (
    <View style={{ height: STATUSBAR_HEIGHT, backgroundColor }}>
        <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
    </View>
);

export default IOSStatusBar;
