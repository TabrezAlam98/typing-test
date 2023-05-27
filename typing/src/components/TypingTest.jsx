import React, { useEffect, useState, useRef } from "react";
import styles from "./TypingTest.module.css";
const sec = 60;
const word = [
  "as",
  "df",
  "fg",
  "fh",
  "fj",
  "al",
  "a;",
  "as",
  "df",
  "fg",
  "fh",
  "fj",
  "al",
  "a;",
  "as",
  "df",
  "fg",
  "fh",
  "fj",
  "al",
  "a;",
  "as",
  "df",
  "fg",
  "fh",
  "fj",
  "al",
  "a;",
];

const TypingTest = () => {
  const [count, setCount] = useState(sec);
  const [curInput, setCurInput] = useState([]);
  const [curWord, setCurWord] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [inCorrect, setInCorrect] = useState(0);
  const [status, setStatus] = useState("wait");
  const textInp = useRef(null);

  useEffect(() => {
    if (status === "started") {
      textInp.current.focus();
    }
  }, [status]);

  const countStart = () => {
    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setCount((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setStatus("finished");
            return sec;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
  };
  const handleKeys = ({ keyCode }) => {
    if (keyCode === 32) {
      checkMatch();
      setCurWord(curWord + 1);
    }
  };
  const checkMatch = () => {
    const wordCompare = word[curWord];
    const match = wordCompare === curInput.trim();
    console.log(match);
    if (match) {
      setCorrect(correct + 1);
    } else {
      setInCorrect(inCorrect + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Time : {count}</h2>
      </div>

      {status === "started" && (
        <div className={styles.section}>
          <div className={styles.card}>
            <div>
              {word.map((el, i) => (
                <span key={i}>
                  <span>
                    {el.split("").map((char, idx) => (
                      <span className={styles.chars}>{char}</span>
                    ))}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className={styles.inputSection}>
        <input
          placeholder="type here...."
          disabled={status != "started"}
          ref={textInp}
          type="text"
          className={styles.input}
          onKeyDown={handleKeys}
          vaue={curInput}
          onChange={(e) => setCurInput(e.target.value)}
        />
      </div>
      <div>
        <button className={styles.btn} onClick={countStart}>
          start
        </button>
      </div>

      {status === "finished" && (
        <div className={styles.resultSection}>
          <div>
            <p className={styles.ptag}>words per minute</p>
            <p>{correct}</p>
          </div>
          <div>
            <p className={styles.ptag}>Accuracy</p>
            <p>{Math.round((correct / (correct + inCorrect)) * 100)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
