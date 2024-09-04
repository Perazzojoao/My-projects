import { FlatList, Text, View } from "react-native";
import Item from "./Item";

function Historico() {
  return ( 
    <View>
      <Text>Historico</Text>
      <FlatList data={null} renderItem={item => <Item  imc={0} />} />
    </View>
  );
}

export default Historico;