const fs = require('fs')


async function main() {
    const games = await inputReader()
    const gamesLength = games.length;

    const winningCards = []

    for (let index = 0; index < gamesLength; index++) {
        const game = games[index].split(':')[1]
        
        const [winingStr, handStr] = game.split('|')

        const winningNumbers = winingStr.split(' ')
        const hand = handStr.split(' ')

        const match = winningNumbers.filter((num) => num !== '' && hand.includes(num.trim()))
        
        if (match.length === 0) continue

        const points = calcPoints(match.length)
        winningCards.push(points)
    }

    const answer = winningCards.reduce((prev, cur) => Number(prev) + Number(cur), 0)
    console.log('Answer', answer)

}

const calcPoints = (numbers) => {
    if (numbers <= 0) return 0
    return 1 << (numbers - 1)
} 

const inputReader = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('input.txt', (err, inputD) => {
            if (err) return reject(err);
            resolve(inputD.toString().split('\n'))
        })
    })
}

main()