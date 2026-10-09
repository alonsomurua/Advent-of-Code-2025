import * as fs from "fs";

const cypherArray = [];
let word = "";

try {
  const data = fs.readFileSync("./ds.txt", "utf8");
  for (const element of data) {
    if (element !== "\n" && element !== "\r") {
      word = word + element;
    } else {
      if (element !== "\r") {
        cypherArray.push(word);
        word = "";
      }
    }
  }
} catch (error) {
  console.error(error);
}

const prueba = ["L150"];
const prueba2 = [
  "L68",
  "L30",
  "R48",
  "L5",
  "R60",
  "L55",
  "L1",
  "L99",
  "R14",
  "L82",
];

const enigmaMachine = (safeInputList: Array<String>) => {
  let counter: number = 50;
  let counterZeroPrueba_1: number = 0;
  let counterZeroPrueba_2: number = 0;

  for (const safeInput of safeInputList) {
    console.debug("Counter ZERO prueba 2 antes ciclo: " + counterZeroPrueba_2);

    const rotationsIntoDegrees = parseInt(safeInput.slice(1)) % 100;
    const vueltas = Math.trunc(parseInt(safeInput.slice(1)) / 100);

    console.debug("Vueltas plano: " + safeInput);
    console.debug("vueltas: " + vueltas);

    counterZeroPrueba_2 = counterZeroPrueba_2 + vueltas;

    console.debug("Rotación real (sin vueltas): " + rotationsIntoDegrees);
    if (safeInput.charAt(0) === "L") {
      if (rotationsIntoDegrees > counter) {
        counter = 100 - Math.abs(counter - rotationsIntoDegrees);
        counterZeroPrueba_2 = counterZeroPrueba_2 + 1;
        if (counter === 0) {
          counterZeroPrueba_1 += 1;
          counterZeroPrueba_2 = counterZeroPrueba_2 + 1;
        }
      } else {
        counter = counter - rotationsIntoDegrees;
        if (counter === 0) {
          counterZeroPrueba_1 += 1;
          counterZeroPrueba_2 = counterZeroPrueba_2 + 1;
        }
      }
      if (safeInput.charAt(0) === "R") {
        if (rotationsIntoDegrees + counter > 99) {
          console.debug("asdasd");
          counter = rotationsIntoDegrees - (100 - counter);
          counterZeroPrueba_2 = counterZeroPrueba_2 + 1;
          if (counter === 0) {
            counterZeroPrueba_1 += 1;
            counterZeroPrueba_2 = counterZeroPrueba_2 + 1;
          }
        } else {
          counter = counter + rotationsIntoDegrees;
          if (counter === 0) {
            counterZeroPrueba_1 += 1;
            counterZeroPrueba_2 = counterZeroPrueba_2 + 1;
          }
        }
      }
      console.debug("Apuntando: " + counter);
      console.debug(
        "Counter ZERO prueba 2 DESPUES ciclo: " + counterZeroPrueba_2,
      );
      console.debug("------------------");
    }
  }

  console.debug("Contraseña prueba 1: " + counterZeroPrueba_1);
  console.debug("Contraseña prueba 2: " + counterZeroPrueba_2);
};

enigmaMachine(prueba2);
