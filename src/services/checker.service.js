const checkDna = (dna) => {
    const n = dna.length;
  
    if (!dna.every((row) => row.length === n)) {
      throw new Error("La matriz de ADN no es cuadrada");
    }
  
    const validLetters = new Set(["A", "T", "C", "G"]);
    if (!dna.every((row) => row.split("").every(letter => validLetters.has(letter)))) {
      throw new Error("Letra inválida en la matriz de ADN");
    }
  
    function isValidPosition(i, j) {
      return i >= 0 && i < n && j >= 0 && j < n;
    }
  
    function checkSequence(direction) {
      const [dx, dy] = direction;
  
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const currentLetter = dna[i][j];
  
          if (isValidPosition(i + 3 * dx, j + 3 * dy)) {
            const sequence = [0, 1, 2, 3].map(k => dna[i + k * dx][j + k * dy]);
  
            if (sequence.every(letter => letter === currentLetter)) {
              return true;
            }
          }
        }
      }
  
      return false;
    }
  
    const directions = [
      [0, 1], 
      [1, 0], 
      [1, 1],
      [-1, 1] 
    ];
  
    for (const direction of directions) {
      if (checkSequence(direction)) {
        return true;
      }
    }
  
    return false;
  }

  module.exports = checkDna;