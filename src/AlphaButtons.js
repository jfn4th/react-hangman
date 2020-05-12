import React, { Component } from 'react';

class AlphaButtons extends Component {
	constructor(props) {
		super(props);
		this.guessHandler = this.guessHandler.bind(this);
	}

	guessHandler(evt) {
		let val = evt.target.value;
		this.props.handleGuess(val);
	}

	render() {
		const buttons = 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
			<button key={ltr} value={ltr} onClick={this.guessHandler} disabled={this.props.guessed.has(ltr)}>
				{ltr}
			</button>
		));
		return <p>{buttons}</p>;
	}
}

export default AlphaButtons;
