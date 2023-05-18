import 'dotenv/config'

export const __prod__ = process.env.NODE_ENV !== 'production'

export const PORT = process.env.PORT || 3000

export const COOKIE = 'wrk'

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

export function generateNumber(length: number): number {
  const nums: number[] = []

  for (let i = 0; i < length; i++) {
    nums.push(randomNumber(0, 9))
  }

  return parseInt(nums.join(''))
}
