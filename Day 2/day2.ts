import { debug } from "console"
import * as fs from "fs";
import { compose } from "stream";

//read file
let ds = ''

try {
    ds = fs.readFileSync("Day 2/ds.txt", "utf8");
} catch (error) {
    console.error(error);
}

type idContainer = {
    rangeStart: string,
    rangeEnd: string
}

//example ds
const dsExample = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124'
const dsExample2 = '110-112'


//Parses the input ds into an array of objects
const parser = (arg: string) => {
    const idArray: Array<idContainer> = []
    let tempStart = ''
    let tempNumer = 0

    for (const char of arg) {
        if (char == ',') {
            idArray.push({ rangeStart: String(tempNumer), rangeEnd: tempStart })
            tempStart = '';
            tempNumer = 0
        }

        if (char == '-') {
            tempNumer = parseInt(tempStart)
            tempStart = ''
        }

        if (char != '-' && char != ',') {
            tempStart = tempStart + char
        }
    }

    if (tempStart !== '') {
        idArray.push({ rangeStart: String(tempNumer), rangeEnd: tempStart })
    }

    return idArray
}

//checks each item of the array for invalid ids
const idChecker1 = (ds: string) => {
    let invalidId = 0

    const idArray = parser(ds)

    idArray.forEach(element => {
        let rangeStart = parseInt(element.rangeStart)

        let loopCounter = parseInt(element.rangeEnd) - rangeStart + 1

        while (loopCounter > 0) {
            const firstHalf = String(rangeStart).substring(0, String(rangeStart).length / 2)
            const secondHalf = String(rangeStart).substring(String(rangeStart).length / 2, String(rangeStart).length)

            if (firstHalf == secondHalf) {
                invalidId += rangeStart
            }

            rangeStart += 1
            loopCounter -= 1
        }
    });

    console.debug('Answer Part 1: ' + invalidId)
}

const idChecker2 = (ds: string) => {
    const idArray = parser(ds)

    //Loop each range ej 11 - 22
    idArray.forEach(element => {
        //console.debug(`Element looped:  ${element.rangeStart} - ${element.rangeEnd}`)
        let rangeStart = parseInt(element.rangeStart)

        let loopCounter = parseInt(element.rangeEnd) - rangeStart + 1

        //Loop each element inside the range ej: 11, 12 ... 21, 22
        while (loopCounter > 0) {
            //console.debug(`loopCounter: ${loopCounter}`)

            //Loop the amount of times each number can bi subdivided (loops x times where x is the lenght of the number)
            // for (let i = 1; i < String(rangeStart).length; i++) {
            //     console.debug(`Times to divide ${rangeStart} over: ${i}`)

            //     const firstHalf = String(rangeStart).substring(0, (String(rangeStart).length / 2))
            //     const secondHalf = String(rangeStart).substring((String(rangeStart).length / 2), (String(rangeStart).length))
            //     console.debug(`First half: ${firstHalf}`)
            //     console.debug(`Second half: ${secondHalf}`)

            //     if (firstHalf == secondHalf) {
            //         console.debug(`MATCH: ${firstHalf} = ${secondHalf}`)
            //     }
            // }

            const rangeStartDigitArray = String(rangeStart).split("")
            console.debug(rangeStartDigitArray)

            //console.debug(`Number: ${rangeStart}`)
            rangeStart += 1
            loopCounter -= 1
        }
    })
}

//idChecker1(dsExample)
idChecker2(dsExample2)

// const iterations = 5

// for (let i = 0; i < iterations; i++) {
//     console.debug(`Loop number: ${i + 1}`)
// }