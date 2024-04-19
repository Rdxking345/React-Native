
import { StyleSheet, Text, View } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 
import RootNavigation from "./Navigation"




export default function App() {
                         
  return (
 <NavigationContainer>
 
<RootNavigation />
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
