import { StatusBar, StyleSheet, View, Keyboard } from "react-native";
import Title from "../components/Title";
import Main from "../components/Main";

function App() {
  return ( 
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#e0e5e5" />
      <Title />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e5e5',
    paddingTop: 80,
  }
})

export default App;