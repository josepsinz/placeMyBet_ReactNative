import React, { Component } from 'react';
import { View, Button, StyleSheet, TextInput, Image, Text, TouchableHighlight } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage'


let ii;
let iii;

class SignInScreen extends Component {
    // cabecera de la pantalla
    static navigationOptions = {
        title: 'LOGIN',
    };
    constructor() {
        super();
        this.state = {
            userNameInput: '',
            passInput: '',
        }
        this.inputChange = this.inputChange.bind(this);
        this._signInAsync = this._signInAsync.bind(this);
        this._signInAsync2 = this._signInAsync2.bind(this);
        this.nuevousuario = this.nuevousuario.bind(this);
    }

    // función para manejar el input de los campos de usuario y pass
    inputChange(inputValue, field) {
        const newState = this.state
        if (field === 'userName') {
            newState.userNameInput = inputValue;
        } else {
            newState.passInput = inputValue;
        }
        this.setState({ newState });
    }

    nuevousuario() {
        const { navigate } = this.props.navigation
        navigate('Nuevo');
    }

    render() {
        const { userNameInput, passInput} = this.state;
        return (
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    value={userNameInput}
                    placeholder="Identificador"
                    placeholderTextColor="#CACACA"
                    selectionColor="#666666"
                    onChangeText={(text) => this.inputChange(text, 'userName')} />
                <TextInput style={styles.input}
                    value={passInput}
                    placeholder="Password"
                    placeholderTextColor="#CACACA"
                    selectionColor="#666666"
                    secureTextEntry={true}
                    onChangeText={(text) => this.inputChange(text, 'pass')} />
                <Button title="Login!" onPress={this._signInAsync} />
                <Text>{"\n"}</Text>
                <Button title="NUEVO USUARIO" onPress={this.nuevousuario} />
                <FlashMessage position="top" />
                <Image
                    style={{ width: 400, height: 400 }}
                    source={{ uri: 'https://image.freepik.com/vector-gratis/celebraciones-futbolista-silueta-logo_39679-92.jpg' }} />
                <Text style={{ fontSize: 35, fontFamily: "Lucida Console", textAlign: "center" }}>PLACE MY BET!</Text>
               
            </View>
        );
    }

    _signInAsync() {
        let num = this.state.userNameInput;
        return fetch('http://192.168.1.15:45457/api/usuarios/' + num)
        //return fetch('http://192.168.1.140:45455/api/usuarios/' + num)
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => {
                if (data != null) {
                    ii = data.UsuarioId
                    iii = data.Password
                    let adm;
                    if(data.Administrador == true){
                        adm = "true";
                    } else if(data.Administrador == false){
                        adm = "false";
                    }
                    if (this.state.passInput !== iii || adm === "true") {
                        this.showNotification('Identificador o Password incorrectos', '¡Prueba de nuevo!', 'warning');
                    } else{
                        this._signInAsync2();
                    }
                    
                } else {
                    const newState = {
                        userNameInput: '',
                        passInput: ''
                    }
                    this.setState(newState);
                    this.showNotification('Identificador o Password incorrectos', '¡Prueba de nuevo!', 'warning');
                }
            })

            .catch((error) => {
                console.error(error);
            });
    }

    _signInAsync2 = async () => {
        if (this.state.passInput === iii) {
            try {
                await AsyncStorage.setItem('@userToken', this.state.userNameInput);
                this.props.navigation.navigate('App');
            } catch (error) {
                this.showNotification('Error with storage', error, 'danger');
            }

        } else {
            const newState = {
                userNameInput: '',
                passInput: ''
            }
            this.setState(newState);
        }


    }

    showNotification(message, description, type) {
        showMessage({
            message: message,
            description: description,
            type: type
        });
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginLeft: 20,
        marginRight: 20,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 }
    },
    input: {
        height: 60,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default SignInScreen;