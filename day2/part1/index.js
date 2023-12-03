const fs = require('fs')

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

async function main() {
    const games = await inputReader();
    const gamesLength = games.length;

    const possibleGames = []

    games: for (let index = 0; index < gamesLength; index++) {
        const game = games[index];

        const gameID = Number(game.substring(0, game.indexOf(":")).split(' ')[1]);
        const cubes = game.substring(game.indexOf(":") + 1, game.length).trim();


        const bags = cubes.split(';')
        const bagsLength = bags.length;

        for (let bi = 0; bi < bagsLength; bi++) {
            const colors = bags[bi].split(',');
            const colorsLength = colors.length;
            
            let totalRed = 0;
            let totalGreen = 0;
            let totalBlue = 0;
            
            for (let ci = 0; ci < colorsLength; ci++) {
                const hand = colors[ci].trim();
                
         
                const [amout, color] = hand.split(' ')
        
                if (color === 'red') totalRed += Number(amout)
                if (color === 'green') totalGreen += Number(amout)
                if (color === 'blue') totalBlue += Number(amout)   
            }

            if (totalRed > MAX_RED_CUBES || totalGreen > MAX_GREEN_CUBES || totalBlue > MAX_BLUE_CUBES) {
                continue games
            } 
        }

        possibleGames.push(gameID)
        continue games
    

    }

    const answer = possibleGames.reduce((prev, cur) => Number(prev) + Number(cur), 0)
    console.log('Answer: ', answer)
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