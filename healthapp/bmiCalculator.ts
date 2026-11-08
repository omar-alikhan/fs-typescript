type BmiRange = 'underweight' | 'normal' | 'overweight' | 'obese'

const calculateBmi = (height: number, weight: number): BmiRange => { 
    const heightInMetres = height/100;
    const bmi: number = (weight/(heightInMetres^2));  

    switch(true) { 
        case (bmi<=18.5):
            return 'underweight'
        case (bmi<=25.0):
            return 'normal'
        case (bmi<=30): 
            return 'overweight'
        case (bmi<=40 || bmi>=40):
            return 'obese'
        default: 
            throw new Error('Height and weight are not numbers!');
    }
}

console.log(calculateBmi(180, 74));