import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
} from "react-native";

export default function App() {
  const [stats, setStats] = React.useState([]);
  const [screen, setScreen] = React.useState("1");
  const [finalScore, setFinalScore] = React.useState(0);
  console.log(screen);

  return (
    <View style={styles.container}>
      {screen === "1" ? (
        <StartScreen setScreen={setScreen}></StartScreen>
      ) : screen === "2" ? (
        <GameScreen
          setScreen={setScreen}
          setStats={setStats}
          setFinalScore={setFinalScore}
        ></GameScreen>
      ) : screen === "3" ? (
        <LastScreen
          totalStats={stats}
          finalScore={finalScore}
          setScreen={setScreen}
        ></LastScreen>
      ) : null}
    </View>
  );
}

const StartScreen = (props) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#344955", fontSize: 30, fontWeight: "bold" }}>
        Can u Guess?
      </Text>

      <Pressable style={styles.startBtn} onPress={() => props.setScreen("2")}>
        <Text style={{ color: "#344955", fontSize: 25, padding: 10 }}>
          Start Game
        </Text>
      </Pressable>
    </View>
  );
};

const GameScreen = ({ setScreen, setStats, setFinalScore }) => {
  const [inputGuess, setInputGuess] = React.useState("");
  const [guess, setGuess] = React.useState(Math.floor(Math.random() * 50));
  const [tries, setTries] = React.useState(5);
  const [score, setScore] = React.useState(0);
  const [round, setRound] = React.useState(1);
  const [hintModal, setHintModal] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [innerStats, setInnerStats] = React.useState([]);
  const [hintsTaken, setHintsTaken] = React.useState(0);
  const checkWin = () => {
    setResult("");
    if (tries >= 1) {
      setTries(tries - 1);
      console.log("computer num is " + guess + " My guess is " + inputGuess);

      if (inputGuess == guess) {
        console.log("Yess correct guesss");
        setScore(score + 10);
        setResult("Boom!! What A Guess. Let's play more");
        console.log("my score " + score);
        storeStats();
        roundReset();
      } else {
        setResult("Hard luck! Guess Again");
      }
    } else {
      setResult("The number was " + guess + "! ");
      storeStats();
      roundReset();
    }
  };

  const roundReset = () => {
    setRound(round + 1);
    setGuess(Math.floor(Math.random() * 20));
    setInputGuess("");
    setTries(5);
    setHintsTaken(0);
    // setResult("");
  };

  const storeStats = () => {
    console.log(round, hintsTaken, score, guess);
    let statsObj = {
      roundNo: round,
      hintsTaken: hintsTaken,
      actualNum: guess,
    };

    let newArr = [...innerStats, statsObj];
    setInnerStats(newArr);
    console.log(innerStats);
  };
  const closeHintModal = () => {
    setHintModal(false);
  };

  const endRound = () => {
    setStats(innerStats);
    setFinalScore(score);
  };
  const generateHint = () => {
    if (inputGuess > guess) {
      return "Think of a bit less";
    } else if (inputGuess < guess) {
      return "Think of something higher!";
    } else {
      return "Bull's eye";
    }
  };

  const userInput = (val) => {
    let newStr = inputGuess + val;
    setInputGuess(newStr);
  };

  return (
    <View style={{ marginTop: 85 }}>
      {hintModal ? (
        <HintModal modalSwitch={closeHintModal} msg={generateHint}></HintModal>
      ) : null}
      <View style={{ marginTop: 35 }}>
        <Text style={styles.stats}>Tries left: {tries} </Text>
        <Text style={styles.stats}>Round: {round}</Text>
        <Text style={styles.stats}>Score: {score}</Text>
        <View
          style={{
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.stats}>{result}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#344955",
              marginTop: 25,
            }}
          >
            {inputGuess}
          </Text>
        </View>
      </View>
      <View style={styles.pad}>
        <View style={styles.row}>
          <Pressable style={styles.padBtns} onPress={() => userInput("1")}>
            <Text style={styles.nums}>1</Text>
          </Pressable>

          <Pressable style={styles.padBtns} onPress={() => userInput("2")}>
            <Text style={styles.nums}>2</Text>
          </Pressable>

          <Pressable style={styles.padBtns} onPress={() => userInput("3")}>
            <Text style={styles.nums}>3</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.padBtns} onPress={() => userInput("4")}>
            <Text style={styles.nums}>4</Text>
          </Pressable>

          <Pressable style={styles.padBtns} onPress={() => userInput("5")}>
            <Text style={styles.nums}>5</Text>
          </Pressable>

          <Pressable style={styles.padBtns} onPress={() => userInput("6")}>
            <Text style={styles.nums}>6</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.padBtns} onPress={() => userInput("7")}>
            <Text style={styles.nums}>7</Text>
          </Pressable>

          <Pressable style={styles.padBtns} onPress={() => userInput("8")}>
            <Text style={styles.nums}>8</Text>
          </Pressable>

          <Pressable style={styles.padBtns} onPress={() => userInput("9")}>
            <Text style={styles.nums}>9</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.padBtns} onPress={() => userInput("0")}>
            <Text style={styles.nums}>0</Text>
          </Pressable>
          <Pressable
            style={styles.checkBtns}
            onPress={() => {
              setInputGuess("");
              setResult("");
            }}
          >
            <Text style={{ fontSize: 15 }}>Clear</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.checkBtns} onPress={() => checkWin()}>
            <Text>Guess</Text>
          </Pressable>
          <Pressable
            style={styles.checkBtns}
            onPress={() => {
              setHintModal(true);
              setScore(score - 2);
              setHintsTaken(hintsTaken + 1);
            }}
          >
            <Text>Hint</Text>
          </Pressable>

          <Pressable
            style={styles.end}
            onPress={() => {
              endRound();
              setScreen("3");
            }}
          >
            <Text>End</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const HintModal = ({ modalSwitch, msg }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{msg()}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => modalSwitch()}
            >
              <Text style={styles.textStyle}>Got it!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const LastScreen = ({ totalStats, setScreen, finalScore }) => {
  console.log(totalStats);
  return (
    <View style={styles.statsView}>
      <Text
        style={{
          color: "#344955",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 90,
        }}
      >
        STATISTICS
      </Text>

      <ScrollView style={{ marginTop: 55 }}>
        {totalStats.map((i, index) => {
          return (
            <View key={index}>
              <Text
                style={{
                  color: "#344955",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Round No:{"   " + i.roundNo + "   "}
                Hints taken:{"    " + i.hintsTaken + "   "}
                Actual Num:{"   " + i.actualNum + "   "}
              </Text>
            </View>
          );
        })}
        <Text
          style={{
            color: "#344955",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Final Score: {finalScore}
        </Text>
      </ScrollView>
      <View style={{ flexDirection: "row", height: "10%", marginBottom: 100 }}>
        <Pressable style={styles.padBtns} onPress={() => setScreen("2")}>
          <Text style={styles.nums}>Play Again</Text>
        </Pressable>

        <Pressable style={styles.padBtns} onPress={() => setScreen("1")}>
          <Text style={styles.nums}>Finish</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsView: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  startBtn: {
    backgroundColor: "#F9AA33",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#004d40",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
    margin: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    height: "15%",
  },
  padBtns: {
    borderRadius: 20,
    width: "30%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    backgroundColor: "#344955",
  },
  pad: {
    marginTop: 75,
  },
  nums: {
    fontSize: 20,
    color: "#F9AA33",
  },
  stats: {
    fontSize: 20,
    color: "#344955",
  },
  end: {
    // marginTop: 20,
    borderRadius: 10,
    width: "30%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    backgroundColor: "red",
    color: "#344955",
    borderWidth: 0.5,
  },
  checkBtns: {
    // marginTop: 20,
    borderRadius: 20,
    width: "30%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    backgroundColor: "#F9AA33",
    color: "#344955",
    borderWidth: 0.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: "25%",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 0.25,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#344955",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#F9AA33",
    fontWeight: "bold",
  },
});
