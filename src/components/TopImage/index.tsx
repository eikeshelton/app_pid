import React from 'react';
import Logo from '../../assets/imagens/logo.png';
import {Container, ImageLogo} from './styles';
export default function TopImage() {
  return (
    <>
      <Container>
        <ImageLogo
          source={Logo}
          resizeMode="contain" // Esta propriedade define como a imagem deve se ajustar ao espaço disponível//
        />
      </Container>
    </>
  );
}
