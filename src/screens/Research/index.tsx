import React,{useState} from 'react';
import { Input } from '../../components/Input/style';
import { ScreenBackgroundRegister } from '../Register/style';
import { View } from 'react-native';




export default function Research(){
    const [pesquisar,setPesquisar] = useState('');
    return (
    <ScreenBackgroundRegister>
        <View>
        <Input
            onChangeText={text => setPesquisar(text)}
            value={pesquisar}
            placeholderTextColor={'white'}
            placeholder="Pesquisar"
          />
          </View>
    </ScreenBackgroundRegister>
    );
}
