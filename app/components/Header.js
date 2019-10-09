import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = () => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>MY TODO APP</Text>
    </View>
);

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 70,
        marginBottom: 40,
        borderWidth: 3
    },
    headerText: {
        fontSize: 26,
        fontWeight: '600',
        color: '#3f4e66',
    }
})

export default Header;