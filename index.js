#!/usr/bin/env node
// go to the terminal and run the command node . the process will start


import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to the Game!\n');
    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('How to play')}
    I will ask you some questions.
    You have to answer them correctly to win ${chalk.bgBlack('$5000')}!
    `);
}

async function askName() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
            default: "Player",
        },
    ]);
    playerName = answer.name;
}

async function askQuestion() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "question_1",
            message: "How many words does my name have?\n",
            choices: ["4", "5", "6", "7"],
        },
    ]);
}
async function askQuestion1() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "question_2",
            message: "what is my age?\n",
            choices: ["20", "21", "22", "23"],
        },
    ]);

    await handleAnswer(answer.question_2 === "23",answer.question_1 === "5");
}
async function handleAnswer(isCorrect) {
    const spinner = createSpinner("Checking your answer...").start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: "Correct!" }); // ✅ Fixed `.success()` instead of `.succeed()`
        winner();
    } else {
        spinner.error({ text: "Incorrect!" });
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congrats, ${playerName}!\n$5000`;
    figlet(msg, (err, data) => {
        if (!err) {
            console.log(gradient.pastel.multiline(data));
        } else {
            console.log(msg); // Fallback if figlet fails
        }
    });
}

// Execute the game 
(async () => {
    await welcome();
    await askName();
    await askQuestion();
    await askQuestion1();
})();
