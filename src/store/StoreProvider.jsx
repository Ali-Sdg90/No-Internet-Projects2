import React from "react";
import { DataProvider as UserDataProvider } from "./UserData/DataProvider";
import { DataProvider as GameDataContext } from "./GameData/DataProvider";

const StoreProvider = ({ children }) => {
    return (
        <>
            <GameDataContext>
                <UserDataProvider>
                    <>{children}</>
                </UserDataProvider>
            </GameDataContext>
        </>
    );
};

export default StoreProvider;
