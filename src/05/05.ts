import { getMiddleItemFromArray, moveElement } from '@/utils';

export function parse(input: string) {
  const [rulesString, updatesString] = input.split('\n\n') as [string, string];

  const rules = rulesString
    ?.split('\n')
    .filter(Boolean)
    .reduce<{ [key: number]: Array<number> }>((acc, cur) => {
      const [key, value] = cur.split('|') as [string, string];
      acc[Number(key)] = [...(acc[Number(key)] ?? []), Number(value)];
      return acc;
    }, {});

  const updates = updatesString
    ?.split('\n')
    .filter(Boolean)
    .map(update => {
      return update.split(',').map(Number);
    });

  return { rules, updates };
}

type Rules = {
  [key: number]: number[];
};

type Update = Array<number>;

function isUpdateValid(update: Update, rules: Rules) {
  return update.every((item, index) => {
    const itemsBefore = update.slice(0, index);
    const { itemIsValid } = isItemValid(item, itemsBefore, rules);

    return itemIsValid;
  });
}

function isItemValid(
  item: number,
  itemsBefore: Update,
  rules: Rules,
): { itemIsValid: true } | { itemIsValid: false; validIndex: number } {
  let currentValidIndex: number = itemsBefore.length;
  const itemIsValid = !itemsBefore.some((v, i) => {
    const invalid = rules[item]?.includes(v) ?? false;

    if (invalid && i < currentValidIndex) {
      currentValidIndex = i;
    }

    return invalid;
  });

  return itemIsValid
    ? { itemIsValid: true }
    : { itemIsValid: false, validIndex: currentValidIndex };
}

export function partOne(input: ReturnType<typeof parse>) {
  const { rules, updates } = input;

  return updates.reduce((acc, cur) => {
    const isValid = isUpdateValid(cur, rules);

    if (isValid) {
      return acc + getMiddleItemFromArray(cur);
    }

    return acc;
  }, 0);
}

export function partTwo(input: ReturnType<typeof parse>) {
  const { rules, updates } = input;

  return updates.reduce((acc, cur) => {
    const isValid = isUpdateValid(cur, rules);

    if (!isValid) {
      const fixedUpdate = cur.reduce<Update>((acc, item, index) => {
        const result = isItemValid(item, acc.slice(0, index), rules);

        if (!result.itemIsValid) {
          return moveElement(acc, index, result.validIndex);
        }

        return acc;
      }, cur);

      return acc + getMiddleItemFromArray(fixedUpdate);
    }

    return acc;
  }, 0);
}
