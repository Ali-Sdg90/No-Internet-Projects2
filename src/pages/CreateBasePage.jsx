import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../store/UserData/DataContext";
import { baseSize } from "../constants/config";
import { getRandomNumber } from "../utils/getRandomNumber";
import { createEmptyGround } from "../utils/createEmptyGround";

const baseArrays = [];

const CreateBasePage = () => {
    // const { userGround, setUserGround } = useContext(UserDataContext);
    const [showBaseIndex, setShowBaseIndex] = useState(-1);

    // Creates new seed with random x, y and direction
    const replantSeed = (sizeOfShip) => {
        const shipSeed_i = getRandomNumber(0, baseSize - sizeOfShip);
        const shipSeed_j = getRandomNumber(0, baseSize - sizeOfShip);
        const shipSeed_dir = getRandomNumber(0, 2);

        // console.log(shipSeed_i, shipSeed_j);

        return [shipSeed_i, shipSeed_j, shipSeed_dir];
    };

    // After a location is found to be okay to place the ship, add shadow to the water around the ship tile
    const addWaterShadow = (newBase, ship_i, ship_j) => {
        for (let shadowIteration = 0; shadowIteration < 9; shadowIteration++) {
            const x = ship_i + Math.floor(shadowIteration / 3) - 1;
            const y = ship_j + (shadowIteration % 3) - 1;

            if (
                x >= 0 &&
                x < newBase.length &&
                y >= 0 &&
                y < (newBase[x] ? newBase[x].length : 0)
            ) {
                const currentItem = newBase[x][y];

                if (
                    Array.isArray(currentItem) &&
                    currentItem.toString() !== "0"
                ) {
                    continue;
                } else {
                    newBase[x][y] = [2]; // "2" is for shadows around ship tile
                }
            }
        }
        return newBase;
    };

    // Around the selected tile, there must not be any ship; if so, the tile will be okay to continue
    const checkNeighbors = (ship_i, ship_j, newBase) => {
        let numberOf_1_s = 0;

        for (let radarIteration = 0; radarIteration < 9; radarIteration++) {
            const x = ship_i + Math.floor(radarIteration / 3) - 1;
            const y = ship_j + Math.floor(radarIteration % 3) - 1;

            if (
                x >= 0 &&
                x < newBase.length &&
                y >= 0 &&
                y < (newBase[x] ? newBase[x].length : 0)
            ) {
                const currentItem = newBase[x][y];

                // console.log(
                //     `x: ${x}, y: ${y}, currentItem:`,
                //     currentItem.toString()
                // );

                if (!Array.isArray(currentItem)) {
                    continue;
                }

                if (currentItem.toString() === "1") {
                    numberOf_1_s++;
                }
            }
        }

        // console.log("CheckNeighbors Process>>", ship_i, ship_j, numberOf_1_s);

        if (numberOf_1_s === 0) {
            return false;
        } else {
            return true;
        }
    };

    useEffect(() => {
        const createBase = () => {
            let shipConstructionIteration = 0;
            let numberOfShip = 0;
            let sizeOfShip = 5;

            let newBase = createEmptyGround();

            while (shipConstructionIteration++ < 4) {
                sizeOfShip -= 1; // 4 to 1
                numberOfShip += 1; // 1 to 4

                console.log("-------", "Ship Size >>", sizeOfShip);

                Array(numberOfShip)
                    .fill()
                    .forEach((_) => {
                        let isShipSeedOk = false;
                        let maxRetries = 100;
                        let retries = 0;

                        let shipSeed_i = null;
                        let shipSeed_j = null;
                        let shipSeed_dir = null;

                        // Check if the ship is okay to place on the ground or not
                        while (!isShipSeedOk && retries++ < maxRetries) {
                            isShipSeedOk = false;

                            [shipSeed_i, shipSeed_j, shipSeed_dir] =
                                replantSeed(sizeOfShip);

                            let seedPoint = 0;

                            for (
                                let shipTile = 0;
                                shipTile < sizeOfShip;
                                shipTile++
                            ) {
                                let current_i = shipSeed_i;
                                let current_j = shipSeed_j + shipTile;
                                if (shipSeed_dir) {
                                    current_i = shipSeed_i + shipTile;
                                    current_j = shipSeed_j;
                                }

                                if (
                                    checkNeighbors(
                                        current_i,
                                        current_j,
                                        newBase
                                    )
                                ) {
                                    console.log(
                                        "BAD SEED >>",
                                        current_i,
                                        current_j
                                    );
                                    continue;
                                } else {
                                    seedPoint++;
                                }

                                // if all tiles of the ship pass the checkNeighbors function
                                // and the score of the ship is equal to the ship size, it means
                                // all tiles of the ship are okay and it can go out of the
                                // loop and be placed on the ground
                                if (seedPoint === sizeOfShip) {
                                    isShipSeedOk = true;
                                }
                            }
                        }

                        if (retries >= maxRetries) {
                            console.log(
                                "Max retries reached for ship size",
                                sizeOfShip
                            );
                            return;
                        }

                        console.log(
                            "GOOD SEED >>",
                            shipSeed_i,
                            shipSeed_j,
                            shipSeed_dir
                        );

                        // Add the ships to the newBase
                        for (
                            let shipTile = 0;
                            shipTile < sizeOfShip;
                            shipTile++
                        ) {
                            let current_i = shipSeed_i;
                            let current_j = shipSeed_j + shipTile;
                            if (shipSeed_dir) {
                                current_i = shipSeed_i + shipTile;
                                current_j = shipSeed_j;
                            }

                            newBase[current_i][current_j] = [1];
                            newBase = addWaterShadow(
                                newBase,
                                current_i,
                                current_j
                            );

                            // debugger;

                            // console.log(
                            //     ">> USER GROUND:",
                            //     JSON.stringify(newBase)
                            //         .replaceAll("[[", "\n[[")
                            //         .replace("[[[", "[\n[[")
                            //         .replace("]]]", "]]\n]")
                            //         .replaceAll("0", " ")
                            // );
                        }
                    });
            }

            // Create a shallow copy of the newBase and place it in the setUserGround state
            newBase = [...newBase];
            // setUserGround(newBase);
            baseArrays.push(newBase);
        };

        Array(5)
            .fill()
            .forEach(() => createBase());

        setShowBaseIndex(2);

        // console.log("===>", baseArrays);
    }, []);

    return (
        <div>
            <div className="page-elements">
                {baseArrays?.length > 0 ? (
                    <>
                        <div className="showcase-base">
                            {showBaseIndex !== -1
                                ? baseArrays[showBaseIndex].map((i, index) => {
                                      return (
                                          <div key={index} className="base-row">
                                              {i.map((j, index) => {
                                                  {
                                                      return j.toString() ===
                                                          "1" ? (
                                                          <div
                                                              key={index}
                                                              className="ship-tile"
                                                          ></div>
                                                      ) : j.toString() ===
                                                        "0" ? (
                                                          <div
                                                              key={index}
                                                              className="water-tile"
                                                          ></div>
                                                      ) : (
                                                          <div
                                                              key={index}
                                                              className={
                                                                  // For Testing
                                                                  true
                                                                      ? "border-tile"
                                                                      : "water-tile"
                                                              }
                                                          ></div>
                                                      );
                                                  }
                                              })}
                                          </div>
                                      );
                                  })
                                : "Loading..."}
                        </div>
                        <div>
                            <div
                                className="prev-arrow"
                                onClick={() =>
                                    showBaseIndex > 0
                                        ? setShowBaseIndex(
                                              (prevState) => prevState - 1
                                          )
                                        : null
                                }
                            >
                                {"<"}
                            </div>
                            <div className="base-index">
                                {showBaseIndex + 1}
                            </div>
                            <div
                                className="next-arrow"
                                onClick={() =>
                                    showBaseIndex < baseArrays.length - 1
                                        ? setShowBaseIndex(
                                              (prevState) => prevState + 1
                                          )
                                        : null
                                }
                            >
                                {">"}
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default CreateBasePage;
