import React from 'react'
import { View, StyleSheet } from 'react-native'
import SortBarItem from './SortBarItem'

const SortBar = ({ sort }) => (
    <View style={styles.container}>
        <SortBarItem title="Fecha Asc" sort={() => sort(true)} />
        <SortBarItem title="Fecha Desc" sort={() => sort(false)} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        flexDirection: 'row',
        borderWidth: 1,
        borderTopColor: '#dddddd',
        backgroundColor: "#C4A6A0"
    }
})

export default SortBar