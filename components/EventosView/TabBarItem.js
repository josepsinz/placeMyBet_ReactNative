import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

const TabBarItem = ({ border, title, selected, setType, type }) => (
    <TouchableHighlight
        underlayColor='#efefef'
        onPress={setType}
        style={[
            styles.item,
            selected ? styles.selected : null,
            border ? styles.border : null,
            type === title ? styles.selected : null]}>
        <Text style={styles.itemText}>
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
        borderLeftColor: '#dddddd'
    },
    itemText: {
        color: 'black',
        fontSize: 25,
        fontWeight: "bold"
    },
    selected: {
        backgroundColor: 'rgb(197, 201, 165)'
    },

})

export default TabBarItem