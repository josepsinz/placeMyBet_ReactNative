import React from 'react'
import { View } from 'react-native'
import Item from './Item'

const ItemList = ({ items, increaseItem, decreaseItem }) => {    
    items = items.map((item) => {
        return(
            <Item
            key={item.itemIndex}            
            item={item}
            increaseItem={increaseItem}
            decreaseItem={decreaseItem}/>
        )
    })
    return(
        <View>
            {items}
        </View>
    )
}

export default ItemList