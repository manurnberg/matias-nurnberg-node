const checkDna = require('../src/services/checker.service');

  test('should return true for a matrix with mutation', () => {
    const dnaWithMutation = [
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGAAGG',
      'CCCCAA',
      'TCACTG',
    ];

    expect(checkDna(dnaWithMutation)).toBe(true);
  });

  test('should return false for a matrix without mutation', () => {
    const dnaWithoutMutation = [
        "ATGCGA",
        "CTGTGC",
        "TTATGT",
        "AGAACG",
        "CCCTTA",
        "TCACTG"
    ];

    expect(checkDna(dnaWithoutMutation)).toBe(false);
  });

