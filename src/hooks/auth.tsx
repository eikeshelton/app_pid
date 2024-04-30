import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  nome_usuario?: string;
  tipo_usuario?: string;
  bio?: string;
  foto_perfil?: string;
  seguidores?: number;
  seguidos?: number;
  email?: string;
  login?: string;
  senha?: string;
  id?: Number;
  token?: string;
}
interface UserCheck {
  email: any;
  senha: string;
}

interface SignInCredentials {
  login: string;
  senha: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateAvatar: (user: User) => Promise<void>;
  updateLogin: (user: User) => Promise<void>;
  checkCredentials: (user: UserCheck) => Promise<boolean>;
  requestPasswordReset: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  const [data, setData] = useState<User>({foto_perfil: ''} as User);

  async function signIn({login, senha}: SignInCredentials) {
    try {
      const response = await api.post('/login/', {
        login,
        senha,
      });

      if (response.data) {
        const user = response.data;
        setData(response.data);
        const userEmail = user.email;
        await AsyncStorage.setItem('userEmail', userEmail);

        const userString = JSON.stringify(user);
        await AsyncStorage.setItem('userString', userString);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function destroyAllTables() {
    await AsyncStorage.setItem('userString', '');

    setData({} as User);
  }

  async function signOut() {
    try {
      destroyAllTables();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw new Error('Erro ao fazer logout.');
    }
  }
  async function updateUser(user: User) {
    try {
      const response = await api.post('/usuarios/', {
        email: user.email,
      });
      if (response.data) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function updateAvatar(user: User) {
    try {
      const response = await api.put(`/usuarios/${user.email}`, {
        foto_perfil: 'data:image/png;base64,' + user.foto_perfil,
        bio: user.bio,
        nome_usuario: user.nome_usuario,
        tipo_usuario: user.tipo_usuario,
      });

      if (response.data) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function requestPasswordReset(user: User) {
    try {
      // Enviar apenas o token para o backend
      const response = await api.post('/usuarios/request-password-reset/', {
        email: user.email,
      });

      // Verificar se a resposta foi bem-sucedida
      if (response.status === 200) {
        console.log('Email enviado');
      } else {
        throw new Error('Erro ao enviar o email');
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function checkCredentials(user: UserCheck): Promise<boolean> {
    try {
      const response = await api.post('/check-credentials/', {
        email: user.email,
        senha: user.senha,
      });

      if (response.data) {
        console.log('credenciais válidas');
        setData(response.data);
        return true;
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function updateLogin(user: User) {
    try {
      const response = await api.put('/Uploadlogin/', {
        email: user.email,
        id: user.id,
        login: user.login,
        senha: user.senha,
      });

      if (response.data) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadUserData() {
      const user = await AsyncStorage.getItem('userString');

      if (user) {
        const userJson = JSON.parse(user);

        if (isMounted) {
          setData(userJson as User);
        }
      }
    }
    loadUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updateUser,
        updateAvatar,
        updateLogin,
        checkCredentials,
        requestPasswordReset,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export {AuthProvider, useAuth};
