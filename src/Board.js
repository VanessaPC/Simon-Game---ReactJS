import React, { Component } from 'react';
import './Board.css';

export class Board extends Component {
    constructor() {
        super();

        this.COLOR_ARRAY = ["red", "blue", "green", "yellow"];
        this.GAME_COLORS = [];
        this.USER_COLORS = [];

        this.RedSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
        this.GreenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
        this.BlueSound = new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
        this.YellowSound = new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

        this.SOUND_ARRAY = [this.RedSound, this.BlueSound, this.GreenSound, this.YellowSound];

        this.state = {
            value: "",
            complexity: "",
            visibility: false,
            wrongColor: false,
            gameValue: "",
            winner: "",
            numberGameColors: 0,
            numberUserColors: 0,
            audio: ''
        }
        
        this.initialState = this.initialState.bind(this);
        this.onGameStart = this.onGameStart.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.generateColor = this.generateColor.bind(this);
        this.playColors = this.playColors.bind(this);
        this.userMoves = this.userMoves.bind(this);
        this.winnerCheck = this.winnerCheck.bind(this);
        this.reStart = this.reStart.bind(this);
        
    }

    initialState() {
        this.setState({
            value: "",
            complexity: "",
            visibility: false,
            gameValue: "",
            winner: "",
            numberGameColors: 0,
            numberUserColors: 0,
            audio: ''
        })
    }

   reStart() {
     this.initialState();
   }

    onGameStart() {
        if (this.state.complexity === "easy"){
            this.generateColor();
        } else if (this.state.complexity === "normal"){
            this.generateColor();
        } else if (this.state.complexity === "") {
            this.setState({visibility: true});
        }
    }

    handleChanges(e) {
         this.setState({
          complexity: e.target.value,
          visibility: false
        });
    }
 
    generateColor() {
        let color = 0;
    
        function generateColor(min, max){
          let number =  Math.random() * (max - min);
          return Math.floor(number);
        }
        
        color = generateColor(0, 4);
        this.GAME_COLORS.push(color);
        this.setState({numberGameColors: this.GAME_COLORS.length })
        this.playColors();
    }

    playColors() {
        let count = 0;
        let colorInterval;

        let colorChange = () => {
            if(count !== this.GAME_COLORS.length){
                this.setState({
                    gameValue: this.COLOR_ARRAY[this.GAME_COLORS[count]],
                });
                this.SOUND_ARRAY[this.GAME_COLORS[count]].play();

                setTimeout(() => {this.setState({gameValue: ''})}, 500);
                count += 1;
                return;
            } else {
                clearInterval(colorInterval);
                return;
            }
        } 
        colorInterval = setInterval(colorChange.bind(this), 1000);
    }

    userMoves(e) {
        this.USER_COLORS.push(e.target.value);

        let colorHighlighted = '';

        let showColor = () => {
            switch (this.USER_COLORS[this.USER_COLORS.length - 1]) {
                case 'red':
                    colorHighlighted = 'redHighlighted',
                    this.RedSound.play()
                    break;
                case 'blue':
                    colorHighlighted = 'blueHighlighted',
                    this.BlueSound.play()
                    break;
                case 'green':
                    colorHighlighted = 'greenHighlighted',
                    this.GreenSound.play()
                    break;
                case 'yellow':
                    colorHighlighted = 'yellowHighlighted',
                    this.YellowSound.play()
                    break;
            }
        }

        showColor();
        
        this.setState({
            gameValue: colorHighlighted,
            numberUserColors: this.USER_COLORS.length
        })

          this.winnerCheck();
       

    }

  
    winnerCheck(){
        let fail = false,
            countTrues = 0,
            countFails = 0,
            len = this.USER_COLORS.length - 1;
             
                if (this.USER_COLORS[len] === this.COLOR_ARRAY[this.GAME_COLORS[len]]){
                 countTrues ++;
                 console.log(' it´s right');
                    
                    if(len + 1 === 3){
                      this.initialState();

                      this.setState({
                        winner: "Congratulations! You have won!"
                      });
                      return;
                      console.log(this.state.winner);
                    }

                    if(len === this.GAME_COLORS.length - 1){
                      this.generateColor();
                      this.USER_COLORS = [];
                     
                    } 
                this.setState({
                  numberUserColors: this.USER_COLORS.length 
                });

                } else if(this.USER_COLORS[len] !== this.COLOR_ARRAY[this.GAME_COLORS[len]]){
                  countFails ++;
                  fail = true;
                  
                  this.setState({wrongColor: true});
                  
                  setTimeout(() => {this.setState({wrongColor: false})}, 1000);
                  if (this.state.complexity === "easy"){
                    
                      this.GAME_COLORS = [];
                      this.USER_COLORS = [];
                    
                      this.initialState();
                    
                  } else if (this.state.complexity === "normal"){
                    this.playColors();
                    
                    if (countFails === 5){
                      this.GAME_COLORS = [];
                      this.USER_COLORS = [];
                      this.initialState();
                    }

                  };
                  
                  

              } 
  
    }


  render() {
    return (

      <div className="main-container"> 
        <div className="game-container">
          <button 
            className={`button-red ${this.state.gameValue === 'red' ? 'redHighlighted' : 'red'}`}
            value ="red" 
            name ="redButton"
            onClick = {this.userMoves}>
          </button>
          <button 
            className={`button-green ${this.state.gameValue === 'green' ? 'greenHighlighted' : 'green'}`}
            value="green"
            name="greenButton"
            onClick= {this.userMoves}>
          </button>
          <button 
            className={`button-blue ${this.state.gameValue === 'blue' ? 'blueHighlighted' : 'blue'}`}
            value="blue"
            name="blueButton"
            onClick= {this.userMoves}>
          </button>
          <button 
            className={`button-yellow ${this.state.gameValue === 'yellow' ? 'yellowHighlighted' : 'yellow'}`} 
            value="yellow"
            name="yellowButton"
            onClick= {this.userMoves}>
          </button>
        </div>
        <div className="container-readings">
          <div className="readings">
            <div className="notification-container">
              
          {this.state.complexity === '' ? <div  className="text">
          <p> Choose a difficulty and start game </p>
        </div> : null}
              
          {this.state.visibility ? <div  className="text-red">
          <p> Choose a difficulty </p>
        </div> : null}
            
          <div  className="text-red">
            <p>{this.state.wrongColor ?  'Wrong color!' : ''} </p>
        </div>
            </div>
          <div className="text">Game : {this.state.numberGameColors} </div>
          <div className="text"> You : {this.state.numberUserColors} </div>
          <form className="input">
            <ul>
              <li>
            <label>
              <input 
                id="radioButton"
                type="radio"
                name="easy-game"
                value="easy"
                disabled={this.state.complexity}
                checked={this.state.complexity === "easy"}
                onChange={this.handleChanges} /> 
                Strict
            </label>
              </li>
              <li>
            <label>
              <input 
                id="radioButton"
                type="radio"
                name="normal-game"
                value="normal"
                disabled={this.state.complexity}
                checked={this.state.complexity === "normal"}
                onChange={this.handleChanges} /> 
                Normal
            </label>
              </li>
            </ul>
          </form>
          <button value="start" onClick={this.onGameStart} className="primary-button"> 
            Start 
          </button>
          <button value="start" onClick={this.reStart} className="secondary-button"> 
            Re start 
          </button>{this.state.winner}
          </div>
        </div>
      </div>
    );
  }
}