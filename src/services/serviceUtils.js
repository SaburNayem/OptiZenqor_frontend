export function resolveWithLatency(value, delay = 120) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), delay);
  });
}

export function rejectWithLatency(error, delay = 120) {
  return new Promise((_, reject) => {
    window.setTimeout(() => reject(error), delay);
  });
}
