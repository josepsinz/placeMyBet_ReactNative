import React from 'react'
import { View } from 'react-native'
import Mercado from './Mercado'

const MercadoList = ({ mercados, navegaApuestas }) => {
    const getVisibleMercados = (mercados) => {
        return mercados
    }
    mercados = getVisibleMercados(mercados)
    mercados = mercados.map((mercado) => {
        return (
            <Mercado
                key={mercado.mercadoIndex}
                mercado={mercado}
                navegaApuestas={navegaApuestas}
            />
        )
    })
    return (
        <View>
            {mercados}
        </View>
    )
}

export default MercadoList