import React from 'react';
import {ScrollView} from 'react-native';
import {Container, ContainerImagemTerms, Header, TermsText} from './style';
import TopImage from '../../components/TopImage';
import BackButton from '../../components/BackButton';

function TermsUse() {
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
      <ContainerImagemTerms>
        <TopImage />
      </ContainerImagemTerms>

      <ScrollView>
        <TermsText>
          TERMOS DE USO DO APLICATIVO DE REDE SOCIAL Estes Termos de Uso
          ("Termos") regem o uso do aplicativo de rede social [Nome do
          Aplicativo], doravante referido como "Aplicativo", oferecido por [Nome
          da Empresa ou Desenvolvedor], doravante referido como "Empresa" ou
          "Nós". 1. Aceitação dos Termos Ao usar o Aplicativo, você concorda em
          cumprir e estar vinculado por estes Termos. Se você não concordar com
          qualquer parte destes Termos, não use o Aplicativo. 2. Cadastro e
          Conta de Usuário 2.1. Você pode ser solicitado a criar uma conta de
          usuário para acessar o Aplicativo. Você concorda em fornecer
          informações precisas e atualizadas ao se registrar. 2.2. Você é
          responsável por manter a confidencialidade de suas credenciais de
          login e senha. Você é responsável por todas as atividades que ocorram
          em sua conta. 3. Conteúdo do Usuário 3.1. Você é o único responsável
          por qualquer conteúdo que você postar, carregar, compartilhar ou
          disponibilizar através do Aplicativo. Você concorda em não postar
          conteúdo que seja ilegal, difamatório, obsceno, invasivo da
          privacidade de terceiros ou que viole os direitos de propriedade
          intelectual de terceiros. 3.2. A Empresa se reserva o direito de
          remover ou modificar qualquer conteúdo que viole estes Termos ou que
          seja considerado inadequado, a seu exclusivo critério. 4. Privacidade
          A coleta e o uso de informações pessoais estão sujeitos à nossa
          Política de Privacidade, disponível em [Link para a Política de
          Privacidade]. 5. Alterações nos Termos A Empresa reserva o direito de
          modificar ou atualizar estes Termos a qualquer momento, a seu
          exclusivo critério. Quaisquer alterações serão comunicadas aos
          usuários através do Aplicativo. É responsabilidade do usuário revisar
          periodicamente os Termos. 6. Encerramento de Conta A Empresa pode
          encerrar ou suspender sua conta e acesso ao Aplicativo a qualquer
          momento, por qualquer motivo, sem aviso prévio. 7. Disposições Gerais
          7.1. Estes Termos constituem o acordo integral entre você e a Empresa
          em relação ao uso do Aplicativo e substituem todos os acordos
          anteriores. 7.2. Estes Termos serão regidos pelas leis do [Seu País] e
          quaisquer litígios serão submetidos à jurisdição exclusiva dos
          tribunais de [Sua Cidade, Seu País].
        </TermsText>
      </ScrollView>
    </Container>
  );
}

export default TermsUse;
