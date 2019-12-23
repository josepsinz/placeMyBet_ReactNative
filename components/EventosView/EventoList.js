import React from 'react'
import { View } from 'react-native'
import Evento from './Evento'

const EventoList = ({ eventos, toggleComplete, type, viewEventoDetails }) => {
    const getVisibleEventos = (eventos, type) => {
        switch (type) {
            case 'Todos':
                return eventos
            case 'Favoritos':
                return eventos.filter((t) => t.complete)
        }
    }
    eventos = getVisibleEventos(eventos, type)
    eventos = eventos.map((evento) => {
        return (
            <Evento
                key={evento.eventoIndex}
                evento={evento}
                toggleComplete={toggleComplete}
                viewEventoDetails={viewEventoDetails} />
        )
    })
    return (
        <View>
            {eventos}
        </View>
    )
}

export default EventoList