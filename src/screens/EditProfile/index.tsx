// EditProfileScreen.js
import React,{useState}  from 'react';
import {Text,StyleSheet, Alert, ImageSourcePropType } from 'react-native';
import TopImage from '../../components/TopImage';
import CustonButton from '../../components/CustomizeButton';
import { Container, ProfileImageContainer } from './style';
import {launchImageLibrary,ImageLibraryOptions} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';



const EditProfile = ({ }) => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState('');
  const handleImageUse = () =>{
  Alert.alert('selecione',
  'informe de onde você quer pegar a foto',
  [
    {
      text:'galeria',
      onPress:()=> pickImageFromGalery(),
      style :'default',
    },
    {
      text:'camera',
      onPress:()=> pickImageFromCamera(),
      style :'default',
    },

  ],
    {
    cancelable: true,
    onDismiss: () =>console.log('tratar depois'),
  },
  );
};
  const pickImageFromGalery = async ()=>{
  const options:ImageLibraryOptions = {
    mediaType:'photo',
  };
  const result = await launchImageLibrary(options);
  if (result){
    if (result.assets){
        setSelectedImage(result.assets[0].uri as string);
    }

  }
};
const pickImageFromCamera = ()=>{
};
const handleNavigateToProfile = () => {
  navigation.navigate('Profile');
};
  return (
    <Container>
      <TopImage/>

        <ProfileImageContainer onPress={handleImageUse}>
          <Text>alterar foto</Text>
        </ProfileImageContainer>

      <CustonButton texto="Salvar alterações"onPress={handleNavigateToProfile}/>
    </Container>
  );
};

const styles = StyleSheet.create({

  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default EditProfile;
