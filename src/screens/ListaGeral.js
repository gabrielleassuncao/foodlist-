import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';

import Logo from '../assets/Logo.png';

export default function ListaGeral({ voltar }) {
  const [texto, setTexto] = useState('');
  const [lista, setLista] = useState([]);

  function adicionarItem() {
    if (texto.trim() === '') return;
    setLista([...lista, { nome: texto, marcado: false }]);
    setTexto('');
  }

  function alternarCheck(index) {
    const novaLista = [...lista];
    novaLista[index].marcado = !novaLista[index].marcado;
    setLista(novaLista);
  }

  function removerMarcados() {
    setLista(lista.filter((item) => !item.marcado));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Lista Geral</Text>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Adicionar item..."
            placeholderTextColor="#555"
            value={texto}
            onChangeText={setTexto}
          />

          <TouchableOpacity style={styles.btnAdd} onPress={adicionarItem}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          {lista.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => alternarCheck(index)}>
              <View
                style={[
                  styles.checkbox,
                  { backgroundColor: item.marcado ? '#007a3f' : 'white' },
                ]}
              />
              <Text
                style={[
                  styles.itemTexto,
                  {
                    textDecorationLine: item.marcado ? 'line-through' : 'none',
                  },
                ]}>
                {item.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.btnExcluir} onPress={removerMarcados}>
          <Text style={styles.btnExcluirTxt}>Remover marcados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnVoltar} onPress={voltar}>
          <Text style={styles.txtVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3BF',
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
    backgroundColor: '#FFF3BF',
    padding: 20,
  },

  titulo: {
    color: '#48425E',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 20,
  },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  btnAdd: {
    backgroundColor: '#ed5076',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  addText: {
    color: 'white',
    fontSize: 30,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007a3f',
    marginRight: 10,
  },

  itemTexto: {
    fontSize: 18,
    color: '#48425E',
  },

  btnExcluir: {
    backgroundColor: '#ed5076',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },

  btnExcluirTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  btnVoltar: {
    backgroundColor: '#48425E',
    padding: 12,
    borderRadius: 8,
    marginTop: 25,
  },

  txtVoltar: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
