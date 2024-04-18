import React from 'react';
import {Container, ContainerImagem, Title} from './styles';
import TopImage from '../TopImage';

export function Loading() {
  return (
    <Container>
      <ContainerImagem>
        <TopImage />
      </ContainerImagem>
      <Title>Carregando...</Title>
    </Container>
  );
}
