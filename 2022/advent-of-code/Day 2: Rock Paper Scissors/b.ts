const input = await Deno.readTextFile("./input.txt")

const OPPONENT_CHOICES = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
}

const MY_CHOICES = {
  ROCK: OPPONENT_CHOICES.ROCK,
  PAPER: OPPONENT_CHOICES.PAPER,
  SCISSORS: OPPONENT_CHOICES.SCISSORS,
}

const RESULT = {
  LOSS: "X",
  DRAW: "Y",
  WIN: "Z",
}

const RESULT_POINTS = {
  LOST: 0,
  DRAW: 3,
  WIN: 6,
}

function getPointByChoice(choice: string) {
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

function calculateResult(opponentChoice: string, myChoice: string): number {
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

function getMyChoice(opponentChoice: string, result: string): string {
  if (result === RESULT.WIN) {
    if (opponentChoice === OPPONENT_CHOICES.ROCK) return MY_CHOICES.PAPER
    else if (opponentChoice === OPPONENT_CHOICES.PAPER)
      return MY_CHOICES.SCISSORS
    else if (opponentChoice === OPPONENT_CHOICES.SCISSORS)
      return MY_CHOICES.ROCK
  } else if (result === RESULT.LOSS) {
    if (opponentChoice === OPPONENT_CHOICES.ROCK) return MY_CHOICES.SCISSORS
    else if (opponentChoice === OPPONENT_CHOICES.PAPER) return MY_CHOICES.ROCK
    else if (opponentChoice === OPPONENT_CHOICES.SCISSORS)
      return MY_CHOICES.PAPER
  }
  return opponentChoice
}

let totalPoints = 0
for (const pair of input.split("\n")) {
  const [opponentChoice, result] = pair.split(" ")
  const myChoice = getMyChoice(opponentChoice, result)
  if (opponentChoice && myChoice)
    totalPoints +=
      calculateResult(opponentChoice, myChoice) + getPointByChoice(myChoice)
}

console.log(totalPoints)
