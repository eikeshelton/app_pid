import React from 'react';
import { Image, StyleSheet,View,Dimensions } from 'react-native';
import Logo from '../../assets/imagens/logo.png';
export default function TopImage({ }) {
    return (<>
        <View style = {estilo.container}>
            <Image source={Logo} style={estilo.Logo}
            resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
            />
        </View>
    </>
    );
}
const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Logo: {
        width: Dimensions.get('window').width * 1, // Ajuste a largura conforme necessário
        height: Dimensions.get('window').height * 0.25, // Ajuste a altura conforme necessário
    },
});
