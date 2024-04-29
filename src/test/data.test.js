import { expect, test } from 'vitest'
import { items } from '../components/Data.tsx'

test('Check item length', () => {
  expect(items.length).toBe(31)
})