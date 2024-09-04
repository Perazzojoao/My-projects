import { View, Text } from "react-native";
import styles from "./stle";

interface ItemProps {
  imc: number;
}

function Item({ imc }: ItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} >IMC: <Text style={styles.result} >{imc}</Text></Text>
    </View>
  );
}

export default Item;