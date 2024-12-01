import { describe, it, expect } from 'bun:test';
import { parse, partOne, partTwo } from '@/01/01';
import example from '@/01/example.txt';

describe('Day 1', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(11);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example))).toBe(31);
    });
  });
});
