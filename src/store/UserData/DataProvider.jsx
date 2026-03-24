import { useEffect, useState } from "react";
import { UserDataContext } from "./DataContext";
import { baseSize } from "../../constants/config";

export const DataProvider = ({ children }) => {
    const [userGround, setUserGround] = useState(() => {
        const ground = [];
        for (let i = 0; i < baseSize; i++) {
            ground[i] = Array(baseSize)
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
