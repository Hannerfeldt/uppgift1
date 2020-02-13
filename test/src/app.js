const fs = require('fs')

function getFileContents(path) {
    if (!path) return ''
    const content = fs.readFileSync(path).toString()

    return content

}


function calcBMI(dataString) {
    console.log(dataString)
    const dataArray = dataString.split(",")

    const weight = Number(dataArray[1])
    const length = Number(dataArray[0])

    const bmi = weight / (length ** 2)

    return bmi
}


module.exports = { getFileContents, calcBMI }

