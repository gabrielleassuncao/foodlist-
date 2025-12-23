import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

import Logo from '../assets/Logo.png';

export default function ListaPersonalizada({
  voltar,
  irParaCozinha,
  irParaBanheiro,
  irParaQuarto,
  irParaLavanderia,
}) {
  const newScale = () => useRef(new Animated.Value(1)).current;

  const scaleCozinha = newScale();
  const scaleBanheiro = newScale();
  const scaleQuarto = newScale();
  const scaleLavanderia = newScale();

  function animar(scaleRef, acao) {
    Animated.sequence([
      Animated.timing(scaleRef, {
        toValue: 1.15,
        duration: 120,
        useNativeDriver: true,
      }),

      Animated.timing(scaleRef, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => acao && acao());
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.titulo}>Lista Personalizada</Text>

      <View style={styles.grid}>
        {/* Cozinha */}
        <TouchableWithoutFeedback
          onPress={() => animar(scaleCozinha, irParaCozinha)}>
          <Animated.View
            style={[styles.card, { transform: [{ scale: scaleCozinha }] }]}>
            <Image
              source={require('../assets/cozinha.png')}
              style={styles.imagem}
            />
            <Text style={styles.nome}>Cozinha</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* Banheiro */}
        <TouchableWithoutFeedback
          onPress={() => animar(scaleBanheiro, irParaBanheiro)}>
          <Animated.View
            style={[styles.card, { transform: [{ scale: scaleBanheiro }] }]}>
            <Image
              source={require('../assets/banheiro.png')}
              style={styles.imagem}
            />
            <Text style={styles.nome}>Banheiro</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* Quarto */}
        <TouchableWithoutFeedback
          onPress={() => animar(scaleQuarto, irParaQuarto)}>
          <Animated.View
            style={[styles.card, { transform: [{ scale: scaleQuarto }] }]}>
            <Image
              source={require('../assets/quarto.png')}
              style={styles.imagem}
            />
            <Text style={styles.nome}>Quarto</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* Lavanderia */}
        <TouchableWithoutFeedback
          onPress={() => animar(scaleLavanderia, irParaLavanderia)}>
          <Animated.View
            style={[styles.card, { transform: [{ scale: scaleLavanderia }] }]}>
            <Image
              source={require('../assets/lavanderia.png')}
              style={styles.imagem}
            />
            <Text style={styles.nome}>Lavanderia</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>

      {/* Botão voltar */}
      <TouchableOpacity style={styles.btnVoltar} onPress={voltar}>
        <Text style={styles.txtVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4ffc2',
    paddingBottom: 20,
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

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#48425E',
    textAlign: 'center',
    marginVertical: 25,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    backgroundColor: '#fff',
    width: 140,
    height: 140,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginBottom: 15,
  },
  imagem: {
    width: 70,
    height: 70,
  },
  nome: {
    marginTop: 8,
    fontWeight: '600',
    color: '#48425E',
  },
  btnVoltar: {
    backgroundColor: '#48425E',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  txtVoltar: {
    color: '#fff',
    fontSize: 18,
  },
});
