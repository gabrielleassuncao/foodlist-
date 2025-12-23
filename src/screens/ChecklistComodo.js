import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Checkbox from 'expo-checkbox';
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

export default function ChecklistComodo({ titulo, voltar }) {
  const [itens, setItens] = useState([]);
  const [texto, setTexto] = useState("");

  const user = firebase.auth().currentUser;

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          ⚠ Você precisa estar logado para ver o checklist.
        </Text>
      </View>
    );
  }

  const uid = user.uid;

  // 🔥 Caminho no Firestore usando o UID do usuário
  const ref = db
    .collection("usuarios")
    .doc(uid)
    .collection("checklists")
    .doc(titulo.toLowerCase())
    .collection("itens");

  // 🔥 Carregar itens em tempo real
  useEffect(() => {
    const unsubscribe = ref.onSnapshot((snapshot) => {
      const lista = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setItens(lista);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Adicionar item
  async function adicionarItem() {
    if (texto.trim() === "") return;

    await ref.add({
      nome: texto,
      marcado: false,
    });

    setTexto("");
  }

  // 🔥 Marcar / desmarcar item
  async function toggleItem(item) {
    await ref.doc(item.id).update({
      marcado: !item.marcado,
    });
  }

  // 🔥 Remover só marcados
  async function removerMarcados() {
    itens.forEach(async (item) => {
      if (item.marcado) {
        await ref.doc(item.id).delete();
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>{titulo}</Text>

        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            placeholder="Adicionar item..."
            value={texto}
            onChangeText={setTexto}
          />

          <TouchableOpacity style={styles.btnAdd} onPress={adicionarItem}>
            <Text style={styles.btnAddTxt}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={itens}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Checkbox
                value={item.marcado}
                onValueChange={() => toggleItem(item)}
                color={item.marcado ? "#007a3f" : undefined}
              />
              <Text
                style={[
                  styles.itemTxt,
                  item.marcado && {
                    textDecorationLine: "line-through",
                    opacity: 0.5,
                  },
                ]}
              >
                {item.nome}
              </Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.btnExcluir} onPress={removerMarcados}>
          <Text style={styles.btnExcluirTxt}>Remover marcados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnVoltar} onPress={voltar}>
          <Text style={styles.btnVoltarTxt}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e4ffc2" },
  header: {
    backgroundColor: "#f96b87",
    paddingVertical: 3,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 5,
  },
  content: { flex: 1, padding: 25 },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#48425E",
    textAlign: "center",
    marginBottom: 25,
  },
  addContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  btnAdd: {
    backgroundColor: "#ed5076",
    width: 52,
    height: 52,
    marginLeft: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAddTxt: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
  },
  itemTxt: { fontSize: 18, marginLeft: 12 },
  btnExcluir: {
    backgroundColor: "#ed5076",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  btnExcluirTxt: { color: "white", textAlign: "center", fontSize: 18 },
  btnVoltar: {
    backgroundColor: "#48425E",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  btnVoltarTxt: { color: "white", textAlign: "center", fontSize: 18 },
});
