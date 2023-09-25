import React from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const imagens = [
  { id: '1', source: require('../assets/imagens/imagens_postagens/1.jpg') },
  { id: '2', source: require('../assets/imagens/imagens_postagens/2.jpg') },
  { id: '3', source: require('../assets/imagens/imagens_postagens/3.jpg') },
  { id: '4', source: require('../assets/imagens/imagens_postagens/4.jpg') },
  { id: '5', source: require('../assets/imagens/imagens_postagens/5.jpg') },
  { id: '6', source: require('../assets/imagens/imagens_postagens/6.jpg') },
  { id: '7', source: require('../assets/imagens/imagens_postagens/7.jpg') },
  { id: '8', source: require('../assets/imagens/imagens_postagens/8.jpg') },
  // Adicione mais imagens conforme necessário
];

function renderizarItem({ item }) {
  return (
    <Image 
    source={item.source} 
    style={estilos.imagem}
    resizeMode="contain" />
  );
}

function GaleriaDeImagens() {
  return (
    <View style={estilos.container}>
      <FlatList
        data={imagens}
        renderItem={renderizarItem}
        keyExtractor={item => item.id}
        numColumns={2} // Define 2 imagens por linha
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imagem: {
    width: Dimensions.get('window').width / 2 - 15, // Largura igual a metade da largura da tela com espaço de margem
    height: 150, // Altura fixa
    margin: 5, // Margem entre as imagens
  },
});

export default GaleriaDeImagens;
