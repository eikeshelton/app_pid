import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Container, InputContainer} from './style';
import {Input} from '../../components/Input/style';
import CustomButton from '../../components/CustomizeButton';
import TopImage from '../../components/TopImage';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {useAuth} from '../../hooks/auth';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigation = useNavigation();
  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        Alert.alert('Erro', 'As senhas não coincidem.');
        return;
      }

      const response = await api.post('/usuarios/reset-password/', {
        token: token,
        new_password: newPassword,
        email: email,
      });
      if (response.data) {
        Alert.alert('Sucesso', 'Senha redefinida com sucesso.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha.');
    }
  };

  return (
    <Container>
      <TopImage />
      <InputContainer>
        <Input
          value={token}
          placeholder="Token de redefinição de senha"
          onChangeText={setToken}
          placeholderTextColor={'white'}
        />
        <Input
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
          placeholderTextColor={'white'}
        />
        <Input
          value={newPassword}
          placeholder="Nova senha"
          onChangeText={setNewPassword}
          secureTextEntry={true}
          placeholderTextColor={'white'}
        />
        <Input
          value={confirmNewPassword}
          placeholder="Confirmar nova senha"
          onChangeText={setConfirmNewPassword}
          secureTextEntry={true}
          placeholderTextColor={'white'}
        />
        <CustomButton texto="Redefinir senha" onPress={handleResetPassword} />
      </InputContainer>
    </Container>
  );
}
