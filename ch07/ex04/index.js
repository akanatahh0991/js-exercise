const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

const totalOfMathScore = data.reduce((accumulator, row) => accumulator + row.math, 0);
console.log(totalOfMathScore); // 1. 530
const classAData = data.filter((row) => row.class === "A");
const averageOfClassAChemistryScore = classAData.reduce((accumulator, row) => accumulator + row.chemistry, 0) / classAData.length;
console.log(averageOfClassAChemistryScore); // 2. 45
const classCData = data.filter((row) => row.class === "C");
const averageOfClassCTotalScore = classCData.reduce((accumulator, row) => accumulator + row.math + row.chemistry + row.geography, 0) / classCData.length;
console.log(averageOfClassCTotalScore); // 3. 176.666666666666
const topScoreSortedData = data.map((row) => {
  return {
    name: row.name, 
    totalScore: row.math + row.chemistry + row.geography
  }
}).sort((a, b) => b.totalScore - a.totalScore)
// 2人以上同率点数がいることを想定した実装
const topTotalScore = topScoreSortedData[0].totalScore;
const topTotalScorePersonNames = topScoreSortedData.filter((row) => row.totalScore === topTotalScore).map((row) => row.name);
console.log(topTotalScorePersonNames.join()); // 4. Frank

const averageOfGeographyScore = data.reduce((accumulator, row) => accumulator + row.geography, 0) / data.length;
const standardDeviationOfGeographyScore = Math.sqrt(data.reduce((accumulator, row) => accumulator + (row.geography - averageOfGeographyScore) ** 2, 0) / data.length)
console.log(standardDeviationOfGeographyScore) // 5. 22.3330569358242