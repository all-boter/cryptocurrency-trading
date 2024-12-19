import Big from 'big.js'

/**
 * 加
 * @param args
 * @returns
 */
export function plus(...args: number[]) {
  const [value, ...rest] = args
  let big = new Big(value)
  for (const item of rest) {
    big = big.plus(item)
  }
  return Number(big.toPrecision())
}

/**
 * 减
 * @param value
 * @param args
 * @returns
 */
export function minus(value: number, ...args: number[]) {
  let big = new Big(value)
  for (const item of args) {
    big = big.minus(item)
  }
  return Number(big.toPrecision())
}

/**
 * 乘
 * @param value
 * @param args
 * @returns
 */
export function times(value: number, ...args: number[]) {
  let big = new Big(value)
  for (const item of args) {
    big = big.times(item)
  }
  return Number(big.toPrecision())
}

/**
 * 除
 * @param value
 * @param args
 * @returns
 */
export function divide(value: number, ...args: number[]) {
  let big = new Big(value)
  for (const item of args) {
    big = big.div(item)
  }
  return Number(big.toPrecision())
}

export function calculateGain(prevValue: number, curValue: number): number {
  const gain = divide(curValue - prevValue, prevValue) * 100

  return parseFloat(gain.toFixed(2));
}