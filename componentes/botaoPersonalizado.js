import React from 'react';
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native';

function BotaoPersonalizado({ texto,onPress }) {
  return (
    <View style={estilo.container}>
    <TouchableOpacity style={estilo.botao} onPress={onPress}>
      <Text style={estilo.textoBotao}>{texto}</Text>
    </TouchableOpacity>
    </View>
  );
}

const estilo = StyleSheet.create({
  container:{
  flex:1,
  
  },
  botao: {
    flex:0.9,
    backgroundColor: '#934dd2',
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 8,
  },
  textoBotao: {
    
    textAlign:'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
});

export default BotaoPersonalizado;
