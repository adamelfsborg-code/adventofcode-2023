const fs = require('fs')

const partnumbers = []

async function main() {
    const schematic = await inputReader();
    const schematicLength = schematic.length;
    const gears = []

    // Find gears
    for (let rowIndex = 0; rowIndex < schematicLength; rowIndex++) {
        const row = schematic[rowIndex];
        const rowLength = row.length;
        for (let colIndex = 0; colIndex < rowLength; colIndex++) {
            const col = row[colIndex]
            if (col !== '*') continue
            
            gears.push({
                row: rowIndex,
                col: colIndex
            })
        }
    }

    // Find two part number positions
    const gearsLength = gears.length;
    for (let index = 0; index < gearsLength; index++) {
        const {row, col} = gears[index];
        let matchesCount = 0

        const nums = []
        
        // Check top center
        let match = isPartNumber(schematic, (row - 1), col)
        if (!match) {
            // Check top left
            const topLeft = isPartNumber(schematic, (row - 1), (col - 1))
            if (topLeft) {
                nums.push([(row - 1), (col - 1)])
                matchesCount += 1
            }
            // Check top right
            const topRight = isPartNumber(schematic, (row - 1), (col + 1))
            if (topRight) {
                nums.push([(row - 1), (col + 1)])
                matchesCount += 1
            }
        } else {
            nums.push([row - 1, col])
            matchesCount += 1
        }

        // Check center left
        match = isPartNumber(schematic, row, (col - 1))
        if (match) {
            nums.push([row, (col - 1)])
            matchesCount += 1
        }
        // Check center right
        match = isPartNumber(schematic, row, (col + 1))
        if (match) {
            nums.push([row, (col + 1)])
            matchesCount += 1
        }

        // Check bottom center
        match = isPartNumber(schematic, (row + 1), col)
        if (!match) {
            // Check bottom left
            const topLeft = isPartNumber(schematic, (row + 1), (col - 1))
            if (topLeft) {
                nums.push([(row + 1), (col - 1)])
                matchesCount += 1
            }
            // Check bottom right
            const topRight = isPartNumber(schematic, (row + 1), (col + 1))
            if (topRight) {
                nums.push([(row + 1), (col + 1)])
                matchesCount += 1
            }
        } else {
            nums.push([(row + 1), col])
            matchesCount += 1
        }

        if (matchesCount !== 2) continue

        const g = []
        const partnumbersLength = nums.length;
        for (let i = 0; i < partnumbersLength; i++) {
            const n = nums[i]
            const partnumber = getNumberAndNeighbors(schematic, n[0], n[1])
            g.push(partnumber)
        }

        partnumbers.push(g.reduce((prev, cur) => Number(prev) * Number(cur)), 0)
    }

    const answer = partnumbers.reduce((prev, cur) => Number(prev) + Number(cur), 0)
    console.log('Answer', answer)
}

const isPartNumber = (arr, row, col) => {
    const sign = arr[row][col]
    if (!isNaN(sign)) return true
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