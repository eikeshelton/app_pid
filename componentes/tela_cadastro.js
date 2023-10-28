import React, { useState } from 'react';
import BotaoPersonalizado from './BotaoPersonalizado';
import { View, SafeAreaView, StyleSheet, TextInput, Dimensions,
ScrollView,Text,TouchableOpacity } from 'react-native';
import { tela_login_fundo } from './tela_login_fundo';
import Topo_imagem from './topo';



function Tela_cadastro({navigation}) {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [datanascimento, setDataNascimento] = useState('');
    const [tipousuario, setTipoUsuario] = useState('');

    return (
        <SafeAreaView style={tela_login_fundo.fundo_tela}>
            <View style={estilo.container_imagem}>
                <Topo_imagem />
            </View>

            <View style={estilo.container_input}>
                 <ScrollView>
                <TextInput
                    style={estilo.input}
                    onChangeText={(text) => setUsuario(text)}
                    value={usuario}
                    placeholderTextColor={'white'}
                    placeholder="Usuário:"
                />
                <TextInput
                    style={estilo.input}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholderTextColor={'white'}
                    placeholder="Email:"
                    keyboardType="email-address"
                />

                <TextInput
                    style={estilo.input}
                    onChangeText={(text) => setSenha(text)}
                    value={senha}
                    placeholderTextColor={'white'}
                    placeholder="Senha:"
                    secureTextEntry={true} // Para ocultar a senha enquanto o usuário digita
                />
                <TextInput
                    style={estilo.input}
                    onChangeText={(text) => setSenha(text)}
                    value={senha}
                    placeholderTextColor={'white'}
                    placeholder="Confirmar senha:"
                    secureTextEntry={true} // Para ocultar a senha enquanto o usuário digita
                />
                <TextInput
                    style={estilo.input}
                    onChangeText={(text) => setDataNascimento(text)}
                    value={datanascimento}
                    placeholderTextColor={'white'}
                    placeholder="Data de nascimento:"
                />
                <TextInput
                    style={estilo.input}
                    onChangeText={(text) => setTipoUsuario(text)}
                    value={tipousuario}
                    placeholderTextColor={'white'}
                    placeholder="Tipo de usuário:"
                />


</ScrollView>
            </View>

            <View style={estilo.container_botao}>
                <BotaoPersonalizado texto="Cadastre-se" />

            </View>
            <View style={estilo.container_rodape}>
          <Text style={estilo.rodape_descricao}>Ao usar o aplicativo, você concorda com os nossos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('termos_uso')} >
            <Text style={estilo.rodape_termo_uso}>termos de uso </Text>
          </TouchableOpacity>
        </View>

        </SafeAreaView>
    );
}

const estilo = StyleSheet.create({
    container_imagem: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.25,

    },
    container_input: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.25,

    },
    input: {
        flex: 1,

        backgroundColor: '#17161b',
        color: 'white',
        borderColor: '#17161b',
        paddingHorizontal: 'auto',
        borderRadius: 6,
        marginHorizontal: '1%',
        marginTop:'0.8%',
    },
    container_botao: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.10,
    marginHorizontal: '10%',

    },
    container_rodape: {
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('window').height * 0.10,
        justifyContent: 'space-between',

        marginTop:'5%',


      },
      rodape_descricao: {

        color: 'white',
        marginLeft: '1.2%',
        textAlign: 'center',




      },
      rodape_termo_uso: {
        color: '#934dd2',
        textAlign: 'center',
        marginBottom: 'auto',


      },
});
export default Tela_cadastro;
