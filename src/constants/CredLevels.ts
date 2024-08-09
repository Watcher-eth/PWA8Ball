const levels = [
  { level: 1, amount: 0, name: "Newbie" },
  { level: 2, amount: 50, name: "Intern" },
  { level: 3, amount: 125, name: "Novice" },
  { level: 4, amount: 225, name: "Amateur" },
  { level: 5, amount: 350, name: "Apprentice" },
  { level: 6, amount: 500, name: "Tradoor" },
  { level: 7, amount: 700, name: "Speculator" },
  { level: 8, amount: 1000, name: "Wannabe Hedgefund" },
  { level: 9, amount: 1400, name: "Hodler" },
  { level: 10, amount: 2000, name: "Cabal Leader" },
  { level: 11, amount: 2850, name: "Liquididator" },
  { level: 12, amount: 3850, name: "Guru" },
  { level: 13, amount: 4269, name: "Oracle" },
  { level: 14, amount: 5500, name: "Sage" },
  { level: 15, amount: 7000, name: "Degen" },
  { level: 16, amount: 9000, name: "Whale" },
  { level: 17, amount: 11500, name: "Grandmaster" },
  { level: 18, amount: 14000, name: "Jesus Desciple" },
  { level: 19, amount: 17000, name: "Super Predictoor" },
  { level: 20, amount: 200000, name: "GCR Wannabe" },
];

export const getLevel = (points: number) => {
  let levelObj = { level: 0, amount: 0, name: "Unknown" };
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].amount) {
      levelObj = levels[i];
      break;
    }
  }
  return levelObj;
};

export const getNextLevel = (points: number) => {
  let currentLevel = getLevel(points);
  let nextLevel = { level: 0, amount: 0, name: "Unknown" };
  let progress = 0;
  let distance = 0;

  for (let i = 0; i < levels.length; i++) {
    if (levels[i].amount > points) {
      nextLevel = levels[i];
      distance = levels[i].amount - points;
      progress =
        ((points - currentLevel.amount) /
          (levels[i].amount - currentLevel.amount)) *
        100;
      break;
    }
  }

  return {
    nextLevel,
    distance,
    progress: progress.toFixed(2),
  };
};
