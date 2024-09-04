import { Text, View, TouchableOpacity, Share } from "react-native";
import styles from "./style";

interface ResultImcProps {
  message: string;
  resultImc: number;
}

function ResultImc({ message, resultImc }: ResultImcProps) {
  const onShare = async () => {
    const result = await Share.share({
      message: `Meu IMC hoje é: ${resultImc}`,
    });
  }

  return (
    <View style={styles.resultImc}>
      {resultImc !== 0 && <Text style={styles.information}>Seu IMC é:</Text>}
      <Text style={styles.numberImc}>{resultImc !== 0 ? resultImc.toFixed(2) : ''}</Text>
      {resultImc === 0 && <Text style={styles.information}>{message}</Text>}
      <View style={styles.boxShareButton}>
        {resultImc !== 0 &&
          <TouchableOpacity onPress={onShare} style={styles.buttonShare}>
            <Text style={styles.buttonText}>Compartilhar</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}

export default ResultImc;