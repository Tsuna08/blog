import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  // реализуйте функцию, принимающую на вход число n и генерирующую строку длиной n,
  // состоящую только из десятичных цифр

  const generateFunc = (n: number) => {
    let str = "";
    for (let i = 0; i < n; i++) {
      str = str + Math.floor(Math.random() * n).toString();
    }
    return str;
  };
  generateFunc(10);

  const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));
  async function getNumbers1(): Promise<number[]> {
    delay(1000);
    return [1, 2, 3];
  }
  async function getNumbers2(): Promise<number[]> {
    delay(2000);
    return [4, 5, 6];
  }
  async function getNumbers3(): Promise<number[]> {
    delay(3000);
    return [7, 8, 9];
  }

  const getAllNumber = async () => {
    const result1Promise = getNumbers1();
    const result2Promise = getNumbers2();
    const result3Promise = getNumbers3();

    const result1 = await result1Promise;
    const result2 = await result2Promise;
    const result3 = await result3Promise;

    return [...result1, ...result2, ...result3];
  };

  getAllNumber();
  const [value, setValue] = useState();
  const refInput = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    refInput?.current?.focus();
  };

  useEffect(() => {
    setValue();
  }, [value]);

  const arr = [1, 2, 3];

  // реализуйте компонент - дерево. У дерева всегда один корневой узел.
  // В каждом узле дерева должна находиться кнопка с текстом Открыть для раскрытия этого узла
  // и случайно сгенерированный текст длиной n, где n - уровень дерева (использовать ранее реализованную функцию).
  // При нажатии на кнопку необходимо сгенерировать n потомков, где n - текущий уровень узла. После чего кнопку этого узла скрыть.

  return (
    <>
      <input name='text' type='text' ref={refInput}></input>
      <button onClick={handleClick}>Нажми меня</button>
    </>
  );
}

export default App;
