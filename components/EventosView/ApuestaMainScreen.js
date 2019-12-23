import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image } from 'react-native'
import FlashMessage, { showMessage } from 'react-native-flash-message';

class ApuestaMainScreen extends Component {
    static navigationOptions = {
        title: 'Apuesta'
    };
    constructor() {
        super();
        this.state = {
            merId: 5,
            text: 0,
            truefalse: ""
        }
        this.apuesta = this.apuesta.bind(this)
    }

    inputChange(inputValue) {
        if (/^\d+$/.test(inputValue)) {
            const newState = this.state
            newState.text = inputValue
            this.setState({ newState });
        }

    }

    inputChange2(inputValue) {
        const newState = this.state
        newState.truefalse = inputValue
        this.setState({ newState });
    }

    apuesta(num, tipo) {
        const { navigation } = this.props;
        let merId = navigation.getParam("merId", null)
        let usuarioApuesta = navigation.getParam("usuarioid", null)
        num = this.state.text;
        tipo = this.state.truefalse;
        if ((tipo != "over" && tipo != "under") || num <= 0) {
            this.showNotification('No puede apostar 0€ o el tipo over/under es incorrecto', '¡Pruebe de nuevo!', 'warning')
        }
        else {
            if (tipo == "over") {
                tipo = true;
            } else if (tipo == "under") {
                tipo = false;
            }

            fetch('http://192.168.1.15:45455/api/apuestas', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "isOver": tipo,
                    "Apostado": num,
                    "UsuarioId": usuarioApuesta,
                    "MercadoId": merId,
                }),
            });
            this.setState({ num: "" });
            this.showNotification('Apuesta confirmada', '¡Suerte!', 'success')
        }
    }

    showNotification(message, description, type) {
        showMessage({
            message: message,
            description: description,
            type: type
        });
    }

    render() {
        const { text, truefalse } = this.state;
        if (text < 0) {
            return (<View><Text>jkjkjkjkjkjkjkj</Text></View>)
        } else {
            return (

                <View style={{ backgroundColor: "#8FBC8F35", height: 1000 }}>
                    <Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>CANTIDAD A APOSTAR (€)</Text>
                    <TextInput style={styles.inputContainer}
                        value={`${text}`}
                        maxLength={4}
                        placeholder="PASTA"
                        placeholderTextColor="#CACACA"
                        keyboardType="numeric"
                        returnKeyType="go"
                        onChangeText={(text) => this.inputChange(text)}
                    ></TextInput>

                    <Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>ELIGE: over o under</Text>
                    <TextInput style={styles.inputContainer}
                        value={truefalse}
                        placeholder="escribe: over o under"
                        placeholderTextColor="#CACACA"
                        selectionColor="#666666"
                        onChangeText={(text) => this.inputChange2(text)}

                    ></TextInput>

                    <TouchableHighlight style={styles.button} underlayColor="gold" onPress={(text, text2) => this.apuesta(text, text2)}>
                        <Text style={styles.text}>CONFIRMAR APUESTA </Text>
                    </TouchableHighlight>
                    <Image
                        style={{ width: 100, height: 100, marginLeft: 50 }}
                        source={{ uri: 'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c4c4.png' }} />
                    <FlashMessage position="top" />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    eventoContainer: {
        marginTop: 50,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        backgroundColor: '#ffffff',
        borderWidth: 3,
        borderColor: 'green',
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
    },
    infoText: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold"
    },
    inputContainer: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        borderWidth: 2,
        borderColor: "#228B22"
    },
    input: {
        height: 40,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        height: 60,
        paddingLeft: 2,
        paddingRight: 2,
        backgroundColor: '#93FC79',
        marginRight: 5,
        marginTop: 30,
        marginLeft: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,

    },

})

export default ApuestaMainScreen
