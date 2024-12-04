import { describe, it, expect } from 'bun:test';
import { parse, partOne, partTwo } from '@/03/03';
import example from '@/03/example.txt';
import example2 from '@/03/example2.txt';

describe('Day 3', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(161);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example2))).toBe(48);
    });
  });
});
