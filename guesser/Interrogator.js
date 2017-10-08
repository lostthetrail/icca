'use strict';

const Inquirer = require('inquirer');

/**
 * Simple binary search algorithm.
 */
const binaryGuess = ({min, max}) => {
    const guess = Math.floor((min + max) / 2);
    return guess;
}

/**
 * The computers version of an interrogator. Controls guess/reply flow until an answer has been determined.
 * It is given bounds and responds with a guess/reply history.
 */
class Interrogator {
    
    constructor({min=1, max=100}) {
        this.state = {
            initialBounds: { min, max },
            history: []
        };
    }
    
    /**
     * Start interrogation by asking a question with initial bounds.
     * Then analyze and ask again as needed.
     */
    start() {

        const interrogation = this;

        return this.question(this.state.initialBounds)
            .then(this.analyzeAndAskAgain.bind(interrogation))
            .then(interrogation.complete.bind(interrogation))
            .catch(err => console.error(err));
    }

    /**
     * Complete interrogation by providing history of the guess/reply/answer chain.
     */
    complete() {

        return Promise.resolve(this.state.history);
    }

    /**
     * Analyze previous guess/reply and determine if we are satisfied.
     */
    analyzeAndAskAgain(questionState) {
        
        const interrogation = this;
        this.state.history.push(questionState);

        const {bounds, guess, reply} = questionState;
        
        // If user says the guess is correct, we are done.
        if (reply === 'c') {
            Object.assign(questionState, {answer: guess});
            return Promise.resolve(guess);
        }
        
        // Create our new bounds based on user input.
        const newBounds = Object.assign({}, bounds);
        if (reply === 'h') {
            Object.assign(newBounds, {max: guess-1});
        } else {
            Object.assign(newBounds, {min: guess+1});
        }

        // If there are no other choices, we are done.
        if (newBounds.max === newBounds.min) {
            Object.assign(questionState, {answer: newBounds.max});
            return Promise.resolve(newBounds.max);
        }
        
        return this.question(newBounds)
            .then(this.analyzeAndAskAgain.bind(interrogation))
            .catch(err => console.error(err));
    }

    question(bounds) {
        
        const guess = binaryGuess(bounds);
        
        return Inquirer.prompt([{
            type: 'list',
            message: `${guess}?`,
            name: `input`,
            choices: ['h', 'l', 'c']
        }])
            .then(({input}) => {
                return Promise.resolve({
                    bounds,
                    guess,
                    reply: input
                })
            })
            .catch(err => console.error(err));
    }
}

module.exports = Interrogator;
