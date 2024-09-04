import { useState } from "react";
import { View, Text, TextInput, Vibration, TouchableOpacity, Keyboard, Pressable } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

function Form() {
  const [message, setMessage] = useState("");
  const [imc, setImc] = useState(0);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function verifyImc(imc: number) {
    if (imc === 0) {
      Vibration.vibrate();
      setErrorMessage("Campo obrigatório*");
      return;
    }
    setErrorMessage("");
  }

  function imcCalculator() {
    const formatedHeight = Number(height.toString().replace(",", "."));
    const formatedWeight = Number(weight.toString().replace(",", "."));
    const result = (formatedWeight / (formatedHeight * formatedHeight)).toFixed(2);
    verifyImc(Number(result));
    setImc(Number(result));
  }

  function submitHandler() {
    Keyboard.dismiss();
    if (height === "" || weight === "") {
      setMessage("Por favor, preencha o peso e a altura");
      verifyImc(0);
      setImc(0);
      return;
    }
    imcCalculator();
    setMessage("Seu IMC é: " + imc);
    setHeight('');
    setWeight('');
  }

  return (
    <View style={styles.formContext}>
      {imc === 0 ?
        <Pressable style={styles.form} onPress={Keyboard.dismiss}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. 1.75"
            placeholderTextColor={'#c1c1c1'}
            keyboardType="decimal-pad"
            value={height}
            onChangeText={(e) => {
              setHeight(e);
            }} />
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. 75.33"
            placeholderTextColor={'#c1c1c1'}
            keyboardType="numeric"
            value={weight}
            onChangeText={(e) => {
              setWeight(e);
            }} />
          <TouchableOpacity style={styles.btnCalculator} onPress={submitHandler}>
            <Text style={styles.textBtnCalculator}>Calcular IMC</Text>
          </TouchableOpacity>
        </Pressable>
        :
        <View style={styles.exibirIMC}>
          <ResultImc resultImc={imc} message={message} />
          <TouchableOpacity style={styles.btnCalculator} onPress={() => { setImc(0) }}>
            <Text style={styles.textBtnCalculator}>Voltar</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

export default Form;