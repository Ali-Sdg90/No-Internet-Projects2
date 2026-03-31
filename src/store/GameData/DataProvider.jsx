import { useEffect, useState } from "react";
import { GameDataContext } from "./DataContext";

const defaultLocation = "HomePage"
// const defaultLocation = "CreateBase";

export const DataProvider = ({ children }) => {
    const [gameLocation, setGameLocation] = useState(defaultLocation);

    useEffect(() => {
        console.log(">> GAME LOCATION:", gameLocation);
    }, [gameLocation]);

    return (
        <GameDataContext.Provider value={{ gameLocation, setGameLocation }}>
            {children}
        </GameDataContext.Provider>
    );
};
