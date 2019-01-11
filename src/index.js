import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";

const Stars = props => {
  const numberOfStars = 1 + Math.floor(Math.random() * 9);

  return (
    <div className="col-5">
      {_.range(numberOfStars).map(i => (
        <i key={i} className="fa fa-star" />
      ))}
    </div>
  );
};

const Button = props => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
};

const Answer = props => {
  return <div className="col-5">...</div>;
};

const Numbers = props => {
  const arrOfNumbers = _.range(1, 10);

  return (
    <div className="card text-center">
      <div>
        {arrOfNumbers.map((number, i) => (
          <span key={i} className="number">
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

class Game extends React.Component {
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
