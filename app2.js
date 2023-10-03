import React, { Component } from "react";
import "./App.css";
class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: "0",
      operator: null,
      firstOperand: null,
      waitingForOperand: false,
    };
  }

  handleDigitClick = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === "0" ? String(digit) : displayValue + digit,
      });
    }
  };

  handleOperatorClick = (nextOperator) => {
    const { displayValue, operator, firstOperand } = this.state;

    if (firstOperand === null) {
      this.setState({
        firstOperand: parseFloat(displayValue),
        waitingForOperand: true,
        operator: nextOperator,
      });
    } else {
      const result = this.performOperation();
      this.setState({
        firstOperand: result,
        waitingForOperand: true,
        displayValue: String(result),
        operator: nextOperator,
      });
    }
  };

  performOperation = () => {
    const { firstOperand, operator, displayValue } = this.state;
    const secondOperand = parseFloat(displayValue);

    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  handleEqualsClick = () => {
    if (this.state.operator && !this.state.waitingForOperand) {
      const result = this.performOperation();
      this.setState({
        displayValue: String(result),
        firstOperand: result,
        operator: null,
        waitingForOperand: true,
      });
    }
  };

  handleClearClick = () => {
    this.setState({
      displayValue: "0",
      operator: null,
      firstOperand: null,
      waitingForOperand: false,
    });
  };

  render() {
    return (
      <div className="calculator">
        <div className="display">{this.state.displayValue}</div>
        <br />
        <div className="buttons">
          <button className="butt" onClick={() => this.handleDigitClick(7)}>
            7
          </button>
          <button className="butt" onClick={() => this.handleDigitClick(8)}>
            8
          </button>
          <button className="butt" onClick={() => this.handleDigitClick(9)}>
            9
          </button>
          <button
            className="butt"
            onClick={() => this.handleOperatorClick("+")}
          >
            +
          </button>
          <br />
          <button className="butt" onClick={() => this.handleDigitClick(4)}>
            4
          </button>
          <button className="butt" onClick={() => this.handleDigitClick(5)}>
            5
          </button>
          <button className="butt" onClick={() => this.handleDigitClick(6)}>
            6
          </button>
          <button
            className="butt"
            onClick={() => this.handleOperatorClick("-")}
          >
            -
          </button>
          <br />
          <button className="butt" onClick={() => this.handleDigitClick(1)}>
            1
          </button>
          <button className="butt" onClick={() => this.handleDigitClick(2)}>
            2
          </button>
          <button className="butt" onClick={() => this.handleDigitClick(3)}>
            3
          </button>
          <button
            className="butt"
            onClick={() => this.handleOperatorClick("*")}
          >
            *
          </button>
          <br />
          <button className="butt" onClick={() => this.handleDigitClick(0)}>
            0
          </button>
          <button className="butt" onClick={() => this.handleClearClick()}>
            C
          </button>
          <button className="butt" onClick={() => this.handleEqualsClick()}>
            =
          </button>
          <button
            className="butt"
            onClick={() => this.handleOperatorClick("/")}
          >
            /
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
