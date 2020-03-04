/* eslint-disable no-sparse-arrays */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Text,
  View,
  Keyboard,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

const App = () => {
  const [offset] = React.useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = React.useState(new Animated.Value(0));
  const [logo] = React.useState(new Animated.ValueXY({x: 130, y: 155}));
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      Animated.parallel([
        Animated.timing(logo.x, {
          toValue: 55,
          duration: 100,
        }),
        Animated.timing(logo.y, {
          toValue: 65,
          duration: 100,
        }),
      ]).start();
    });

    Keyboard.addListener('keyboardDidHide', () => {
      Animated.parallel([
        Animated.timing(logo.x, {
          toValue: 130,
          duration: 100,
        }),
        Animated.timing(logo.y, {
          toValue: 155,
          duration: 100,
        }),
      ]).start();
    });

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),

      Animated.timing(opacity, {toValue: 1, duration: 1000}),
      ,
    ]).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.background}>
      <View style={styles.containerImage}>
        <Animated.Image
          source={require('./assets/logo.png')}
          style={{width: logo.x, height: logo.y}}
        />
      </View>

      <Animated.View
        style={[
          styles.containerForm,
          {
            opacity,
            transform: [{translateY: offset.y}],
          },
          ,
        ]}>
        <TextInput
          style={styles.input}
          placeholder="email"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TextInput
          style={styles.input}
          placeholder="senha"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta grátis</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },

  containerImage: {
    flex: 1,
    justifyContent: 'center',
  },

  containerForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: '#fff',
  },
});

export default App;
