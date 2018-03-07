// Codigo refactorizado

import React from "react";
import ReactDom, { render } from "react-dom";
import Styles from "./styles.css";
import _ from "lodash";

const Stars = props => {
  // Obtener un numero random del 1 al 9
  // const numberOfStars = 1 + Math.floor(Math.random() * 9);

  /*let stars = [];

  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<i key={i} className="fas fa-star" />);
  }*/

  return (
    <div className="col-5">
      {_.range(props.numberOfStars).map(i => (
        <i key={i} className="fas fa-star" />
      ))}
      {/*{stars}*/}
      {/*<i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />
      <i className="fas fa-star" />*/}
    </div>
  );
};

const Button = props => {
  return (
    <div className="col-2">
      {/* disabled efectua un <<if>>*/}
      <button className="btn" disabled={props.selectedNumbers.length === 0}>
        =
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

class Game extends React.Component {
  state = {
    selectedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
  };

  selectedNumber = clikedNumber => {
    if (this.state.selectedNumbers.indexOf(clikedNumber) >= 0) {
      return;
    }
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clikedNumber)
    }));
  };

  unselectedNumber = clikedNumber => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== clikedNumber
      )
    }));
  };

  render() {
    // Esta constante me permite evitar el uso del termino <<this.state>>
    const { selectedNumbers, randomNumberOfStars } = this.state;
    return (
      <div className="container">
        <h2>Play Nine</h2>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers} />
          <Answer
            selectedNumbers={selectedNumbers}
            unselectedNumber={this.unselectedNumber}
          />
        </div>
        <br />
        <Numbers
          selectedNumbers={selectedNumbers}
          selectedNumber={this.selectedNumber}
        />
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
