import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native'
import MercadoList from './MercadoList';

class EventoDetails extends Component {
    static navigationOptions = {
        title: 'Detalles'
    };
    constructor() {
        super();
        this.state = {
            mercados: [],
            isLoading: true,
            itemId: 1,
            user: "",
            partido: "",
            fecha: "",
        }
        this.navegaApuestas = this.navegaApuestas.bind(this)
        this.verDatosPartidos = this.verDatosPartidos.bind(this)
    }

    navegaApuestas(mercadoIndex) {
        const { navigate } = this.props.navigation
        let indice = mercadoIndex
        navigate('Apuesta', { merId: JSON.stringify(indice), usuarioid: this.state.user });
    }

    verDatosPartidos() {
        const { navigation } = this.props;
        let num = navigation.getParam("itemId", null)
        num++
        return fetch('http://192.168.1.15:45455/api/eventos/' + num)
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => {
                let dia = data.Fecha.substr(8, 2);
                let mes = data.Fecha.substr(5, 2);
                let anyo = data.Fecha.substr(0, 4);
                let hora = data.Fecha.substr(11, 5);
                let lafecha = dia + "-" + mes + "-" + anyo + " " + hora + "h";
                this.setState({
                    partido: data.Local + " - " + data.Visitante,
                    fecha: lafecha

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.verDatosPartidos()
        const { navigation } = this.props;
        let num = navigation.getParam("itemId", null)
        const newState = this.state;
        newState.user = navigation.getParam("user", null)
        this.setState({ newState })
        num++
        return fetch('http://192.168.1.15:45455/api/mercados')
            .then((response) => response.json())
            .then((responseJson) => {
                const allMercados = [];
                let mercado;
                for (let item of responseJson) {
                    if (item.EventoId == num) {
                        mercado = {
                            tipoMercado: item.TipoMercado,
                            cuotaO: item.CuotaOver.toFixed(2),
                            cuotaU: item.CuotaUnder.toFixed(2),
                            mercadoIndex: item.MercadoId
                        }
                        allMercados.push(mercado);
                    }
                }
                const mercados = [...allMercados]
                this.setState({ mercados });
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { mercados } = this.state;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 100 }}>
                    <Text>CARGANDO</Text>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            )
        } else {
            if (mercados.length == 0) {
                return (<View style={{ flex: 1, padding: 100 }}>
                    <Text style={{ fontSize: 30, height: 90 }}>ups!<Image
                        style={{ width: 50, height: 50 }}
                        source={{ uri: "https://images.emojiterra.com/twitter/v12/512px/2639.png" }} /></Text>

                    <Text style={{ fontSize: 30 }}>NO HAY MERCADOS ASOCIADOS</Text>
                </View>)
            } else
                return (
                    <View style={styles.container}>
                        <View style={[styles.eventoContainer2, styles.centrado]}>
                            <Text style={styles.infoText}>{this.state.partido}{'\n'}{this.state.fecha}</Text>
                        </View>
                        <Text style={styles.mercadoText}>MERCADOS{'\n'} over/under</Text>
                        <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                            <View>
                                <View style={[styles.eventoContainer, styles.centrado]}>
                                    <MercadoList navegaApuestas={this.navegaApuestas} mercados={mercados}></MercadoList>
                                </View>
                                </View>
                        </ScrollView>
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
    },
    eventoContainer2: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#8FBC8F35",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'black',
        paddingLeft: 1,
        paddingTop: 7,
        paddingBottom: 1,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        flexDirection: 'row',
    },
    centrado: {
        justifyContent: "center"
    },
    eventoContainer: {
        marginTop: 0,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: 'grey',
        paddingLeft: 5,
        paddingTop: 0,
        paddingBottom: 5,

    },
    infoText: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold"
    },
    mercadoText: {
        fontSize: 25,
        textAlign: "center",
        color: 'rgba(175, 47, 47, 1)',
        fontWeight: "bold",
        paddingTop: 15
    }

})

export default EventoDetails