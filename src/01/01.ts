export function parse(input: string) {
  const rows = input.split('\n');

  return rows.reduce<{
    firstColumn: Array<number>;
    secondColumn: Array<number>;
  }>(
    (acc, cur) => {
      const [firstString, secondString] = cur.split('   ');
      const [first, second] = [Number(firstString), Number(secondString)];

      if (!isNaN(first) && !isNaN(second)) {
        acc.firstColumn.push(first);
        acc.secondColumn.push(second);
      }

      return acc;
    },
    { firstColumn: [], secondColumn: [] },
  );
}

export function partOne(input: ReturnType<typeof parse>) {
  const { firstColumn, secondColumn } = input;
  const [sortedFirstColumn, sortedSecondColumn] = [
    firstColumn.sort(),
    secondColumn.sort(),
  ];

  return sortedFirstColumn.reduce<number>((acc, cur, idx) => {
    const curTwo = sortedSecondColumn[idx];

    if (curTwo === undefined) {
      return acc;
    }

    const distance = cur < curTwo ? curTwo - cur : cur - curTwo;

    return acc + distance;
  }, 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  const { firstColumn, secondColumn } = input;

  const occurrences = secondColumn.reduce<Record<string, number>>(
    (acc, cur) => {
      const currentValue = acc[cur] ?? 0;
      acc[cur] = currentValue + 1;

      return acc;
    },
    {},
  );

  return firstColumn.reduce((acc, cur) => {
    return acc + cur * (occurrences[cur] ?? 0);
  }, 0);
}
