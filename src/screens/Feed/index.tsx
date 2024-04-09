
import React from 'react';
import { FlatList} from 'react-native';
import { Container, Imagem } from './style';

const imagens = [
    { id: '1', source: require('../../assets/imagens/imagens_postagens/1.jpg') },
    { id: '3', source: require('../../assets/imagens/imagens_postagens/3.jpg') },
    { id: '2', source: require('../../assets/imagens/imagens_postagens/2.jpg') },
    { id: '4', source: require('../../assets/imagens/imagens_postagens/4.jpg') },
    { id: '5', source: require('../../assets/imagens/imagens_postagens/5.jpg') },
    { id: '6', source: require('../../assets/imagens/imagens_postagens/6.jpg') },
    { id: '7', source: require('../../assets/imagens/imagens_postagens/7.jpg') },
    { id: '8', source: require('../../assets/imagens/imagens_postagens/8.jpg') },

  ];


const FeedScreen = () => {
  return (

<Container>
      <FlatList
        data={imagens}
        renderItem={({item}) => (
          <Imagem
            source={item.source}
            resizeMode="stretch"
          />
        )}
        keyExtractor={item => item.id}
        numColumns={1} // Define 2 imagens por linha

      />

</Container>
  );
};
export default FeedScreen;
