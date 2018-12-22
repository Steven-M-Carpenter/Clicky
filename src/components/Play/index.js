//This is the main game area which will likely have most of the logic and pulls everything together
//**It will manage state so it will need to be a class.
//
import React from "react";
import "./play.css";
import dinos from "../../data.json";
import Header from "../Header";
import Footer from "../Footer";
import Instr from "../Instr";
import Container from "../Container";
import DinoCard from "../DinoCard";

class Play extends React.Component {
  state = {
    dinos,
    score: 0,
    highScore: 0
  };

  componentDidMount() {
    this.setState({ 
      dinos: this.shuffleDinos(this.state.dinos),
      score: 0,
      highScore: 0 
    });
  }

  //Shuffle the array  -  https://stackoverflow.com/questions/49555273/how-to-shuffle-an-array-of-objects-in-javascript
  shuffleDinos = (input) => {
    const newDinoOrder = input.sort(() => Math.random() - 0.5);
    return newDinoOrder;
  };


  resetGame = data => {
    const resetData = data.map(data => ({ ...data, clicked: false }));
    return this.shuffleDinos(resetData);
  };


  dinoClicked = id => {
    let correctGuess = false;
    // console.log("id = " + id);
    // console.log("index = " + this.state.dinos.indexOf(id));

    // const newData = this.state.data.map(item => {
    //   const newItem = { ...item };

    //Cycle through the dinos looking for a match to id of the one clicked on
    const newData = this.state.dinos.map(dino => {
      const currentDino = { ...dino };
      if (currentDino.id === id) {
        //Check to see if this dino has been clicked on before
        if (!currentDino.clicked) {
          // console.log("this dino matched: " + currentDino.id);
          // console.log("clicked = " + currentDino.clicked);
          correctGuess = true;
          currentDino.clicked = true;
          // console.log("***currentScore = " + currentScore);
          // console.log("***currentHighScore = " + currentHighScore);
          // console.log("currentDino = " + JSON.stringify(currentDino));
        }
      };
      // }; 
      return currentDino;
    });
    if(correctGuess) {
      // console.log("correct");
      this.handleCorrectGuess(newData);
    } else {
      // console.log("incorrect");
      this.handleIncorrectGuess(newData);
    }
  };

  handleCorrectGuess = (input) => {
    let newHighScore;
    const currentScore = this.state.score;
    const currentHighScore = this.state.highScore;
    // console.log("***currentScore = " + currentScore);
    // console.log("***currentHighScore = " + currentHighScore);
    // console.log(JSON.stringify(input));

    const newScore = currentScore + 1;

    if (currentScore >= currentHighScore) {
      newHighScore = currentScore + 1;
      // console.log("greater " + newHighScore);
    } else {
      newHighScore = currentHighScore;
      // console.log("lesser " + newHighScore);
    };
    // const newHighScore = score > this.highscore ? score : highScore;

    let result = this.shuffleDinos(input);

    // console.log("newScore = " + newScore);
    // console.log("newHighScore = " + newHighScore);
    // console.log(JSON.stringify(result));

    this.setState({
      dinos: result,
      score: newScore,
      highScore: newHighScore
    });
  };


  handleIncorrectGuess = (input) => {
    this.setState({
      dinos: this.resetGame(input),
      score: 0
    });
  };


  render() {
    return (
      <div>
        <Header
          score={this.state.score}
          highScore={this.state.highScore}
        />
        <Instr />
        <Container>
          {this.state.dinos.map(dino => (
            <DinoCard
              key={dino.id}
              id={dino.id}
              clicked={dino.clicked}
              name={dino.name}
              image={dino.image}
              dinoClicked={this.dinoClicked}
            />
          ))};
          </Container>
          <Footer />
      </div>
    );
  };
};

export default Play;