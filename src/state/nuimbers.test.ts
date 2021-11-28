import {sum, getTriangleType, isSquareGreater} from "./numbers"




test("get sum of numbers", () => {
    expect(sum(1,2,3,4,5)).toBe(15)
} )

test("get triangle type", () => {
    expect(getTriangleType(1,1,1,)).toBe('10')
    expect(getTriangleType(3,3,2)).toBe('01')
    expect(getTriangleType(5,4,3)).toBe('11')
    expect(getTriangleType(10,5,5)).toBe('00')
})

test ('kvadrat ili krug', () => {
    expect(isSquareGreater(30,40)).toBe("КВАДРАТЫЧ БОЛЬШЕ")
    expect(isSquareGreater(60,40)).toBe("ДРУЖОК КРУЖОК")
})