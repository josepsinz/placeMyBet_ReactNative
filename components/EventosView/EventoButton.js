import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

const EventoButton = ({ onPress, complete, name }) => (
    <TouchableHighlight
        onPress={onPress}
        underlayColor='#efefef'
        style={styles.button}>
        <Text
            style={[styles.text, complete ? styles.complete : null]}>
            {name}
        </Text>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end',
        padding: 7,
        borderColor: '#ededed',
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 5
    },
    text: {
        color: '#666666'
    },
    complete: {
        color: 'red',
        fontWeight: 'bold'
    },
})

export default EventoButton