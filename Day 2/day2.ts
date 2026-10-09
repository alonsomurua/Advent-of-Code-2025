const idsRaw = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124'
type idContainer = {
    rangeStart: number,
    rangeEnd: number
}

//const ids:idContainer = {rangeEnd}
const idArray: Array<idContainer> = []

const parse = (arg: string) => {
    for (const char of arg) {
        console.debug(char)
        if (char == '-') {
            const newIdRange: idContainer = { rangeStart: 0, rangeEnd: 0 }
            // newIdRange.rangeStart = ''
            // idArray.push(newIdRange)
        }
    }
}

parse(idsRaw)