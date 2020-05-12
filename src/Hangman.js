import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import AlphaButtons from './AlphaButtons';
import { randomWord } from './words';

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [ img0, img1, img2, img3, img4, img5, img6 ]
	};

	constructor(props) {
		super(props);
		this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
		this.handleGuess = this.handleGuess.bind(this);
		this.generateGameState = this.generateGameState.bind(this);
		this.reset = this.reset.bind(this);
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer.split('').map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'));
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let ltr = evt;
		this.setState((st) => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
		}));
	}

	// generateGameState: return win, loss, or buttons
	generateGameState() {
		if (this.guessedWord().join('') === this.state.answer) {
			return 'You Win!';
		} else if (this.state.nWrong >= this.props.maxWrong) {
			return `You lose! The answer was: ${this.state.answer}`;
		} else {
			return (
				<AlphaButtons className="Hangman-btns" handleGuess={this.handleGuess} guessed={this.state.guessed} />
			);
		}
	}

	//reset: resets game to start
	reset() {
		this.setState({
			nWrong: 0,
			guessed: new Set(),
			answer: randomWord()
		});
	}

	/** render: render game */
	render() {
		const altText = `${this.state.nWrong}/${this.props.maxWrong} wrong guesses`;
		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img src={this.props.images[this.state.nWrong]} alt={altText} />
				<p className="Hangman-guesses">Guessed wrong: {this.state.nWrong}</p>
				<p className="Hangman-word">{this.guessedWord()}</p>
				<p className="Hangman-btns">{this.generateGameState()}</p>
				<button id="reset" onClick={this.reset}>
					Reset
				</button>
			</div>
		);
	}
}

export default Hangman;
