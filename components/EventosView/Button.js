import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

const Button = ({search}) => (
    <View>
        <TouchableHighlight
            underlayColor='gold'
            style={styles.button}
            onPress={search}>
            <Text style={styles.text}>
                BUSCA
            </Text>
        </TouchableHighlight>
    </View>
)

const styles = StyleSheet.create({
    button: {
        height: 50,
        paddingLeft: 2,
        paddingRight: 2,
        backgroundColor: '#DEEFE4',
        marginRight: 5,
        marginTop: 5,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:
    {
        fontWeight: "bold",
        fontSize: 20
    }
})

export default Button