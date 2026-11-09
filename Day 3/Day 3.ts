import * as fs from "fs";

//read file
let ds = "";

try {
  ds = fs.readFileSync("Day 3/ds.txt", "utf8");
} catch (error) {
  console.error(error);
}

const dsArray = ds.split("\r\n");

//Loop banks
dsArray.forEach((element) => {
  let highestJoltage = 0;
  //Loop each battery
  element.split("").forEach((element) => {
    if (Number(element) > highestJoltage) {
      highestJoltage = Number(element);
    }
  });
});
