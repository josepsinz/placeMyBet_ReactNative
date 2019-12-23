import React from 'react'
import { View, StyleSheet } from 'react-native'
import TabBarItem from './TabBarItem'

const TabBar = ({ setType, type }) => (
    <View style={styles.container}>
        <TabBarItem type={type} title='Todos' setType={() => setType('Todos')} />
        <TabBarItem type={type} title='Favoritos' setType={() => setType('Favoritos')} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        backgroundColor: 'rgb(249, 255, 209)'

    }
})

export default TabBar