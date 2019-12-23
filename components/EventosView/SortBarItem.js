import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

const SortBarItem = ({ title, sort }) => (
    <TouchableHighlight
        underlayColor='gold'
        onPress={sort}
        style={[
            styles.item,
            styles.border]}>
        <Text style={[
            styles.itemText,
            styles.bold]}>
            {title}
        </Text>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    border: {
        borderLeftWidth: 1,
        borderColor: '#dddddd'
    },
    itemText: {
        color: '#777777',
        fontSize: 25
    },
    selected: {
        backgroundColor: '#ffffff'
    },
    bold: {
        fontWeight: 'bold',
        color: 'black'
    }
})

export default SortBarItem