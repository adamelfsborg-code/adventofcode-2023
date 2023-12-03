const fs = require('fs')

async function main() {
    const games = await inputReader();
    const gamesLength = games.length;

    const powers = []

    for (let index = 0; index < gamesLength; index++) {
        const game = games[index];

        const cubes = game.substring(game.indexOf(":") + 1, game.length).trim();

        const hands = cubes.replaceAll(';', ',').split(',')
        const handsLength = hands.length;
    
        let highestRed = 0;
        let highestGreen = 0;
        let highestBlue = 0;

        for (let bi = 0; bi < handsLength; bi++) {
            const hand = hands[bi].trim();

            const [amout, color] = hand.split(' ')
    
            if (color === 'red') highestRed = Number(amout) > highestRed ? Number(amout) : highestRed
            if (color === 'green') highestGreen = Number(amout) > highestGreen ? Number(amout) : highestGreen
            if (color === 'blue') highestBlue = Number(amout) > highestBlue ? Number(amout) : highestBlue
        }

        powers.push(highestRed * highestGreen * highestBlue)
    }

    const sum = powers.reduce((prev, cur) => Number(prev) + Number(cur), 0)
    console.log(sum)
}

const inputReader = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('games.txt', (err, inputD) => {
            if (err) return reject(err);
            resolve(inputD.toString().split('\n'))
        })
    })
}


main()