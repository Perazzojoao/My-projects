import { CalculatorContext } from "@/contexts/CalculatorContext";
import { useContext } from "react";

export function useCalculator() {
  const { number, setNumber } = useContext(CalculatorContext);

  const getScreenValue = () => {
    return number;
  }

  const clearScreen = () => {
    setNumber('0');
  }

  const percentage = () => {
    setNumber(prev => {
      return String (Number(prev) / 100);
    });
  }

  return { getScreenValue, clearScreen, percentage };
}