export function sum(...numbers: Array<number>) {
    return numbers.reduce((acc, el) => acc + el)
}

export function getTriangleType(a: number, b: number, c: number) {
    if (a + b > c && a + c > b && b + c > a) {
        if (a == b && a == c && b == c) {
            return "10"
        } else {
            if (a == b || a == c || b == c ) {
                return "01"
            } else {
                if (a > b && a > c) {
                    return "11"
                }
            }
        }
    } else return '00'
}

export function isSquareGreater (a:number, b:number) {
    let pi = 3.14
    let radius = Math.sqrt(a/pi)
    let kvadrat = Math.sqrt(b)/2
    if (kvadrat >= radius) {
        return "КВАДРАТЫЧ БОЛЬШЕ"
    } else {
        return "ДРУЖОК КРУЖОК"
    }
}

function isEvenSumGreater(a:Array<number>) {
    let EvenSum = a.reduce((accum, current, index) => {
        return index%2===0 ? accum + current: accum
    })
    let OddSum = a.reduce((accum, current, index) => {
        return index%2 !== 0 ? accum+current: accum
    })
    return EvenSum > OddSum
}



export function getNumber(numb:number) {
    numb = 555;
    numb.toString()
}