import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Carregamento from './screens/Carregamento';
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import Home from './screens/Home';
import ListaGeral from './screens/ListaGeral';
import ListaPersonalizada from './screens/ListaPersonalizada';

import Cozinha from './screens/CozinhaLista';
import Banheiro from './screens/BanheiroLista';
import Quarto from './screens/QuartoLista';
import Lavanderia from './screens/LavanderiaLista';

export default function App() {
  const [tela, setTela] = useState('carregamento');

  useEffect(() => {
    async function verificarLoginSalvo() {
      await new Promise(resolve => setTimeout(resolve, 4000));

      const manter = await AsyncStorage.getItem('manterLogado');
      const logado = await AsyncStorage.getItem('usuarioLogado');

      if (manter === 'true' && logado === 'true') {
        setTela('home');
      } else {
        setTela('login');
      }
    }

    verificarLoginSalvo();
  }, []);

  // --- NAVEGAÇÃO ---
  const irParaLogin = async () => {
    await AsyncStorage.setItem('usuarioLogado', 'false');
    await AsyncStorage.setItem('manterLogado', 'false'); // ← correção
    setTela('login');
  };

  const irParaCadastro = () => setTela('cadastro');

  const irParaHome = async (manterConectado) => {
    if (manterConectado) {
      await AsyncStorage.setItem('manterLogado', 'true');
      await AsyncStorage.setItem('usuarioLogado', 'true');
    } else {
      await AsyncStorage.setItem('manterLogado', 'false');
      await AsyncStorage.setItem('usuarioLogado', 'true');
    }

    setTela('home');
  };

  const irParaListaGeral = () => setTela('listaGeral');
  const irParaListaPersonalizada = () => setTela('listaPersonalizada');

  const irParaCozinha = () => setTela('cozinha');
  const irParaBanheiro = () => setTela('banheiro');
  const irParaQuarto = () => setTela('quarto');
  const irParaLavanderia = () => setTela('lavanderia');

  const voltarParaHome = () => setTela('home');
  const voltarParaPersonalizada = () => setTela('listaPersonalizada');

  return (
    <>
      {tela === 'carregamento' && <Carregamento />}

      {tela === 'login' && (
        <Login
          irParaCadastro={irParaCadastro}
          irParaHome={irParaHome} // recebe manterConectado do Login
        />
      )}

      {tela === 'cadastro' && (
        <Cadastro
          irParaLogin={irParaLogin}
          irParaHome={irParaHome}
        />
      )}

      {tela === 'home' && (
        <Home
          irParaListaGeral={irParaListaGeral}
          irParaListaPersonalizada={irParaListaPersonalizada}
          irParaLogin={irParaLogin}
        />
      )}

      {tela === 'listaGeral' && <ListaGeral voltar={voltarParaHome} />}

      {tela === 'listaPersonalizada' && (
        <ListaPersonalizada
          voltar={voltarParaHome}
          irParaCozinha={irParaCozinha}
          irParaBanheiro={irParaBanheiro}
          irParaQuarto={irParaQuarto}
          irParaLavanderia={irParaLavanderia}
        />
      )}

      {tela === 'cozinha' && <Cozinha titulo="Cozinha" voltar={voltarParaPersonalizada} />}
      {tela === 'banheiro' && <Banheiro titulo="Banheiro" voltar={voltarParaPersonalizada} />}
      {tela === 'quarto' && <Quarto titulo="Quarto" voltar={voltarParaPersonalizada} />}
      {tela === 'lavanderia' && <Lavanderia titulo="Lavanderia" voltar={voltarParaPersonalizada} />}
    </>
  );
}
