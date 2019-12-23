import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Heading = () => (
    <View style={styles.header}>
        <Text style={styles.headerText}>
            PlaceMyBet
        </Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        marginTop: 0
    },
    headerText: {
        textAlign: 'center',
        fontSize: 52,
        color: 'green',
        fontWeight: 'bold'
    }
})

export default Heading;