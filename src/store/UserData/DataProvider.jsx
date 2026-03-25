import { useEffect, useState } from "react";
import { UserDataContext } from "./DataContext";
import { createEmptyGround } from "../../utils/createEmptyGround";

export const DataProvider = ({ children }) => {
    const [userGround, setUserGround] = useState(createEmptyGround());

    useEffect(() => {
        if (userGround) {
            console.log(
                ">> USER GROUND:",
                JSON.stringify(userGround)
                    .replaceAll("[[", "\n[[")
                    .replace("[[[", "[\n[[")
                    .replace("]]]", "]]\n]")
            );
        }
    }, [userGround]);

    return (
        <UserDataContext.Provider value={{ userGround, setUserGround }}>
            {children}
        </UserDataContext.Provider>
    );
};
