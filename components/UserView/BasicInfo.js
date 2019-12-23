import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Info from './Info';

class BasicInfo extends Component{
    render(){
        let email = 'Email';
        let nombre = 'Nombre';
        let apellidos = 'Apellidos';
        let edad = 'Edad'
        return(
            <View>
                <Info label={email} value={this.props.email}/>
                <Info label={nombre} value={this.props.nombre}/>
                <Info label={apellidos} value={this.props.apellidos}/>
                <Info label={edad} value={this.props.edad}/>
            </View>
        )
    }
}

export default BasicInfo;