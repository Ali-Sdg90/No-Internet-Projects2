import { useEffect, useState } from "react";
import { UserDataContext } from "./DataContext";

const groundSize = 10;

export const DataProvider = ({ children }) => {
    const [userGround, setUserGround] = useState(() => {
        const ground = [];
        for (let i = 0; i < groundSize; i++) {
            ground[i] = Array(groundSize)
                .fill()
                .map(() => {
                    return [0];
                });
        }
        return ground;
    });

    useEffect(() => {
        if (userGround) {
            console.log(
                ">> USER GROUND:",
                JSON.stringify(userGround)
                    .replaceAll("[[", "\n[[")
                    .replace("[[[", "[\n[[")
                    .replace("]]]", "]]\n]")
            );
        } else if (false) {
            setUserGround([
                [[0], [0], [0]],
                [[0], [0], [0]],
                [[0], [0], [0]],
            ]);
        }
    }, [userGround]);

    return (
        <UserDataContext.Provider value={{ userGround, setUserGround }}>
            {children}
        </UserDataContext.Provider>
    );
};
