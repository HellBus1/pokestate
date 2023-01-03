import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/StackNavigation/StackNavigation';

const theme: ThemeProp = {

}

const App = () => {
  return <PaperProvider theme={theme}>
    <SafeAreaProvider>
      <StackNavigation />
    </SafeAreaProvider>
  </PaperProvider>;
};

export default App;
