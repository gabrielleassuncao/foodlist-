import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Image, ImageBackground } from 'react-native';
import Logo from '../assets/Logo.png';

const DURACAO_MS = 4000;

export default function Carregamento({ aoConcluir }) {
  const progressoAnimado = useRef(new Animated.Value(0)).current;
  const [larguraBox, setLarguraBox] = useState(0);

  useEffect(() => {
    if (larguraBox > 0) {
      Animated.timing(progressoAnimado, {
        toValue: larguraBox,
        duration: DURACAO_MS,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        if (typeof aoConcluir === "function") {
          aoConcluir();
        }
      });
    }
  }, [larguraBox]);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Image source={Logo} style={styles.logo} />

          <View
            style={styles.progressBox}
            onLayout={(e) => setLarguraBox(e.nativeEvent.layout.width)}
          >
            <Animated.View
              style={[
                styles.progressBar,
                { width: progressoAnimado }
              ]}
            />
          </View>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.55)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 250,
    height: 200,
    alignSelf: "center",
    marginBottom: 80,
    borderRadius: 10,
  },
  progressBox: {
  height: 28,
  width: "85%",
  backgroundColor: "#fee6e5",
  borderRadius: 7,
  overflow: "hidden",
  alignSelf: "center",
  borderWidth: 3,
  borderColor: "#d18a87", 
},
  progressBar: {
    height: "100%",
    backgroundColor: "#f3bab7",
  },
});
