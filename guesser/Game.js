'use strict';

const Inquirer = require('inquirer');
const Interrogator = require('./Interrogator');

/**
 * Game class which contains the history of all the interrogations.
 */

class Game {

    constructor() {

        this.state = {
            history: [],
            n: null
        };
    }

    /**
     * Start by gather initial bounds for all interrogations for this process.
     */
    start() {
        return Inquirer.prompt([{
            type: 'input',
            message: 'Please enter a number n:',
            name: 'max',
            filter: (str) => {
                return new Promise((resolve) => {
                    return resolve(Number(str));
                });
            }
        }])
            .then(({max}) => {
                
                this.state.n = max;

                this.play();
            })
            .catch(err => console.log(err));
    }

    /**
     * Create an interrogator and start asking questions.
     * When a history is returned, we have an answer.
     */
    play() {

        const game = this;
        
        const interrogator = new Interrogator({min: 1, max: this.state.n});
        interrogator.start()
            .then((history) => {
                this.state.history.push(history);

                const finalQuestionState = history[history.length-1];
                const totalGuesses = (this.state.history.reduce((sum, history) => {
                    return sum + history.length;
                }, 0));
                const averageGuesses = (totalGuesses / this.state.history.length);

                console.log(`Your number is: ${finalQuestionState.answer}`);
                console.log(`It took me ${history.length} guesses.`);
                console.log(`I averaged ${averageGuesses} guesses per game for ${this.state.history.length} game(s).`);
            })
            .then(this.finish.bind(game))
            .catch(err => console.log(err));
    }

    /**
     * Ask if the user wants to play again
     */
    finish() {
        return Inquirer.prompt([{
            type: 'list',
            message: 'Would you like to play again?',
            name: `input`,
            choices: ['y', 'n']
        }])
        .then(({input}) => {
            if (input === 'y') {
                return this.play();
            }
            return this.quit();
        })
        .catch(err => console.log(err));
    }

    quit() {
        console.log('Thanks for playing! See yah!');
        process.exit(0);
    }
}

module.exports = Game;
