import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import EventoButton from './EventoButton'

const Evento = ({ evento, toggleComplete, viewEventoDetails }) => (

    <View style={styles.eventoContainer}>
        <Text style={styles.eventoName}>
            {evento.title}
            <Text style={styles.eventoFecha}>
                {'\n'}{evento.fecha}
            </Text>
        </Text >
        <View style={styles.buttons}>
            <EventoButton
                name='Favoritos'
                complete={evento.complete}
                onPress={() => toggleComplete(evento.eventoIndex)} />

            <EventoButton
                name='Detalles'
                onPress={() => viewEventoDetails(evento.eventoIndex)} />
        </View>

    </View>
)

const styles = StyleSheet.create({
    eventoContainer: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#ededed',
        paddingLeft: 14,
        paddingTop: 10,
        paddingBottom: 7,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        flexDirection: 'row',
        alignItems: 'center'
    },
    eventoName: {
        fontSize: 18
    },
    eventoFecha: {
        fontSize: 12
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default Evento