import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import Logo from '../assets/Logo.png';

export default function Home({
  irParaListaGeral,
  irParaListaPersonalizada,
  irParaLogin,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Nova Lista</Text>
        <Text style={styles.subtitulo}>Opções de lista</Text>

        <TouchableOpacity style={styles.botao} onPress={irParaListaGeral}>
          <Text style={styles.botaoTexto}>Lista Geral</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={irParaListaPersonalizada}>
          <Text style={styles.botaoTexto}>Lista Personalizada</Text>
        </TouchableOpacity>

        <Text style={styles.mensagem}>
          Crie sua lista de compras de forma divertida!
        </Text>

        <TouchableOpacity style={styles.sair} onPress={irParaLogin}>
          <Text style={styles.sairTexto}>Sair (voltar ao login)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4ffc2',
  },

  header: {
    backgroundColor: '#f96b87',
    paddingVertical: 3,
    alignItems: 'center',
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 5,
  },

  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#48425E',
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 18,
    color: '#48425E',
    marginBottom: 20,
  },

  botao: {
    width: '85%',
    backgroundColor: '#f14975',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    marginTop: 6,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  mensagem: {
    marginTop: 25,
    fontSize: 16,
    color: '#48425E',
    textAlign: 'center',
  },

  sair: {
    marginTop: 30,
  },
  sairTexto: {
    color: '#f14975',
    fontSize: 14,
  },
});
