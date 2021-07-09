import React, { Component } from "react";
import "./Calculator.css";

import Display from "../components/Display";
import Buttons from "../components/Buttons";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
    this.removeDigit = this.removeDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ clearDisplay: true, operation, current: 1 });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];
      values[0] = this.getResult(values, currentOperation);
      values[1] = 0
      
      this.setState({ 
        displayValue: values[0], 
        clearDisplay: !equals, 
        operation: equals ? null : operation, 
        current: equals ? 0 : 1,
        values });
    }
  }

  removeDigit(){

    const set = (value) =>{
      const v = value.slice(0, -1)
      if(value === '0' || v === ''){
        this.setState({displayValue : '0'})
      }else{
        this.setState({displayValue : v})
      }
    }

    const value = this.state.displayValue;
    if(typeof value === 'string'){
      set(value)    
    }else{
      const string = value.toString()
      set(string)
    }
    
  } 

  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  getResult = ([n1, n2], operation) => {
    // var result;
    switch (operation) {
      case "+":
        return n1 + n2;
        // break;
      case "-":
        return n1 - n2;
        // break;
      case "*":
        return n1 * n2;
        // break;
      case "/":
        return n1 / n2;
        // break;
      default:
        break;
    }
    // result
  };

  render() {
    return (
      <div className="Calculator">
        <Display value={this.state.displayValue} />
        <Buttons label="AC" click={this.clearMemory} double />
        <Buttons label="<" click={this.removeDigit} />
        <Buttons label="/" click={this.setOperation} operation />
        <Buttons label="7" click={this.addDigit} />
        <Buttons label="8" click={this.addDigit} />
        <Buttons label="9" click={this.addDigit} />
        <Buttons label="*" click={this.setOperation} operation />
        <Buttons label="4" click={this.addDigit} />
        <Buttons label="5" click={this.addDigit} />
        <Buttons label="6" click={this.addDigit} />
        <Buttons label="-" click={this.setOperation} operation />
        <Buttons label="1" click={this.addDigit} />
        <Buttons label="2" click={this.addDigit} />
        <Buttons label="3" click={this.addDigit} />
        <Buttons label="+" click={this.setOperation} operation />
        <Buttons label="0" click={this.addDigit} double />
        <Buttons label="." click={this.addDigit} />
        <Buttons label="=" click={this.setOperation} operation />
      </div>
    );
  }
}

export default Calculator;
