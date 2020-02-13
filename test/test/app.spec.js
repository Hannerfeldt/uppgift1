const expect = require('chai').expect;
const { getFileContents, calcBMI } = require("../src/app");

describe('BMI calculation app test', () => {

    describe('Function getFileContents returns file contents', () => {

        it('Should return a string', () => {
            expect(getFileContents()).to.eql('')
        })
        it('Should read contents of file and return as string', () => {

            const dataFilePath = 'test/data/bmi_input'

            const fileContents = getFileContents(dataFilePath)

            expect(fileContents).to.eql('1.85,75')
        })
    })

    describe('Function calcBMI to return a number',()=>{
        
        it('Should calculate BMI',(fileContents)=>{
            
        
            const bmi = calcBMI(fileContents)

            expect(bmi).to.eql(21.913805697589478)
        })
    
    })

    describe('Function presentBMI', ()=>{
        
        it('Should take BMI and return a sentence', ()=>{



        })

    })

})

