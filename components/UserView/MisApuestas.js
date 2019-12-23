import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'

class MisApuestas extends Component {
    static navigationOptions = {
        title: 'Mis Apuestas'
    };
    constructor() {
        super();
        this.state = {
            apuestas: [],
            aver: "1"
        }
        this.getEventos = this.getEventos.bind(this);
    }

    getEventos(param){
      fetch('http://192.168.1.15:45455/api/mercados/'+param)
      .then(response => { return response.json(); })
      .then((responseJson) => {
        let retorno = responseJson.EventoId
        this.setState({aver:retorno})
        })
        .catch((error) => {
          console.error(error);
        });
    }

    componentDidMount() {
      const { navigation } = this.props;
      let usuario = navigation.getParam("user", null)

      fetch('http://192.168.1.15:45455/api/apuestas?idu='+usuario)
      .then(response => { return response.json(); })
      .then((responseJson) => {
          const allApuestas = [];
          let tipo = "under"
          for (const item of responseJson) {
            let param = item.MercadoId
            this.getEventos(param);
            let iii = this.state.aver
            
              if(item.isOver == true){
                  tipo = "over";
              } 
            const apuesta = {
              apuestaid: item.ApuestaId,
              eventoid: item.EventoId,
              tipomercado: item.TipoMercado,
              isover: tipo,
              cuota: item.Cuota.toFixed(2),
              apostado: item.Apostado.toFixed(2),
              ganancia: (item.Cuota*item.Apostado).toFixed(2)
            }
            allApuestas.push(apuesta);
          }
          const apuestas = [...allApuestas]
          this.setState({ apuestas });
          this.setState({isLoading: false});
        })
        .catch((error) => {
          console.error(error);
        });
  }

    showArrayItem = (item) => {
 
        Alert.alert(item);
     
      }
     
      render() {
     
        return (
     
          <View style={styles.MainContainer}>
     
            <ScrollView>
     
              {
                this.state.apuestas.map((item, key) => (
     
                  <TouchableOpacity key={key} onPress={this.showArrayItem.bind(this, item.name)}>
     
                    <Text style={styles.TextStyle} > Apuesta_ID = {item.apuestaid} </Text>

                    <Text style={styles.TextStyle} > Evento_ID = {item.eventoid} </Text>

                    <Text style={styles.TextStyle} > Tipo Mercado = {item.tipomercado} </Text>

                    <Text style={styles.TextStyle} > Over/Under = {item.isover} </Text>
     
                    <Text  style={styles.TextStyle} > Cuota = {item.cuota} </Text>
     
                    <Text  style={styles.TextStyle} > Apostado = {item.apostado}€{'\n'} </Text>

                    <Text  style={styles.TextStyle} > Premio Potencial = {item.ganancia}€ </Text>
     
                    <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
     
                  </TouchableOpacity>
     
                ))
                
              }
     
            </ScrollView>
          </View>
        );
      }
}

const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
      margin: 2,
      paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
   
    },
   
    TextStyle: {
      fontSize: 20,
      color: '#000',
      textAlign: 'left'
    }
   
  });

export default MisApuestas


/*
    componentDidMount() {
        const { navigation } = this.props;
        let usuario = navigation.getParam("user", null)

        fetch('http://192.168.1.140:45455/api/apuestas?idu='+usuario)
        .then(response => { return response.json(); })
        .then((responseJson) => {
            const allApuestas = [];
            let tipo = "under"
            for (const item of responseJson) {
                if(item.isOver == true){
                    tipo = "over";
                } 
              const apuesta = {
                apuestaid: item.ApuestaId,
                eventoid: item.EventoId, 
                tipomercado: item.TipoMercado,
                isover: tipo,
                cuota: item.Cuota.toFixed(2),
                apostado: item.Apostado.toFixed(2),
                ganancia: (item.Cuota*item.Apostado).toFixed(2)
              }
              allApuestas.push(apuesta);
            }
            const apuestas = [...allApuestas]
            this.setState({ apuestas });
            this.setState({isLoading: false});
          })
          .catch((error) => {
            console.error(error);
          });
    }
*/