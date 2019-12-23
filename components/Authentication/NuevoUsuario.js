import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native'
import FlashMessage, { showMessage } from 'react-native-flash-message';

class NuevoUsuario extends Component {
    static navigationOptions = {
        title: 'Nuevo Usuario'
    };
    constructor() {
        super();
        this.state = {
            email: "",
            nombre: "",
            apellidos: "",
            edad: "",
            password: ""
        }
        this.retorna = this.retorna.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.inputChange1 = this.inputChange1.bind(this)
        this.inputChange2 = this.inputChange2.bind(this)
        this.inputChange3 = this.inputChange3.bind(this)
        this.inputChange4 = this.inputChange4.bind(this)
        //this.showNotification = this.showNotification.bind(this)
    }

    retorna() {
        const { navigate } = this.props.navigation
        navigate('Main');
    }
    inputChange(inputValue) {
        const newState = this.state
        newState.email = inputValue
        this.setState({ newState });
    }
    inputChange1(inputValue) {
        const newState = this.state
        newState.nombre = inputValue
        this.setState({ newState });
    }
    inputChange2(inputValue) {
        const newState = this.state
        newState.apellidos = inputValue
        this.setState({ newState });
    }
    inputChange3(inputValue) {
        const newState = this.state
        newState.edad = inputValue
        this.setState({ newState });
    }
    inputChange4(inputValue) {
        const newState = this.state
        newState.password = inputValue
        this.setState({ newState });
    }

    registra(text, text1, text2, text3, text4) {
        text = this.state.email
        text1 = this.state.nombre
        text2 = this.state.apellidos
        text3 = this.state.edad
        text4 = this.state.password
        fetch('http://192.168.1.15:45455/api/usuarios', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Email": text,
                "Nombre": text1,
                "Apellidos": text2,
                "Edad": text3,
                "Password": text4,
            }),
        });
        this.showNotification('Usuario nuevo creado', '¡Enhorabuena!', 'success');
    }

    showNotification(message, description, type) {
        showMessage({
            message: message,
            description: description,
            type: type
        });
    }
    render() {
        const { email, nombre, apellidos, edad, password } = this.state

        return (
            <View style={styles.MainContainer}>
                <Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>EMAIL:</Text>
                <TextInput style={styles.inputContainer}
                    value={{ email }}
                    placeholder="correo"
                    placeholderTextColor="#CACACA"
                    onChangeText={(email) => this.inputChange(email)}
                ></TextInput>
                <Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>NOMBRE:</Text>
                <TextInput style={styles.inputContainer}
                    value={nombre}
                    placeholder="nombre"
                    placeholderTextColor="#CACACA"
                    selectionColor="#666666"
                    onChangeText={(nombre) => this.inputChange1(nombre)}
                ></TextInput>
                <Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>APELLIDOS:</Text>
                <TextInput style={styles.inputContainer}
                    value={{ apellidos }}
                    placeholder="apellidos"
                    placeholderTextColor="#CACACA"
                    onChangeText={(apellidos) => this.inputChange2(apellidos)}
                ></TextInput>
                <Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>EDAD:</Text>
                <TextInput style={styles.inputContainer}
                    value={edad}
                    placeholder="edad"
                    placeholderTextColor="#CACACA"
                    selectionColor="#666666"
                    onChangeText={(edad) => this.inputChange3(edad)}
                ></TextInput>
                <Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>PASSWORD:</Text>
                <TextInput style={styles.inputContainer}
                    value={password}
                    placeholder="password"
                    placeholderTextColor="#CACACA"
                    selectionColor="#666666"
                    onChangeText={(password) => this.inputChange4(password)}
                ></TextInput>
                <TouchableHighlight style={styles.button} underlayColor="gold" onPress={(text, text1, text2, text3, text4) => this.registra(text, text1, text2, text3, text4)}>
                    <Text style={styles.text}>REGISTRA</Text>
                </TouchableHighlight>
                <FlashMessage position="top" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

    }


});

export default NuevoUsuario