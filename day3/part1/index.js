const fs = require('fs')

const partnumberPositions = []
const partnumbers = []

async function main() {
    const schematic = await inputReader();
    const schematicLength = schematic.length;
    const symbols = []

    // Find symbols
    for (let rowIndex = 0; rowIndex < schematicLength; rowIndex++) {
        const row = schematic[rowIndex];
        const rowLength = row.length;
        for (let colIndex = 0; colIndex < rowLength; colIndex++) {
            const col = row[colIndex]

            if (isNaN(col) && col !== '.') {
                symbols.push({
                    row: rowIndex,
                    col: colIndex
                })

            }
        }
    }

    // Find part number positions
    const symbolsLength = symbols.length;
    for (let index = 0; index < symbolsLength; index++) {
        const {row, col} = symbols[index];
        
        // Check top center
        let topMatch = addPartnumberPos(schematic, (row - 1), col)
        if (!topMatch) {
            // Check top left 
            addPartnumberPos(schematic, (row - 1), (col - 1))
            // Check top right
            addPartnumberPos(schematic, (row - 1), (col + 1))
        }

        // Check center left
        addPartnumberPos(schematic, row, (col - 1))
        // Check center right
        addPartnumberPos(schematic, row, (col + 1))

        // Check bottom center
        let bottomMatch = addPartnumberPos(schematic, (row + 1), col)
        if (!bottomMatch) {
            // Check bottom left
            addPartnumberPos(schematic, (row + 1), (col - 1))
            // Check bottom right
            addPartnumberPos(schematic, (row + 1), (col + 1))
        }
    }

    const partnumberPositionsLength = partnumberPositions.length;
    for (let index = 0; index < partnumberPositionsLength; index++) {
        const { row, col } = partnumberPositions[index];
        const partNumber = getNumberAndNeighbors(schematic, row, col)
        partnumbers.push(partNumber)
    }

    const answer = partnumbers.reduce((prev, cur) => Number(prev) + Number(cur), 0)
    console.log('Answer', answer)
}

const addPartnumberPos = (arr, row, col) => {
    sign = arr[row][col]

    if (!isNaN(sign)) {
        partnumberPositions.push({
            row: row,
            col: col
        })
        return true
    }
    return false
}

function getNumberAndNeighbors(grid, row, col) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Check if the given position is valid
    if (0 <= row && row < rows && 0 <= col && col < cols) {
        const rightNeighbors = [];
        const leftNeighbors = []

        // Go right
        for (let j = col + 1; j <= cols; j++) {
            if (isNaN(grid[row][j])) break
            rightNeighbors.push(grid[row][j]);
        }

        // Go left
        for (let j = col - 1; j >= 0; j--) {
            if (isNaN(grid[row][j])) break
            leftNeighbors.push(grid[row][j]);
        }
        return leftNeighbors.reverse().concat(...grid[row][col], ...rightNeighbors).join('')
    } else {
        return null
   }
}

const inputReader = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('example.txt', (err, inputD) => {
            if (err) return reject(err);
            resolve(inputD.toString().split('\n'))
        })
    })
}

main()