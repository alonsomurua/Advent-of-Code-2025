import { debug } from "console"
import * as fs from "fs";

let ds = ''

try {
    ds = fs.readFileSync("Day 2/ds.txt", "utf8");
} catch (error) {
    console.error(error);
}

const idExample = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124'

type idContainer = {
    rangeStart: string,
    rangeEnd: string
}

const idArray: Array<idContainer> = []

//Parses the input ds into an array of objects
const parser = (arg: string) => {

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
}

//checks each item of the array for invalid ids
const idChecker1 = (ds: string) => {
    let invalidId = 0

    parser(ds)

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
    parser(ds)
}

idChecker1(ds)