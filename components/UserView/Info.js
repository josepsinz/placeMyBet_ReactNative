import React, {Component} from 'react';
import {Text,View} from 'react-native';

const Info = ({label, value}) => (
    <View>
        <Text>{label} : {value}</Text>
    </View>
)

export default Info;