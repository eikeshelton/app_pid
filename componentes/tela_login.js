import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar,Dimensions} from 'react-native';
import Topo_imagem from './topo';
import BotaoPersonalizado from './botaoPersonalizado';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tela_login_fundo } from './tela_login_fundo';


function Tela_login({navigation}) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');



  return (
    <SafeAreaView style={tela_login_fundo.fundo_tela}>
      <View style={estilo.container}>

        <View style={estilo.container_imagem}>
          <Topo_imagem />
        </View>

        <StatusBar />

        <View style={estilo.container_input}>


          <TextInput
            style={estilo.input}
            onChangeText={(text) => setUsuario(text)}
            value={usuario}
            placeholderTextColor={"white"}
            placeholder="Usuário"
          />

          <TextInput
            style={estilo.input}
            onChangeText={(text) => setSenha(text)}
            value={senha}
            placeholderTextColor={"white"}
            placeholder="Senha"
            secureTextEntry={true} // Para ocultar a senha enquanto o usuário digita
          />
        </View>
        <View style={estilo.container_botao}  >
          {/* Renderiza o botão personalizado */}
          <BotaoPersonalizado texto="Entrar" onPress={() => navigation.navigate('perfil')} />
        </View>

        <View style={estilo.container_recuperar_dados}>
          <Text style={estilo.recuperar_dados_rotulo}>Não consegue entrar?</Text>
          <TouchableOpacity>
            <Text style={estilo.recuperar_dados_clicar}>Recuperar dados</Text>
          </TouchableOpacity>
        </View>
        <View style={estilo.container_recuperar_dados}>
          <Text style={estilo.recuperar_dados_rotulo}>Novo aqui?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('tela_cadastro')}>
            <Text style={estilo.recuperar_dados_clicar}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <View style={estilo.container_rodape}>
          <Text style={estilo.rodape_descricao}>Ao usar o aplicativo, você concorda com os nossos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('termos_uso')} >
            <Text style={estilo.rodape_termo_uso}>termos de uso </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};


const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  container_imagem: {
    width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.24,
  },
  container_input: {
    width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.2,

  },
  input: {
    flex: 1,
    marginTop: "0.8%",
    backgroundColor: "#17161b",
    color: 'white',
    borderColor: '#17161b',
    paddingHorizontal: "auto",
    borderRadius: 6,
    marginHorizontal: "1%"
  },
  container_botao: {
    width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.09,
    marginHorizontal: "10%",


  },

  container_recuperar_dados: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height * 0.08,
    marginLeft: "0.5%",
    flexDirection: "row",
  },
  recuperar_dados_rotulo: {
    color: "white",

  },
  recuperar_dados_clicar: {
    color: "#934dd2",

  },
  container_rodape: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height * 0.1,
    justifyContent: 'space-between',

  },
  rodape_descricao: {

    color: "white",
    marginLeft: "1.2%",


  },
  rodape_termo_uso: {
    color: "#934dd2",
    textAlign: "center",
    marginBottom: "auto"

  },

});

export default Tela_login;


