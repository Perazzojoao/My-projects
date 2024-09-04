import { Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

interface ItemProps {
  imc: number;
}

function Item({ imc }: ItemProps) {
  return ( 
    <View>
      <Text>IMC: {imc}</Text>
    </View>
  );
}

export default Item;