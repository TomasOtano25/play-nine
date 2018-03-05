import React from "react";
import ReactDom, { render } from "react-dom";
import Styles from "./styles.css";
import _ from "lodash";

const Stars = props => {
  // Obtener un numero random del 1 al 9
  const numberOfStars = 1 + Math.floor(Math.random() * 9);

  let stars = [];

  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<i key={i} className="fas fa-star" />);
  }

  return (
    <div className="col-5">
      {stars}
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
  return <div className="col-5">...</div>;
};

const Numbers = props => {
  let arrayOfNumbers = _.range(1, 9);
  return (
    <div className="card text-center">
      <div>
        {arrayOfNumbers.map(numbers => <span key={numbers}>{numbers}</span>)}
        {/*<span>1</span>
        <span className="selected">2</span>
        <span className="used">3</span>*/}
      </div>
    </div>
  );
};

class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <h2>Play Nine</h2>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
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
