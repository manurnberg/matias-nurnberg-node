const DIRECTIONS = [
  [0, 1], 
  [1, 0], 
  [1, 1],
  [-1, 1] 
];

const checkDna = (dna) => {
    const n = dna.length;
    let result = {};
    
     if (!validateMatrixDimensions(dna, n)) {
      return { error: "Matrix isn't right" };
  }

  if (!validateMatrixCharacters(dna)) {
      return { error: "Invalid character on Matrix" };
  }
  
    for (const direction of DIRECTIONS) {
      if (checkSequence(direction, dna, n)) {
        console.info('Mutation sequence detected.');
        return true;
      }
    }
    console.info('No mutation sequence detected.');
    return false;
  }


const validateMatrixDimensions = (dna, n) => {
  return dna.every((row) => row.length === n);
};


const validateMatrixCharacters = (dna) => {
  const validLetters = new Set(["A", "T", "C", "G"]);
  return dna.every((row) => row.split("").every(letter => validLetters.has(letter)));
};

const isValidPosition = (i, j, n) => i >= 0 && i < n && j >= 0 && j < n;

function checkSequence(direction, dna, n) {
  const [dx, dy] = direction;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const currentLetter = dna[i][j];

      if (isValidPosition(i + 3 * dx, j + 3 * dy, n)) {
        const sequence = [0, 1, 2, 3].map(k => dna[i + k * dx][j + k * dy]);

        if (sequence.every(letter => letter === currentLetter)) {
          return true;
        }
      }
    }
  }

  return false;
}

  module.exports = checkDna;