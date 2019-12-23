import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

const Mercado = ({ mercado, navegaApuestas }) => (
    <View style={styles.eventoContainer}>
        <Text style={{ fontSize: 18 }}>
            Id Mercado: {mercado.mercadoIndex}{'\n'}
            Tipo Mercado: {mercado.tipoMercado}{'\n'}
            Cuota Over: {mercado.cuotaO}{'\n'}
            Cuota Under: {mercado.cuotaU}{'\n'}
        </Text>
        <TouchableHighlight style={styles.buttons} onPress={() => navegaApuestas(mercado.mercadoIndex)} underlayColor="blue">
            <Text style={{ fontWeight: 'bold' }}>¡¡APUESTA!!</Text>
        </TouchableHighlight>
    </View>

)
// Mercado Id: {mercado.mercadoIndex}
const styles = StyleSheet.create({
    eventoContainer: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 3,
        borderColor: 'green',
        padding: 5,
        paddingBottom: 7,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        flexDirection: 'row',
        alignItems: 'center'
    },
    eventoName: {
        fontSize: 17
    },
    eventoFecha: {
        fontSize: 12
    },
    buttons: {
        marginLeft: 90,
        justifyContent: 'flex-end',
        padding: 18,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 4,
        marginRight: 5,
        backgroundColor: '#93FC79'
    },
})

export default Mercado