import { debug } from "console";
import * as fs from "fs";
import { constrainedMemory } from "process";
import { compose } from "stream";

//read file
let ds = "";

try {
  ds = fs.readFileSync("Day 2/ds.txt", "utf8");
} catch (error) {
  console.error(error);
}

type idContainer = {
  rangeStart: string;
  rangeEnd: string;
};

//example ds
const dsExample =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
const dsExample2 = "110-112";
const dsExample3 = "2121212121-2121212122";

//array de rangos se parsea a una lista de objetos e.g ["11-22, 33-97,..."] => { rangeStart: '11', rangeEnd: '22', {...},... }
const parser = (arg: string) => {
  const idArray: Array<idContainer> = [];
  let tempStart = "";
  let tempNumer = 0;

  for (const char of arg) {
    if (char == ",") {
      idArray.push({ rangeStart: String(tempNumer), rangeEnd: tempStart });
      tempStart = "";
      tempNumer = 0;
    }

    if (char == "-") {
      tempNumer = parseInt(tempStart);
      tempStart = "";
    }

    if (char != "-" && char != ",") {
      tempStart = tempStart + char;
    }
  }

  if (tempStart !== "") {
    idArray.push({ rangeStart: String(tempNumer), rangeEnd: tempStart });
  }

  return idArray;
};

//checks each item of the array for invalid ids
const idChecker1 = (ds: string) => {
  let invalidId = 0;

  const idArray = parser(ds);

  idArray.forEach((element) => {
    let rangeStart = parseInt(element.rangeStart);

    let loopCounter = parseInt(element.rangeEnd) - rangeStart + 1;

    while (loopCounter > 0) {
      const firstHalf = String(rangeStart).substring(
        0,
        String(rangeStart).length / 2,
      );
      const secondHalf = String(rangeStart).substring(
        String(rangeStart).length / 2,
        String(rangeStart).length,
      );

      if (firstHalf == secondHalf) {
        invalidId += rangeStart;
      }

      rangeStart += 1;
      loopCounter -= 1;
    }
  });

  console.debug("Answer Part 1: " + invalidId);
};

const idChecker2 = (ds: string) => {
  let sumValidIds = 0;

  const idArray: Array<idContainer> = parser(ds);

  //Loop each range ej 11 - 22
  idArray.forEach((element) => {
    let rangeStart = parseInt(element.rangeStart);

    let loopCounter = parseInt(element.rangeEnd) - rangeStart + 1;

    //Loop each element inside the range ej: 11, 12 ... 21, 22
    while (loopCounter > 0) {
      // largo del número 2121212121 => 10
      const lengthNumber = rangeStart.toString().length;

      // recorrer posibles sub divisiones del número
      // la cantidad de grupos que se pueden hacer del número evaluado
      // se puede obtener como los divisores sin resto
      // largo 10 => 2, 5 y 10
      // recorremos los números entre 2 hasta el largo evaluando si son
      // divisores sin resto
      for (let i: number = 2; i <= lengthNumber; i++) {
        if (lengthNumber % i === 0) {
          // al encontrar un divisor creamos una regular expression
          // usando el divisor válido
          const regex = new RegExp(`.{1,${lengthNumber / i}}`, "g");
          // creamos un array con los caracteres del número evaluado donde
          // se subdivide en la cantidad de grupos del divisor válido
          // 2121212121 => divisor 2 => [ '21212', '12121']
          // 2121212121 => divisor 5 => ['21','21','21','21','21']
          // 2121212121 => divisor 10 => [2,1,2,1,2,1,2,1,2,1]
          const arrayOfGroups = String(rangeStart).match(regex);
          // revisamos si es que todos los elementos dentro del array son iguales
          if (arrayOfGroups?.every((element) => element === arrayOfGroups[0])) {
            // sumamos al número que suma todos los id y rompemos el loop para
            // no evaluar otros arrays de subgrupo que también sean válidos
            // eg: 222222 es válido 3 veces
            // ['22','22','22'] es válido
            // ['2','2','2''2','2','2'] es válido
            // ['222', '222'] es válido
            // estos 3 son válido pero solo debo contar 1 vez
            console.debug(rangeStart + " Es válido");
            sumValidIds += rangeStart;
            break;
          }
        }
      }
      rangeStart += 1;
      loopCounter -= 1;
    }
  });
  console.debug("Respuesta: " + sumValidIds);
};

//Solution for first part
//idChecker1(ds);

//idChecker1(dsExample);
idChecker2(ds);

// const iterations = 5

// for (let i = 0; i < iterations; i++) {
//     console.debug(`Loop number: ${i + 1}`)
// }
