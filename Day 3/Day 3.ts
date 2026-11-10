import * as fs from "fs";

//read file
let ds = "";

try {
  ds = fs.readFileSync("Day 3/ds.txt", "utf8");
} catch (error) {
  console.error(error);
}

const dsTest = `987654321111111
811111111111119
234234234234278
818181911112111`;

const dsArray = ds.split("\r\n");
const dsArrayTest = dsTest.split("\n");

let highestJoltage = 0;

console.debug(dsArrayTest);

//Loop banks
const highestJoltageFinder = () => {
  //debugger;
  dsArrayTest.forEach((row) => {
    console.debug("Row: " + row);
    let firstBattery = { firstBattery: 0, indexFirstBattery: -1 };
    let secondBattery = 0;
    //Loop each battery
    row.split("").forEach((rowChar, index) => {
      if (
        Number(rowChar) > firstBattery.firstBattery &&
        index < firstBattery.indexFirstBattery
      ) {
        firstBattery = Number(rowChar);
      } else {
        if (Number(rowChar) > secondBattery) {
          secondBattery = Number(rowChar);
        }
      }
    });
    console.debug("First battery: " + firstBattery);
    console.debug("Second battery: " + secondBattery);
    highestJoltage += Number(
      firstBattery.toString() + secondBattery.toString(),
    );
    console.debug(
      "Whats being added: " +
        Number(firstBattery.toString() + secondBattery.toString()),
    );
    firstBattery = 0;
    secondBattery = 0;
  });

  console.debug(highestJoltage);
};

highestJoltageFinder();
