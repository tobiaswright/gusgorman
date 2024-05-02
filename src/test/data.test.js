import { expect, test } from 'vitest'
import { getItems } from '../components/Data';

let items = getItems();

test('Check item length', () => {
  expect(items.length).toBe(31)
})