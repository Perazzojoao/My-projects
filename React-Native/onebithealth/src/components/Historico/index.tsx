import { FlatList, Text, View } from "react-native";
import Item from "./Item";
import { IHistorico } from "../Form";
import styles from "./style";

interface HistoricoProps {
  data: IHistorico[];
}

function Historico({ data }: HistoricoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <FlatList data={data} renderItem={({ item }) => <Item key={item.id} imc={item.imc} />} keyExtractor={(item) => item.id.toString()} style={{ width: '100%' }} />
    </View>
  );
}

export default Historico;