export function getMiddleItemFromArray<T>(array: Array<T>): T {
  return array[Math.floor(array.length / 2)] as T;
}

export function moveElement<T>(array: Array<T>, from: number, to: number) {
  const _array = [...array];
  const element = _array[from] as T;
  _array.splice(from, 1);
  _array.splice(to, 0, element);
  return _array;
}
