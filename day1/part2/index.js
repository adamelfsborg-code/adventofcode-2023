const fs = require('fs')

async function main() {
    const calibrations = await inputReader()
    const calibrationsLength = calibrations.length;
    const correctedCalibirationValues = [];
    const textDidgets = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const textDidgetsLength = textDidgets.length;

    for (let calibration = 0; calibration < calibrationsLength; calibration++) {
        const value = calibrations[calibration];
        const valueLength = value.length;

        let firstValue = -1
        let lastValue = -1

        let firstValuePos = -1
        let lastValuePos = -1

        // Search first string didget
        for (let did = 0; did < textDidgetsLength; did++) {
            const didget = value.indexOf(textDidgets[did])

            if ((firstValuePos === -1 && didget > -1) || (didget < firstValuePos && didget > -1)) {
                firstValue = did
                firstValuePos = didget
            }
        }

        // Search last string didget
        for (let did = 0; did < textDidgetsLength; did++) {
            const didget = value.lastIndexOf(textDidgets[did])

            if (didget > lastValuePos) {
                lastValue = did
                lastValuePos = didget
            }
        }

        // Search first number
        for (let char = 0; char < valueLength; char++) {
            if (!isNumeric(value[char])) continue
            if ((char > firstValuePos) && firstValuePos > -1) continue
            
            firstValue = value[char]
            break
        }
        
        // Search last number
        for (let char = valueLength; char >= 0; char--) {
            if (!isNumeric(value[char])) continue
            if (char < lastValuePos) continue
            
            lastValue = value[char]
            break
        }
        
        // Combine first and last number
        const combinedCombinationCode = `${firstValue}${lastValue}`
        correctedCalibirationValues.push(combinedCombinationCode)
    }

    // Calc total
    const answer = correctedCalibirationValues.reduce((prev, cur) => Number(prev) + Number(cur), 0)
    console.log('Answer: ', answer)
}

const inputReader = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('calibration-document.txt', (err, inputD) => {
            if (err) return reject(err);
            resolve(inputD.toString().split('\n'))
        })
    })
}

const isNumeric = (str) => {
    return /^\d+$/.test(str);
}

main()
