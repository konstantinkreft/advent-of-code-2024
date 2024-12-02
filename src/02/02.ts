export function parse(input: string) {
  const rows = input.split('\n').filter(Boolean);

  return rows.map(row => row.split(' ').map(Number));
}

type Row = Array<number>;
type Mode = 'increasing' | 'decreasing';

function getMode(row: Row): Mode {
  const firstItem = row.at(0);
  const lastItem = row.at(-1);

  if (!firstItem || !lastItem) throw new Error('Items missing');

  return firstItem < lastItem ? 'increasing' : 'decreasing';
}

function removeProblem(row: Row, index: number): Row {
  const r = [...row];
  r.splice(index, 1);
  return r;
}

function testRow(
  row: Row,
  mode: Mode,
): { safe: boolean; possibleProblems: Array<number> } {
  const possibleProblems: Array<number> = [];
  const safe = row.every((value, index) => {
    if (index === 0) return true;
    const previousValue = row[index - 1] as number;

    const isValid =
      mode === 'increasing'
        ? value > previousValue && value - previousValue <= 3
        : previousValue > value && previousValue - value <= 3;

    if (!isValid) {
      possibleProblems.push(index - 1, index);
    }

    return isValid;
  });

  return { safe, possibleProblems };
}

function isRowSafe(
  row: Row,
  { mode, retry }: { mode: Mode; retry?: boolean },
): boolean {
  const { safe, possibleProblems } = testRow(row, mode);

  if (!safe && retry) {
    return possibleProblems.some(problem => {
      const modifiedRow = removeProblem(row, problem);
      const { safe } = testRow(modifiedRow, mode);
      return safe;
    });
  }

  return safe;
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, cur) => {
    if (cur.length <= 1) return acc + 1;
    const mode = getMode(cur);
    const isSafe = isRowSafe(cur, { mode });

    return acc + (isSafe ? 1 : 0);
  }, 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  return input.reduce((acc, cur) => {
    if (cur.length <= 1) return acc + 1;
    const mode = getMode(cur);
    const isSafe = isRowSafe(cur, { mode, retry: true });

    return acc + (isSafe ? 1 : 0);
  }, 0);
}
