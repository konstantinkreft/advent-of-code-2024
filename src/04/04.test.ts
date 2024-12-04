import { describe, it, expect } from 'bun:test';
import { parse, partOne, partTwo } from '@/04/04';
import example from '@/04/example.txt';

describe('Day 4', () => {
  describe('Part One', () => {
    it('should solve the example', () => {
      expect(partOne(parse(example))).toBe(18);
    });
  });

  describe('Part Two', () => {
    it('should solve the example', () => {
      expect(partTwo(parse(example))).toBe(9);
    });
  });
});
