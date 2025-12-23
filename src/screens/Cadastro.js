import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Image,
} from 'react-native';

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

const db = firebase.firestore();
const auth = firebase.auth();

const Cadastro = ({ irParaLogin, irParaHome }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [erroLogin, setErroLogin] = useState("");

  const verificarCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      return setErroLogin("Atenção! Preencha todos os campos.");
    }

    if (senha !== confirmarSenha) {
      return setErroLogin("As senhas não coincidem!");
    }
    if (nome.trim().length < 3) {
       return setErroLogin("Digite um nome válido (mínimo 3 letras).");
}

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
      const user = userCredential.user;

      await db.collection("usuarios").doc(user.uid).set({
        nome: nome,
        email: email,
        criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");

      irParaHome();

    } catch (error) {
      console.log(error);

      if (error.code === "auth/email-already-in-use") 
        return setErroLogin("E-mail já está cadastrado.");
      if (error.code === "auth/invalid-email") 
        return setErroLogin("Digite um e-mail válido.");
      if (error.code === "auth/weak-password") 
        return setErroLogin("A senha precisa conter pelo menos 6 caracteres.");

      return setErroLogin("Erro inesperado. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
    </View>
      <Text style={styles.titulo}>Cadastro</Text>

      <Text style={styles.subtitulos}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={(t) => {
          setNome(t);
          setErroLogin("");
        }}
        placeholder="Digite seu nome"
        placeholderTextColor='#b5b5b5'
      />

      <Text style={styles.subtitulos}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          setErroLogin("");
        }}
        placeholder="Digite seu e-mail"
        placeholderTextColor='#b5b5b5'
        keyboardType="email-address"
      />

      <Text style={styles.subtitulos}>Senha</Text>
      <View>
        <TextInput
          style={styles.input}
          secureTextEntry={!mostrarSenha}
          value={senha}
          onChangeText={(t) => {
            setSenha(t);
            setErroLogin("");
          }}
          placeholder="Digite sua senha"
          placeholderTextColor='#b5b5b5'
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Text style={styles.olho}>
            {mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulos}>Confirme sua senha</Text>
      <View>
        <TextInput
          style={styles.input}
          secureTextEntry={!mostrarConfirmar}
          value={confirmarSenha}
          onChangeText={(t) => {
            setConfirmarSenha(t);
            setErroLogin("");
          }}
          placeholder="Confirme sua senha"
          placeholderTextColor='#b5b5b5'
        />
        <TouchableOpacity onPress={() => setMostrarConfirmar(!mostrarConfirmar)}>
          <Text style={styles.olho}>
            {mostrarConfirmar ? 'Ocultar senha' : 'Mostrar senha'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 15 }}>
        <Button
          title="Cadastre-se"
          color="#fe999c"
          onPress={verificarCadastro}
        />
      </View>

      {erroLogin !== "" && (
        <Text style={styles.erroTexto}>{erroLogin}</Text>
      )}

      <TouchableOpacity onPress={irParaLogin}>
        <Text style={styles.link}>{'\n'}Já possui uma conta? Faça Login.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e3ffc2',
    padding: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'serif',
    color: '#fe999c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b5b5b5',
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
    marginTop: 5,
    fontSize: 15,
    fontFamily: 'serif',
  },
  olho: {
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
    logoContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Cadastro;
