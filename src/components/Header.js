import React from 'react'
import {View, StyleSheet, Text } from 'react-native'

const Header = ({label}) => {
    console.log(label);

    return (<View style={styles.container}>
        <Text style={styles.labelStyle}>{label}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    width: 500,
    height: 90,
    backgroundColor: '#a29bfe',
    justifyContent: 'center',
    alignItems: 'center',
    },
    labelStyle: {
        fontSize: 24,
        fontWeight: '700',
    }
})
export default Header;