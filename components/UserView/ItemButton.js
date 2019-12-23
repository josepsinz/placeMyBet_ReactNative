import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

const ItemButton = ({ onPress, name }) => (
    <TouchableHighlight
    onPress={onPress}
    underlayColor='#efefef'
    style={styles.button}>
        <Text style={[styles.text,         
        name === '+' ? styles.plus : styles.minus]}>
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
    plus: {
        color: 'green',
        fontWeight: 'bold'
    },
    minus: {
        color: 'red',
        fontWeight: 'bold'
    }
})

export default ItemButton