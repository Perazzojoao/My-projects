import { Text, View } from "react-native";

interface ResultImcProps {
  message: string;
  resultImc: number;
}

function ResultImc({ message, resultImc }: ResultImcProps) {
  return (
    <View>
      {resultImc !== 0 && <Text>Seu IMC é: {resultImc}</Text>}
      {resultImc === 0 &&<Text>{message}</Text>}
    </View>
  );
}

export default ResultImc;