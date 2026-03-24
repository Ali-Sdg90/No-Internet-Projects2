import { useContext } from "react";
import { GameDataContext } from "../store/GameData/DataContext";

const HomePage = () => {
    const { setGameLocation } = useContext(GameDataContext);

    return (
        <div>
            <h1>Welcome to Sea Battle React :)</h1>
            <h2>This app was made in 1405/01/04.</h2>
            <h2>Day 24 of IRAN vs USA & ISRAEL War while internet was down.</h2>
            <h2>Good Luck ♡</h2>

            <button onClick={() => setGameLocation("CreateBase")}>
                Start Game
            </button>
        </div>
    );
};

export default HomePage;
