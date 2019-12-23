import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ItemButton from './ItemButton'

const Item = ({item, increaseItem, decreaseItem}) => (
    <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
            {item.title}: {item.number}
        </Text>
        <View style={styles.buttons}>
            <ItemButton
            name='+'
            onPress={() => increaseItem(item.itemIndex)}/>
            <ItemButton
            name='-'            
            onPress={() => decreaseItem(item.itemIndex)}/>            
        </View>
    </View>
)

const styles = StyleSheet.create({
    itemContainer: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#ededed',
        paddingLeft: 14, 
        paddingTop: 7,
        paddingBottom: 7,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2},
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        fontSize: 17
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default Item