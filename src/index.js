// Codigo refactorizado

import React from "react";
import ReactDom, { render } from "react-dom";
import Styles from "./styles.css";
import _ from "lodash";

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) {
    return true;
  }
  if (arr[0] > n) {
    return false;
  }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length,
    combinationsCount = 1 << listSize;
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) {
        combinationSum += arr[j];
      }
    }
    if (n === combinationSum) {
      return true;
    }
  }
  return false;
};

const Stars = props => {
  // Obtener un numero random del 1 al 9
  // const numberOfStars = 1 + Math.floor(Math.random() * 9);

  /*let stars = [];

  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<i key={i} className="fas fa-star" />);
  }*/

  return (
    <div className="col-5">
      <div className="row">
        {_.range(props.numberOfStars).map(i => (
          <div key={i}>
            <i className="fas fa-star" />
          </div>
        ))}
      </div>
      {/*{stars}*/}
      {/*<i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />*/}
    </div>
  );
};

const Button = props => {
  let button;
  switch (props.answerIsCorrect) {
    case true:
      button = (
        <div>
          <button className="btn btn-success" onClick={props.acceptAnswer}>
            <i className="fas fa-check" />
          </button>
        </div>
      );
      break;
    case false:
      button = (
        <div>
          <button className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        </div>
      );
      break;
    default:
      button = (
        <button
          className="btn"
          onClick={props.checkAnswer}
          disabled={props.selectedNumbers.length === 0}
        >
          =
        </button>
      );
      break;
  }

  return (
    <div className="col-2 text-center ">
      {/* disabled efectua un <<if>>*/}
      {button}
      <br />
      <br />
      <button
        className="btn btn-warning btn-sm"
        disabled={props.redraws === 0}
        onClick={props.redraw}
      >
        <i className="fas fa-sync-alt" /> {props.redraws}
      </button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => (
        <span key={i} onClick={() => props.unselectedNumber(number)}>
          {number}
        </span>
      ))}
    </div>
  );
};

// Codigo para aprender: funcion con class dinamica
const Numbers = props => {
  // let arrayOfNumbers = _.range(1, 10);
  const numberClassName = number => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return "used";
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return "selected";
    }
  };

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) => (
          <span
            key={i}
            className={numberClassName(number)}
            onClick={() => props.selectedNumber(number)}
          >
            {number}
          </span>
        ))}
        {/*<span>1</span>
        <span className="selected">2</span>
        <span className="used">3</span>*/}
      </div>
    </div>
  );
};
Numbers.list = _.range(1, 10);

const DoneFrame = props => {
  return (
    <div className="text-center">
      <h3>{props.doneStatus}</h3>
      <button className="btn btn-secondary" onClick={props.resetGame}>
        Play Again
      </button>
    </div>
  );
};

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  static initialState = () => ({
    selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: null // "Game Over!"
  });

  state = Game.initialState();

  resetGame = () => this.setState(Game.initialState());

  selectedNumber = clikedNumber => {
    if (this.state.selectedNumbers.indexOf(clikedNumber) >= 0) {
      return;
    }
    this.setState(prevState => ({
      // Restablezco el state <<answerIsCorrect>>
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clikedNumber)
    }));
  };

  unselectedNumber = clikedNumber => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== clikedNumber
      )
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect:
        prevState.randomNumberOfStars ===
        prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };

  acceptAnswer = () => {
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumberOfStars: Game.randomNumber()
      }),
      this.updateDoneStatus /* () => ... */
    );
  };

  redraw = () => {
    if (this.state.redraws === 0) {
      return;
    }
    this.setState(
      prevState => ({
        randomNumberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        selectedNumbers: [],
        redraws: prevState.redraws - 1
      }),
      this.updateDoneStatus
    );
  };

  posibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
    const possibleNumbers = _.range(1, 10).filter(
      number => usedNumbers.indexOf(number) === -1
    );
    return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "Done.Nice!" };
      }
      if (prevState.redraws === 0 && !this.posibleSolutions(prevState)) {
        return { doneStatus: "Game Over!" };
      }
    });
  };

  render() {
    // Esta constante me permite evitar el uso del termino <<this.state>>
    const {
      selectedNumbers,
      randomNumberOfStars,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus
    } = this.state;

    return (
      <div className="container">
        <h2>Play Nine</h2>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button
            selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}
          />
          <Answer
            selectedNumbers={selectedNumbers}
            unselectedNumber={this.unselectedNumber}
          />
        </div>
        <br />

        {doneStatus ? (
          <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} />
        ) : (
          <Numbers
            selectedNumbers={selectedNumbers}
            selectedNumber={this.selectedNumber}
            usedNumbers={usedNumbers}
          />
        )}

        <br />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
