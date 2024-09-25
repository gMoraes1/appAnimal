import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Rotas from './componentes/Rotas';

function App() {
  return (
    <View style={{ flex: 1 }}>
    <NavigationContainer>
      <Rotas />
    </NavigationContainer>
    </View>
  );
}
export default App;