import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import Heading from './Heading';
import Input from './Input'
import EventoList from './EventoList'
import TabBar from './TabBar'
import SortBar from './SortBar'
import AsyncStorage from '@react-native-community/async-storage'
import LogOutButton from '../Authentication/LogOutButton';

class EventosMainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Eventos',
      headerRight: () => (
        <LogOutButton navigation={navigation} />
      )
    }

  };
  constructor() {
    super();
    this.state = {
      inputValue: '',
      eventos: [],
      type: 'Todos',
      isLoading: true,
      usuario: "",
    }

    this.inputChange = this.inputChange.bind(this)
    this.toggleComplete = this.toggleComplete.bind(this)
    this.setType = this.setType.bind(this)
    this.sort = this.sort.bind(this)
    this.search = this.search.bind(this)
    this.loadData = this.loadData.bind(this)
    this.viewEventoDetails = this.viewEventoDetails.bind(this)
    this._retrieveData = this._retrieveData.bind(this)
  }

  inputChange(inputValue) {
    if (inputValue === "") {
      const newState = this.state
      newState.inputValue = inputValue
      this.setState({ newState });
      this.componentDidMount()
    } else {
      const newState = this.state
      newState.inputValue = inputValue
      this.setState({ newState });
      this.search()
    }
  }

  toggleComplete(eventoIndex) {
    let eventos = this.state.eventos
    eventos.forEach((evento) => {
      if (evento.eventoIndex === eventoIndex) {
        evento.complete = !evento.complete
      }
    })
    this.setState({ eventos })
  }

  setType(type) {
    this.setState({ type })
  }

  sort(ascdesc) {
    let eventos = this.state.eventos
    if (ascdesc) {
      eventos = eventos.sort((a, b) => parseInt(a.fecha.substr(6, 4) + a.fecha.substr(3, 2) + a.fecha.substr(0, 2) + a.fecha.substr(11, 2) + a.fecha.substr(14, 2)) - parseInt(b.fecha.substr(6, 4) + b.fecha.substr(3, 2) + b.fecha.substr(0, 2) + b.fecha.substr(11, 2) + b.fecha.substr(14, 2)))
    } else {
      eventos = eventos.sort((a, b) => parseInt(b.fecha.substr(6, 4) + b.fecha.substr(3, 2) + b.fecha.substr(0, 2) + b.fecha.substr(11, 2) + b.fecha.substr(14, 2)) - parseInt(a.fecha.substr(6, 4) + a.fecha.substr(3, 2) + a.fecha.substr(0, 2) + a.fecha.substr(11, 2) + a.fecha.substr(14, 2)))
    }
    this.setState(eventos);
  }

  search() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return
    }
    let eventos = this.state.eventos
    let cadena = this.state.inputValue
    eventos = eventos.filter(d => d.title.toLowerCase().includes(cadena.toLowerCase()));
    this.setState({ eventos })
  }

  loadData() {
    this.componentDidMount()
    this.setState({ type: "Todos", inputValue: "" })
  }

  viewEventoDetails(eventoIndex) {
    const { navigate } = this.props.navigation
    let indice = eventoIndex
    navigate('Detalles', { itemId: JSON.stringify(indice), user: this.state.usuario });
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        // We have data!!
        this.setState({ usuario: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidMount() {
    this._retrieveData();
    return fetch('http://192.168.1.15:45455/api/eventos')
    //return fetch('http://192.168.1.140:45455/api/eventos')
      .then((response) => response.json())
      .then((responseJson) => {
        const allEventos = [];
        for (const item of responseJson) {
          let dia = item.Fecha.substr(8, 2);
          let mes = item.Fecha.substr(5, 2);
          let anyo = item.Fecha.substr(0, 4);
          let hora = item.Fecha.substr(11, 5);
          let lafecha = dia + "-" + mes + "-" + anyo + " " + hora + "h";
          const evento = {
            title: item.Local + " - " + item.Visitante,
            fecha: lafecha,
            eventoIndex: item.EventoId - 1,
            id: item.EventoId,
            complete: false
          }
          allEventos.push(evento);
        }
        const eventos = [...allEventos]
        this.setState({ eventos });
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { inputValue, eventos, type, usuario } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 100 }}>
          <Text style={{ fontSize: 30 }}>CARGANDO</Text>
          <ActivityIndicator size="large" color="red" />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
            <Heading />
            <SortBar sort={this.sort}></SortBar>
            <Input inputValue={inputValue} inputChange={(text) => this.inputChange(text)} />
            <TouchableHighlight style={styles.button} onPress={this.loadData} underlayColor='gold'><Text style={styles.text}>BORRAR BÚSQUEDA (reload)</Text></TouchableHighlight>
            <EventoList eventos={eventos} toggleComplete={this.toggleComplete} type={type} viewEventoDetails={this.viewEventoDetails} />
          </ScrollView>
          <TabBar type={type} setType={this.setType} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8FBC8F35",
  },
  content: {
    flex: 1,
    paddingTop: 2
  },
  button: {
    height: 50,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#DEEFE4',
    marginRight: 5,
    marginTop: 5,
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

export default EventosMainScreen;

/*
import Button from './Button'
<Button search={this.search} />
*/