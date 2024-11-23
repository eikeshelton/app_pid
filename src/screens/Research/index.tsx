import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useAuth} from '../../hooks/auth';
import {
  Background,
  ClickableText,
  Container,
  ContainerButton,
  EventButton,
  EventIcon,
  FilterButton,
  FilterContainer,
  Name,
  PictureContainer,
  ProfilePicture,
} from './style';
import fotoPerfil from '../../assets/imagens/fotoperfil.png';
import {useNavigation} from '@react-navigation/native';
import {ModalHistory} from '../../components/ModalHistory';
import {InputComponent} from '../../components/Input';
import InputPicker from '../../components/InputPicker';
import axios from '../../services/api';
interface Usersfilter {
  id_usuario: number;
  login: string;
  tipo_usuario: string;
  foto_perfil: string;
  nome_usuario: string;
  bio: string;
  seguidores: number;
  seguidos: number;
}
export default function Research() {
  const navigation = useNavigation();
  const {userssearch, Search, clearUsersSearch, RegisterSearch, user} =
    useAuth();
  const [pesquisar, setPesquisar] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFiltros, setshowFiltros] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [usersfilter, setUserFilter] = useState<Usersfilter[]>([]);
  const handleChangeText = (text: string) => {
    setPesquisar(text);
  };

  useEffect(() => {
    if (pesquisar.length > 0) {
      handleChangeText(pesquisar);
      handleLogin();
    } else {
      clearUsersSearch();
      // Chame a função para limpar userssearch
    }
  }, [pesquisar]);

  const handleLogin = React.useCallback(() => {
    Search({
      login: pesquisar,
    }).catch(_error => {
      console.error(_error);
    });
  }, [Search, pesquisar]);

  const handleItemPress = (item: any) => {
    navigation.navigate('UserSearch', {selectedItem: item});
    RegisterSearch({
      usuario_id: user.id,
      pesquisado_id: item.id_usuario,
    });
  };
  const Buscar_usuario_por_tipo = async () => {
    try {
      const response = await axios.post('/usuarios/buscar/filtro', {
        tipo_usuario: tipoUsuario,
      });

      setUserFilter(response.data);
    } catch (error) {}
  };

  const renderItem = ({item}: any) => (
    <PictureContainer onPress={() => handleItemPress(item)}>
      {item.foto_perfil ? (
        <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="cover" />
      ) : (
        <ProfilePicture source={fotoPerfil} resizeMode="contain" />
      )}
      <Name>{item.login}</Name>
      <Name>{item.tipo_usuario}</Name>
    </PictureContainer>
  );
  const renderItemFilter = ({item}: any) => (
    <PictureContainer onPress={() => handleItemPress(item)}>
      {item.foto_perfil ? (
        <ProfilePicture source={{uri: item.foto_perfil}} resizeMode="cover" />
      ) : (
        <ProfilePicture source={fotoPerfil} resizeMode="contain" />
      )}
      <Name>{item.login}</Name>
      <Name>{item.tipo_usuario}</Name>
    </PictureContainer>
  );

  const showmodels = () => {
    if (pesquisar.length === 0) {
      setShowModal(true);
    }
  };

  return (
    <Background>
      <Container>
        <InputComponent
          onChangeText={handleChangeText}
          value={pesquisar}
          placeholderTextColor={'silver'}
          placeholder="Pesquisar"
          isFocused={true} // O campo está focado quando esta prop é true
          showModels={showmodels}
        />

        <FlatList
          data={userssearch}
          renderItem={renderItem}
          keyExtractor={item => item.id_usuario.toString()}
          numColumns={2}
        />
        <ContainerButton>
          <FilterButton onPress={() => setshowFiltros(!showFiltros)}>
            <ClickableText>Filtros</ClickableText>
          </FilterButton>
          <EventButton onPress={() => navigation.navigate('Events')}>
            <EventIcon name="emoji-events" size={30} />
            <ClickableText>Eventos</ClickableText>
          </EventButton>
        </ContainerButton>
        {showFiltros && (
          <FilterContainer>
            <InputPicker
              items={[
                {label: 'Atleta', value: 'Atleta'},
                {label: 'Entusiasta', value: 'Entusiasta'},
                {label: 'Nutricionista', value: 'Nutricionista'},
                {label: 'Treinador', value: 'Treinador'},
              ]}
              onValueChange={(value: string) => setTipoUsuario(value)}
              placeholder={{
                label: 'Selecione o tipo de usuário',
                value: null,
              }}
            />
            <FilterButton onPress={() => Buscar_usuario_por_tipo()}>
              <ClickableText>selecionar</ClickableText>
            </FilterButton>
            <FlatList
              data={usersfilter}
              renderItem={renderItemFilter}
              keyExtractor={item => item.id_usuario.toString()}
              numColumns={2}
            />
          </FilterContainer>
        )}
      </Container>
      <ModalHistory
        onDismiss={() => setShowModal(false)}
        showModal={showModal}
      />
    </Background>
  );
}
