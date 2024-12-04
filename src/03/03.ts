export function parse(input: string) {
  return input;
}

export function partOne(input: ReturnType<typeof parse>) {
  return Array.from(
    input.matchAll(/mul\((\d+),(\d+)\)/g),
    (match): [number, number] => {
      const [first, second] = [Number(match[1]), Number(match[2])];

      if (isNaN(first) || isNaN(second)) {
        throw new Error('should be number but found NaN');
      }

      return [first, second];
    },
  ).reduce((acc, cur) => acc + cur[0] * cur[1], 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  let enabled = true;
  return Array.from(
    input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g),
    (match): [number, number] | 'do()' | "don't()" => {
      if (match[0] === 'do()' || match[0] === "don't()") {
        return match[0];
      }
      const [first, second] = [Number(match[1]), Number(match[2])];

      if (isNaN(first) || isNaN(second)) {
        throw new Error('should be number but found NaN');
      }

      return [first, second];
    },
  ).reduce((acc, cur) => {
    switch (cur) {
      case 'do()':
        enabled = true;
        return acc;
      case "don't()":
        enabled = false;
        return acc;
      default:
        return enabled ? acc + cur[0] * cur[1] : acc;
    }
  }, 0);
}
