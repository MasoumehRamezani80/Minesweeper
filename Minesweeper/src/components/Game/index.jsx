import './style.css'
import React, { useState } from 'react';

function Matrix() {
  const [matrix, setMatrix] = useState(Array(8).fill(Array(8).fill('')));
  const [randomPoints, setRandomPoints] = useState([]);

  const generateRandomPoints = () => {
    const points = [];
    while (points.length < 10) {
      const row = Math.floor(Math.random() * 8);
      const col = Math.floor(Math.random() * 8);
      if (!points.some(point => point.row === row && point.col === col)) {
        points.push({ row, col });
      }
    }
    setRandomPoints(points);
    setMatrix(Array(8).fill(Array(8).fill('')));
  };

  const handleCellClick = (row, col) => {

    if (randomPoints.some(point => point.row === row && point.col === col)) {
      alert('بازی تمام شد!'); // Show game over message
      window.location.reload();
      return;
  }


    const updateMatrix = (r, c) => {
      if (r < 0 || r >= 8 || c < 0 || c >= 8 || visited.has(`${r},${c}`)) {
        return;
      }
  
      const neighborCount = countRandomPoints(r, c);
      visited.add(`${r},${c}`);
      updatedMatrix[r][c] = neighborCount;
  
      if (neighborCount === 0) {
        updateMatrix(r - 1, c);
        updateMatrix(r + 1, c);
        updateMatrix(r, c - 1);
        updateMatrix(r, c + 1);
      }
    };
  
    const visited = new Set();
    const updatedMatrix = JSON.parse(JSON.stringify(matrix));
  
    updateMatrix(row, col);
  
    // Show neighbor count on clicked cell
    const newCellValue = countRandomPoints(row, col);
    
    updatedMatrix[row][col] = newCellValue;
  
    setMatrix(updatedMatrix);
  };
  

  const countRandomPoints = (row, col) => {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (
          i >= 0 &&
          i < 10 &&
          j >= 0 &&
          j < 10 &&
          randomPoints.some(point => point.row === i && point.col === j)
        ) {
          count++;
        }
      }
    }
    return count;
  };

  return (
    <div>
      <button onClick={generateRandomPoints}>Generate Random Points</button>
      <table className='grid'>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                key={colIndex}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{
                    backgroundColor: randomPoints.some(point => point.row === rowIndex && point.col === colIndex)
                        ? '#ff9595'
                        : matrix[rowIndex][colIndex] === 0 
                            ? '#3374ff' 
                            : ''
                }}
            >
                
                {matrix[rowIndex][colIndex] !== '' ? (matrix[rowIndex][colIndex] === 0 ? ' ' : matrix[rowIndex][colIndex]) : ''}
            </td>
            
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Matrix;