import React, { Component } from "react";
import { QUESTIONS } from "./questions";

class App extends Component {
  state = {
    questions: QUESTIONS,
    responses: {},
    currentScore: 0,
    overallScore: 0,
    runs: 0,
  };

  handleResponse = (questionId, answer) => {
    this.setState(prevState => ({
      responses: {
        ...prevState.responses,
        [questionId]: answer
      }
    }));
  };

  calculateScore = () => {
    const { responses } = this.state;
    let score = 0;

    for (let key in responses) {
      if (responses[key] === 'Yes') {
        score += 1;
      }
    }

    this.setState(prevState => ({
      currentScore: score,
      overallScore: prevState.overallScore + score,
      runs: prevState.runs + 1
    }));
  };

  resetResponses = () => {
    this.setState({
      responses: {},
      currentScore: 0,
    });
  };

  render() {
    const { questions, currentScore, overallScore, runs } = this.state;

    return (
      <div className="main__wrap">
        <main className="container">
          <div>
            {Object.keys(questions).map(key => (
              <div key={key}>
                <p style={{ display: "inline-block", marginRight: "10px" }}>{questions[key]}</p>
                <button
                  onClick={() => this.handleResponse(Number(key), 'Yes')}
                  style={{ cursor: "pointer", display: "inline-block", marginRight: "5px" }}
                >
                  Yes
                </button>
                <button
                  onClick={() => this.handleResponse(Number(key), 'No')}
                  style={{ cursor: "pointer", display: "inline-block" }}
                >
                  No
                </button>
              </div>
            ))}
          </div>
          <div>
            <button style={{ cursor: "pointer", marginRight: "5px" }} onClick={this.calculateScore}>Submit</button>
            <button style={{ cursor: "pointer" }} onClick={this.resetResponses}>Reset</button>
          </div>
          <div>
            <h2>Current Run Score</h2>
            <p>{currentScore}</p>
            <h2>Overall Score</h2>
            <p>{overallScore}</p>
            <h2>Number of Runs</h2>
            <p>{runs}</p>
          </div>
        </main>
      </div>
    );
  }
}

export default App;