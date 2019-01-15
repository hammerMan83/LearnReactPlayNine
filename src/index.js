import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";

class Stars extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //     return nextProps.shouldUpdate ? true : false;
  // }

  render() {
    //const numberOfStars = 1 + Math.floor(Math.random() * 9);

    return (
      <div className="col-sm-5">
        {_.range(this.props.numberOfStars).map(i => (
          <i key={i} className="fa fa-star" />
        ))}
      </div>
    );
  }
}

const Button = props => {
  return (
    <div className="col-sm-2">
      <button className="btn" disabled={props.selectedNumbers.length === 0}>
        =
      </button>
    </div>
  );
};

const Answer = props => {
  let numbers = props.selectedNumbers;

  return (
    <div className="col-sm-5">
      {numbers.map((number, i) => (
        <span
          key={i}
          className="number"
          onClick={() => props.addAnswerNumberBack(number)}
        >
          {number}
        </span>
      ))}
    </div>
  );
};

const Numbers = props => {
  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) => (
          <span
            key={i}
            className={
              props.selectedNumbers.includes(number)
                ? "number selected"
                : "number"
            }
            onClick={() => props.selectNumber(number)}
          >
            {number}
          </span>
        ))}
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

  selectNumber = clickedNumber => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
      return;
    }

    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  addAnswerNumberBack = clickedNumber => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(
        item => item !== clickedNumber
      )
    }));
  };

  render() {
    const { selectedNumbers, randomNumberOfStars } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers} />
          <Answer
            addAnswerNumberBack={this.addAnswerNumberBack}
            selectedNumbers={selectedNumbers}
          />
        </div>
        <br />
        <Numbers
          selectNumber={this.selectNumber}
          selectedNumbers={selectedNumbers}
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
