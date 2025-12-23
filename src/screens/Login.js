// screens/Login.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/Logo.png';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwG_CGPqZBAOYOrhw3T0NdaggM9t90IVE",
  authDomain: "foodlist-72577.firebaseapp.com",
  projectId: "foodlist-72577",
  storageBucket: "foodlist-72577.appspot.com",
  messagingSenderId: "94455084786",
  appId: "1:94455084786:web:c8181c1d60cc9181eb026b",
  measurementId: "G-KJYQSZPE91"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export default function Login({ irParaCadastro, irParaHome }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroLogin, setErroLogin] = useState("");
  const [manterLogado, setManterLogado] = useState(false);

  const verificarLogin = async () => {
    const emailLimpo = email.trim();
    const senhaLimpa = senha.trim();

    if (!emailLimpo || !senhaLimpa) {
      return setErroLogin("Preencha todos os campos.");
    }

    auth.signInWithEmailAndPassword(emailLimpo, senhaLimpa)
      .then(async () => {

        // 🔥 SALVA AS CONFIGURAÇÕES PARA PERMANECER LOGADO
        await AsyncStorage.setItem("manterLogado", manterLogado ? "true" : "false");
        await AsyncStorage.setItem("usuarioLogado", "true");

        irParaHome();
      })
      .catch((erro) => {
        console.log("Erro no login:", erro.code);

        switch (erro.code) {
          case "auth/user-not-found":
            return setErroLogin("Usuário não encontrado");
          case "auth/wrong-password":
            return setErroLogin("Senha incorreta");
          case "auth/invalid-email":
            return setErroLogin("E-mail inválido");
          case "auth/internal-error":
            return setErroLogin("Erro interno. Verifique os dados e tente novamente.");
          default:
            return setErroLogin("Não foi possível fazer login.");
        }
      });
  };

  const recuperarSenha = () => {
    if (!email) {
      return alert("Digite seu e-mail acima para recuperar a senha.");
    }

    auth.sendPasswordResetEmail(email)
      .then(() => alert("Um link de recuperação foi enviado para o seu e-mail."))
      .catch((erro) => {
        if (erro.code === "auth/user-not-found") {
          alert("Esse e-mail não está registrado.");
        } else {
          alert("Não foi possível enviar o e-mail de recuperação.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.titulo}>Login</Text>

      <Text style={styles.subtitulos}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(t) => { setEmail(t); setErroLogin(""); }}
        placeholder="Digite seu e-mail"
        placeholderTextColor='#b5b5b5'
        keyboardType="email-address"
      />

      <Text style={styles.subtitulos}>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={!mostrarSenha}
        value={senha}
        onChangeText={(t) => { setSenha(t); setErroLogin(""); }}
        placeholder="Digite sua senha"
        placeholderTextColor='#b5b5b5'
      />

      <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
        <Text style={styles.mostrar}>
          {mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linhaOpcao}
        onPress={() => setManterLogado(!manterLogado)}
      >
        <View style={styles.checkbox}>
          {manterLogado && <View style={styles.checkboxMarcado} />}
        </View>
        <Text style={styles.textoOpcao}>Manter conectado</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 15 }}>
        <Button
          title="Entrar"
          color="#fe999c"
          onPress={verificarLogin}
        />
      </View>

      {erroLogin !== "" && (
        <Text style={styles.erroTexto}>{erroLogin}</Text>
      )}

      <TouchableOpacity onPress={irParaCadastro}>
        <Text style={styles.link}>{'\n'}Ainda não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={recuperarSenha}>
        <Text style={styles.recuperar}>{'\n'}Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e4ffc2', },

  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 5,
  },
  logo: { 
    width: 100, 
    height: 100, 
    resizeMode: 'contain',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fe999c',
    fontFamily: 'serif',
  },

  input: {
    borderWidth: 1,
    color: '#b5b5b5',
    borderRadius: 5,
    padding: 12,
    marginBottom: 4,
    fontSize: 16,
    fontFamily: 'serif',
  },

  subtitulos: {
    fontSize: 17,
    textAlign: 'left',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#b5b5b5',
    fontFamily: 'serif',
  },

  link: {
    color: '#fe999c',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
    fontFamily: 'serif',
  },

  mostrar: {
    color: '#fe999c',
    textAlign: 'right',
    marginBottom: 15,
    fontSize: 14,
    fontFamily: 'serif',
  },

  erroTexto: {
    color: '#fe999c',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },

  recuperar: {
    color: '#fe999c',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'serif',
  },

  linhaOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fe999c',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxMarcado: {
    width: 12,
    height: 12,
    backgroundColor: '#fe999c',
    borderRadius: 2,
  },
  textoOpcao: {
    fontSize: 15,
    color: '#fe999c',
    fontFamily: 'serif',
  },
});
