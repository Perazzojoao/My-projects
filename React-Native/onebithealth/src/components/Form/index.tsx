import { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Keyboard } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

function Form() {
  const [message, setMessage] = useState("");
  const [imc, setImc] = useState(0);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  function imcCalculator() {
    const formatedHeight = Number(height.toString().replace(",", "."));
    const formatedWeight = Number(weight.toString().replace(",", "."));
    const result = (formatedWeight / (formatedHeight * formatedHeight)).toFixed(2);
    setImc(Number(result));
  }

  function submitHandler() {
    Keyboard.dismiss();
    if (height === "" || weight === "") {
      setMessage("Por favor, preencha o peso e a altura");
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
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
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
      </View>
      <ResultImc resultImc={imc} message={message} />
    </View>
  );
}

export default Form;