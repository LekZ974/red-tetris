const isEmpty = value => value === undefined || value === null || value === ''

export function required (value) {
  if (isEmpty(value)) {
    return 'Ce champ est requis'
  }
}

export function minLength (min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Ce champ doit contenir au moins ${min} caractères`
    }
  }
}

export const maxLength15 = maxLength(15);
export const minLength3 = minLength(3);

export function maxLength (max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Ce champ doit contenir au plus ${max} caractères`
    }
  }
}

export function doNotMatch (field) {
  return (value, data) => {
    if (data) {
      if (value === data[field]) {
        return 'Ces champs ne peuvent pas être identiques'
      }
    }
  }
}
