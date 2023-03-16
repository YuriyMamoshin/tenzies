import React from "react";
import Die from "./Die"
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {


    const [counter, setCounter] = React.useState(1);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        let numbersArray = [];
        for (let i = 0; i < 10; i++) {
            numbersArray.push(generateNewDie())
        }
        return numbersArray;
    }


    function rollDice() {
        if (tenzies) {
            setCounter(1);
            setTenzies(false);
            setDice(allNewDice());
            setStartTime(0);
            setTimeSpent(0);
        } else {
            setCounter(oldCounter => oldCounter + 1);
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie();
            }))
        }


    }

    function holdDice(id) {
        if (startTime === 0) setStartTime(new Date().getTime())

        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    const [dice, setDice] = React.useState(allNewDice());

    const diceArray = dice.map(die => <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
    />)

    const [tenzies, setTenzies] = React.useState(false);
    const [startTime, setStartTime] = React.useState(0);
    const [timeSpent, setTimeSpent] = React.useState(0);
    const [bestTime, setBestTime] = React.useState(localStorage.getItem("best") || 60000000);

    React.useEffect(() => {
        let value = dice[0].value;
        if (dice.every(die => die.value === value && die.isHeld)) {
            setTenzies(true);

            let time = Math.round((new Date().getTime() - startTime) / 1000);
            setTimeSpent(time);

            if (time < bestTime) {
                setBestTime(time);
                localStorage.setItem('best', bestTime);

            }
        }
    }, [dice])

    return (
        <main>

            <h1 className="title">Tenzies</h1>
            <p className="instruction">Roll untill all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <p>
                {bestTime < 6000 && <span>Best time: {Math.floor(bestTime / 60)}:{bestTime % 60} </span>}
                Time spent: {Math.floor(timeSpent / 60)}:{timeSpent % 60}
            </p>



            <div className="dice-container">
                {diceArray}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New game" : `Roll ${counter}`}</button>
            {tenzies && <Confetti
                height='500px'
                width="600px"
            />}
        </main>
    )
}