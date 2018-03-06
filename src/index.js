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
      <button className="btn">=</button>
    </div>
  );
};

const Answer = props => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => <span key={i}>{number}</span>)}
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

  render() {
    return (
      <div className="container">
        <h2>Play Nine</h2>
        <hr />
        <div className="row">
          <Stars numberOfStars={this.state.randomNumberOfStars} />
          <Button />
          <Answer selectedNumbers={this.state.selectedNumbers} />
        </div>
        <br />
        <Numbers
          selectedNumbers={this.state.selectedNumbers}
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
