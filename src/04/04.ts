export function parse(input: string): Map {
  return input
    .split('\n')
    .filter(Boolean)
    .map(row => row.split('').filter(Boolean));
}

type Map = Array<Array<string>>;
type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

function isValidXMASString({
  direction,
  rowIndex,
  charIndex,
  map,
}: {
  map: Map;
  rowIndex: number;
  charIndex: number;
  direction: Direction;
}) {
  switch (direction) {
    case 'N':
      return (
        map[rowIndex - 1]?.[charIndex] === 'A' &&
        map[rowIndex - 2]?.[charIndex] === 'S'
      );
    case 'NE':
      return (
        map[rowIndex - 1]?.[charIndex + 1] === 'A' &&
        map[rowIndex - 2]?.[charIndex + 2] === 'S'
      );
    case 'E':
      return (
        map[rowIndex]?.[charIndex + 1] === 'A' &&
        map[rowIndex]?.[charIndex + 2] === 'S'
      );
    case 'SE':
      return (
        map[rowIndex + 1]?.[charIndex + 1] === 'A' &&
        map[rowIndex + 2]?.[charIndex + 2] === 'S'
      );
    case 'S':
      return (
        map[rowIndex + 1]?.[charIndex] === 'A' &&
        map[rowIndex + 2]?.[charIndex] === 'S'
      );
    case 'SW':
      return (
        map[rowIndex + 1]?.[charIndex - 1] === 'A' &&
        map[rowIndex + 2]?.[charIndex - 2] === 'S'
      );
    case 'W':
      return (
        map[rowIndex]?.[charIndex - 1] === 'A' &&
        map[rowIndex]?.[charIndex - 2] === 'S'
      );
    case 'NW':
      return (
        map[rowIndex - 1]?.[charIndex - 1] === 'A' &&
        map[rowIndex - 2]?.[charIndex - 2] === 'S'
      );
  }
}

function findXMAS({
  map,
  rowIndex,
  charIndex,
}: {
  map: Map;
  rowIndex: number;
  charIndex: number;
}) {
  const findings: Array<{
    rowIndex: number;
    charIndex: number;
    direction: Direction;
  }> = [];

  if (map[rowIndex - 1]?.[charIndex] === 'M') {
    // north
    findings.push({ rowIndex: rowIndex - 1, charIndex, direction: 'N' });
  }
  if (map[rowIndex - 1]?.[charIndex + 1] === 'M') {
    // northeast
    findings.push({
      rowIndex: rowIndex - 1,
      charIndex: charIndex + 1,
      direction: 'NE',
    });
  }
  if (map[rowIndex]?.[charIndex + 1] === 'M') {
    // east
    findings.push({
      rowIndex,
      charIndex: charIndex + 1,
      direction: 'E',
    });
  }
  if (map[rowIndex + 1]?.[charIndex + 1] === 'M') {
    // southeast
    findings.push({
      rowIndex: rowIndex + 1,
      charIndex: charIndex + 1,
      direction: 'SE',
    });
  }
  if (map[rowIndex + 1]?.[charIndex] === 'M') {
    // south
    findings.push({
      rowIndex: rowIndex + 1,
      charIndex: charIndex,
      direction: 'S',
    });
  }
  if (map[rowIndex + 1]?.[charIndex - 1] === 'M') {
    // southwest
    findings.push({
      rowIndex: rowIndex + 1,
      charIndex: charIndex - 1,
      direction: 'SW',
    });
  }
  if (map[rowIndex]?.[charIndex - 1] === 'M') {
    // west
    findings.push({
      rowIndex: rowIndex,
      charIndex: charIndex - 1,
      direction: 'W',
    });
  }
  if (map[rowIndex - 1]?.[charIndex - 1] === 'M') {
    // northwest
    findings.push({
      rowIndex: rowIndex - 1,
      charIndex: charIndex - 1,
      direction: 'NW',
    });
  }

  return findings.reduce((acc, { charIndex, rowIndex, direction }) => {
    return (
      acc + (isValidXMASString({ map, charIndex, rowIndex, direction }) ? 1 : 0)
    );
  }, 0);
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, row, rowIndex) => {
    return (
      acc +
      row.reduce((acc, char, charIndex) => {
        if (char === 'X') {
          return (
            acc +
            findXMAS({
              charIndex,
              rowIndex,
              map: input,
            })
          );
        }

        return acc;
      }, 0)
    );
  }, 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  return input.reduce((acc, row, rowIndex) => {
    return (
      acc +
      row.reduce((acc, char, charIndex) => {
        if (char === 'A') {
          if (
            ((input[rowIndex - 1]?.[charIndex - 1] === 'M' &&
              input[rowIndex + 1]?.[charIndex + 1] === 'S') ||
              (input[rowIndex - 1]?.[charIndex - 1] === 'S' &&
                input[rowIndex + 1]?.[charIndex + 1] === 'M')) &&
            ((input[rowIndex + 1]?.[charIndex - 1] === 'M' &&
              input[rowIndex - 1]?.[charIndex + 1] === 'S') ||
              (input[rowIndex + 1]?.[charIndex - 1] === 'S' &&
                input[rowIndex - 1]?.[charIndex + 1] === 'M'))
          ) {
            return acc + 1;
          }
        }

        return acc;
      }, 0)
    );
  }, 0);
}
