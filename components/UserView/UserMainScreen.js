import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import LogOutButton from '../Authentication/LogOutButton';
import AsyncStorage from '@react-native-community/async-storage'

class UserMainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Usuario',
      headerRight: () => (
        <LogOutButton navigation={navigation} />
      )
    }
  };

  constructor() {
    super();
    this.state = {
      email: "",
      nombre: "",
      apellidos: "",
      edad: "",
      fondos: "",
      usuarioid: "",
    };
    this._retrieveData = this._retrieveData.bind(this)
    this.misapuestas = this.misapuestas.bind(this)
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        // We have data!!
        this.setState({ usuarioid: value });
        return fetch('http://192.168.1.15:45455/api/usuarios/' + value)
          .then(response => { return response.json(); })
          .then(responseData => { console.log(responseData); return responseData; })
          .then(data => {
            this.setState({
              email: data.Email,
              nombre: data.Nombre,
              apellidos: data.Apellidos,
              edad: data.Edad,
              fondos: data.Fondos,
              identificador: data.UsuarioId
            });
          })
          .catch((error) => {
            console.error(error);
          });

      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount() {
    this._retrieveData();
  }

  misapuestas() {
    const { navigate } = this.props.navigation
    navigate('MyApuestas', { user: this.state.usuarioid });
  }

  render() {
    return (
      <View>
        <View style={styles.eventoContainer}>
          <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
            <Text style={styles.infoText}>
              Usuario_Id : {this.state.usuarioid}{'\n'}
              Email : {this.state.email}{"\n"}
              Nombre : {this.state.nombre}{"\n"}
              Apellidos : {this.state.apellidos}{"\n"}
              Edad : {this.state.edad}{"\n"}
              Fondos disponible : {this.state.fondos}€{'\n'}
            </Text>
          </ScrollView>
        </View>
        <TouchableHighlight style={styles.button} underlayColor="gold" onPress={this.misapuestas}>
          <Text style={styles.text}>
            MIS APUESTAS
            </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    paddingTop: 6

  },
  eventoContainer: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderWidth: 5,
    borderColor: 'black',
    paddingLeft: 14,
    paddingTop: 7,
    paddingBottom: 7,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    lineHeight: 60
  },
  button: {
    height: 50,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#DEEFE4',
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
    fontSize: 20
  }
})

export default UserMainScreen;