const input = await Deno.readTextFile("./input.txt")

const OPPONENT_CHOICES = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
}

type OpponentKeys = keyof typeof OPPONENT_CHOICES
type OpponentValues = typeof OPPONENT_CHOICES[OpponentKeys]

const MY_CHOICES = {
  ROCK: "X",
  PAPER: "Y",
  SCISSORS: "Z",
}

type MyKeys = keyof typeof MY_CHOICES
type MyValues = typeof MY_CHOICES[MyKeys]

const RESULT_POINTS = {
  LOST: 0,
  DRAW: 3,
  WIN: 6,
}

function getPointByChoice(choice: MyValues) {
  switch (choice) {
    case MY_CHOICES.ROCK:
      return 1
    case MY_CHOICES.PAPER:
      return 2
    case MY_CHOICES.SCISSORS:
      return 3
  }
  return 0
}

function calculateResult(
  opponentChoice: OpponentValues,
  myChoice: MyValues
): number {
  if (opponentChoice === OPPONENT_CHOICES.ROCK) {
    if (myChoice === MY_CHOICES.PAPER) return RESULT_POINTS.WIN
    else if (myChoice === MY_CHOICES.SCISSORS) return RESULT_POINTS.LOST
  }
  if (opponentChoice === OPPONENT_CHOICES.PAPER) {
    if (myChoice === MY_CHOICES.SCISSORS) return RESULT_POINTS.WIN
    else if (myChoice === MY_CHOICES.ROCK) return RESULT_POINTS.LOST
  }
  if (opponentChoice === OPPONENT_CHOICES.SCISSORS) {
    if (myChoice === MY_CHOICES.ROCK) return RESULT_POINTS.WIN
    else if (myChoice === MY_CHOICES.PAPER) return RESULT_POINTS.LOST
  }
  return RESULT_POINTS.DRAW
}

let totalPoints = 0
for (const pair of input.split("\n")) {
  const [opponentChoice, myChoice] = pair.split(" ")
  if (opponentChoice && myChoice)
    totalPoints +=
      calculateResult(opponentChoice, myChoice) + getPointByChoice(myChoice)
}

console.log(totalPoints)
