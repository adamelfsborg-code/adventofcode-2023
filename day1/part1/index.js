const fs = require('fs')

async function main() {
    const calibrations = await inputReader();
    const calibrationsLength = calibrations.length;
    const correctedCalibirationValues = [];

    for (let calibration = 0; calibration < calibrationsLength; calibration++) {

        const value = calibrations[calibration];
        const valueLength = value.length;

        let firstValue = -1
        let lastValue = -1

        for (let char = 0; char < valueLength; char++) {
            if (isNumeric(value[char])) {
                firstValue = value[char]
                break
            }
        }
        
        for (let char = valueLength; char >= 0; char--) {
            if (isNumeric(value[char])) {
                lastValue = value[char]
                break
            }

        }

        const combinedCombinationCode = `${firstValue}${lastValue}`
        correctedCalibirationValues.push(combinedCombinationCode)
    }

    const sum = correctedCalibirationValues.reduce((prev, cur) => Number(prev) + Number(cur), 0)
    console.log(sum)
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