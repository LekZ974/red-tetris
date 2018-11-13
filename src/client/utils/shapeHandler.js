import {PIECES_INFO} from "../../common/pieces";

const arrayCompare = (a1, a2) => {
  if(a1.length !== a2.length) {
    return false;
  }
  for(let i in a1) {
    if(a1[i] instanceof Array && a2[i] instanceof Array) {
      if(!arrayCompare(a1[i], a2[i])) {
        return false;
      }
    }
    else if(a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}

const defineIdByShape = shape => shape.map(line => line.find(elem => elem > 0)).find(id => id);

const defineRotationByShape = shape =>
  PIECES_INFO.map(p => p.map((m, index) => {
    if (arrayCompare(m.piece, shape)) {
      return index
    }
    return;
  }
).find(rot => rot !== undefined)).find(rot => rot !== undefined)

const shapeHandler = (shape) => {
  return {
    id: defineIdByShape(shape),
    rotate: defineRotationByShape(shape),
  }
};

export {
  shapeHandler,
  defineIdByShape,
  defineRotationByShape,
  arrayCompare,
};
