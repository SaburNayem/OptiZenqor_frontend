export function isEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

export function validateRequired(value) {
  return value.trim().length > 0;
}

export function validateMinLength(value, minLength) {
  return value.trim().length >= minLength;
}
