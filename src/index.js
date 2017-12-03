import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueIn1: "",
      valueIn2: "",
      valueOut: ""
    };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChangeOut = this.handleChangeOut.bind(this);
  }

  handleChange1(event) {
    this.setState({ valueIn1: event.target.value });
    setTimeout(this.handleChangeOut);
  }

  handleChange2(event) {
    this.setState({ valueIn2: event.target.value });
    setTimeout(this.handleChangeOut);
  }

  clearStrings(str, clearWS) {
    return str
      .toLowerCase()
      .replace(/[.,,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
      .replace(/(\r\n|\n|\r)/gm, " ")
      .replace(/\s+/g, clearWS ? "" : " ");
  }

  handleChangeOut() {
    let wordsToParse = this.state.valueIn1.split(/\s+/g);
    let wordsToExclude = this.clearStrings(this.state.valueIn2).split(/\s+/g);
    console.log({ wordsToParse: wordsToParse, wordsToExclude: wordsToExclude });
    let outputWords = wordsToParse.filter(
      sw => !wordsToExclude.includes(this.clearStrings(sw, true))
    );
    this.setState({ valueOut: outputWords.join(" ") });
  }

  render() {
    return (
      <form className="form">
        <style>{styles}</style>

        <div className="input">
          <label>Input:</label>
          <textarea value={this.state.valueIn1} onChange={this.handleChange1} />
        </div>
        <div className="input">
          <label>Words to filter:</label>
          <textarea value={this.state.valueIn2} onChange={this.handleChange2} />
        </div>
        <div className="output">
          <label>Output:</label>
          <textarea value={this.state.valueOut} disabled={true} />
        </div>
      </form>
    );
  }
}

var styles = `
  body {
    margin: 0;
    background: #f9f9f9;
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    max-width: 800px;
    margin: 0 auto;
  }
  textarea {
    width: 100%;
    min-height: 100px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .input {
    width: 50%;
  }
  .output {
    width: 100%;
  }
  .input,
  .output {
    padding: 20px 20px 10px;
    box-sizing: border-box;
  }
`;

render(<App />, document.getElementById("root"));
