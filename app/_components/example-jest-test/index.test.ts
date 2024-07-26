import ExampleJestTest from '.';

describe('ExampleJestTest', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(ExampleJestTest(1, 2)).toBe(3);
  });

  test('adds 5 + 7 to equal 12', () => {
    expect(ExampleJestTest(5, 7)).toBe(12);
  });
});
