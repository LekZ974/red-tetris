import 'jest-matcher-one-of'
import Piece from '../../../src/server/controllers/piece'

test('getShape', () => {
    const shape = [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]
    const piece = new Piece(shape)
    
    expect(piece.getShape()).toMatchSnapshot()
})

test('rotate', () => {
    const shape = [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]
    const piece = new Piece(shape)
    
    expect(piece.rotate(180)).toMatchSnapshot()
})

test('class retains original shape', () => {
    const shape = [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]
    const originalShape = [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]
    const piece = new Piece(shape)
    piece.rotate(180)
    
    expect(piece.getShape()).toEqual(originalShape)
})

test('randRotation', () => {
    const rotationOptions = [0, 90, 180, 270] 
    const shape = [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]
    const piece = new Piece(shape)

    expect(piece.randRotation()).toBeOneOf(rotationOptions)
})
