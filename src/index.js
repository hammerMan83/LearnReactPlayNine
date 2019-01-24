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
      <div className="col-5">
        {_.range(this.props.numberOfStars).map(i => (
          <i key={i} className="fa fa-star" />
        ))}
      </div>
    );
  }
}

const Button = props => {
  let button;

  console.log("answerIsCorrect: " + props.answerIsCorrect);

  switch (props.answerIsCorrect) {
    case true:
      button = (
        <button className="btn btn-success" onClick={props.addUsedNumber}>
          <i className="fa fa-check" />
        </button>
      );
      break;
    case false:
      button = (
        <button className="btn btn-danger">
          <i className="fa fa-times" />
        </button>
      );
      break;
    default:
      button = (
        <button className="btn" disabled={props.selectedNumbers.length === 0}
                onClick={props.checkAnswer}>
          =
        </button>
      );
  }

  return (
    <div className="col-2">
      {button}
    </div>
  );
};

const Answer = props => {
  let numbers = props.selectedNumbers;

  return (
    <div className="col-5">
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
  let numberClassName = number => {
    if (props.usedNumbers.includes(number)) return "number used";

    if (props.selectedNumbers.includes(number)) return "number selected";

    return "number";
  };

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) => (
          <span
            key={i}
            className={numberClassName(number)}
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
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
    answerIsCorrect: null,
    usedNumbers: []
  };

  selectNumber = clickedNumber => {
    if (
      this.state.selectedNumbers.includes(clickedNumber) ||
      this.state.usedNumbers.includes(clickedNumber)
    ) {
      return;
    }

    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
      answerIsCorrect: null
    }));
  };

  addAnswerNumberBack = clickedNumber => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(
        item => item !== clickedNumber
      ),
      answerIsCorrect: null
    }));
  };

  checkAnswer = () => {
    console.log('In checkAnswer method');
    this.setState(prevState => ({
      answerIsCorrect:
        prevState.randomNumberOfStars ===
        prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };

  addUsedNumber = () => {
    console.log('In addUsedNumber method');
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
      answerIsCorrect: null
    }));
  };

  render() {
    const {
      selectedNumbers,
      randomNumberOfStars,
      answerIsCorrect,
      usedNumbers
    } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button
            selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            addUsedNumber={this.addUsedNumber}
          />
          <Answer
            addAnswerNumberBack={this.addAnswerNumberBack}
            selectedNumbers={selectedNumbers}
          />
        </div>
        <br />
        <Numbers
          selectNumber={this.selectNumber}
          selectedNumbers={selectedNumbers}
          usedNumbers={usedNumbers}
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
