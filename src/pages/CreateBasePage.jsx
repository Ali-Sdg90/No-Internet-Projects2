import { useContext, useEffect } from "react";
import { UserDataContext } from "../store/UserData/DataContext";
import { baseSize } from "../constants/config";

const baseArray = [];

const CreateBasePage = () => {
    const { userGround, setUserGround } = useContext(UserDataContext);

    const getRandomNumber = (min, max) => {
        return min + Math.floor(Math.random() * (max - min));
    };

    const replantSeed = (sizeOfShip) => {
        const shipSeed_i = getRandomNumber(0, baseSize - sizeOfShip);
        const shipSeed_j = getRandomNumber(0, baseSize - sizeOfShip);

        // console.log(shipSeed_i, shipSeed_j);
        // console.log(sizeOfShip, baseSize - sizeOfShip);

        const shipSeed_dir = getRandomNumber(0, 2);

        return [shipSeed_i, shipSeed_j, shipSeed_dir];
    };

    const addWaterShadow = (newBase, ship_i, ship_j) => {
        // const copyOfNewBase = newBase;
        let copyOfNewBase = JSON.parse(JSON.stringify(newBase));

        // debugger;

        for (let shadowIteration = 0; shadowIteration < 9; shadowIteration++) {
            const x = ship_i + Math.floor(shadowIteration / 3) - 1;
            const y = ship_j + (shadowIteration % 3) - 1;

            if (
                x >= 0 &&
                x < copyOfNewBase.length &&
                y >= 0 &&
                y < (copyOfNewBase[x] ? copyOfNewBase[x].length : 0)
            ) {
                const currentItem = copyOfNewBase[x][y];

                // console.log(`x: ${x}, y: ${y}, currentItem:`, currentItem);

                if (
                    Array.isArray(currentItem) &&
                    currentItem.toString() !== "0"
                ) {
                    continue;
                } else {
                    copyOfNewBase[x][y] = [2];
                }
            }
        }
        return copyOfNewBase;
    };

    const checkNeighbors = (ship_i, ship_j, shipTile) => {
        if (shipTile === 0) {
            return false;
        }

        const copyOfNewBase = userGround;

        let numberOf_0_s = 9;

        for (let radarIteration = 0; radarIteration < 9; radarIteration++) {
            const x = ship_i + Math.floor(radarIteration / 3) - 1;
            const y = ship_j + (radarIteration % 3) - 1;

            if (
                x >= 0 &&
                x < copyOfNewBase.length &&
                y >= 0 &&
                y < (copyOfNewBase[x] ? copyOfNewBase[x].length : 0)
            ) {
                const currentItem = copyOfNewBase[x][y];

                // console.log(
                //     `x: ${x}, y: ${y}, currentItem:`,
                //     currentItem.toString()
                // );

                if (!Array.isArray(currentItem)) {
                    continue;
                }

                if (currentItem.toString() === "0") {
                    numberOf_0_s--;
                }
            }
        }

        console.log(">>>>", ship_i, ship_j, numberOf_0_s);

        // debugger;

        if (numberOf_0_s === 0) {
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

            while (shipConstructionIteration < 4) {
                ++shipConstructionIteration;
                // console.log(
                //     "shipConstructionIteration >>",
                //     ++shipConstructionIteration
                // );

                sizeOfShip -= 1;
                numberOfShip += 1;

                console.log("-------", "Ship Size >>", sizeOfShip);

                Array(numberOfShip)
                    .fill()
                    .forEach((_) => {
                        let isShipSeedOk = false;

                        let shipSeed_i = null;
                        let shipSeed_j = null;
                        let shipSeed_dir = null;

                        while (!isShipSeedOk) {
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

                                // console.log(current_i, current_j);

                                // debugger;

                                if (
                                    checkNeighbors(
                                        current_i,
                                        current_j,
                                        shipTile
                                    )
                                ) {
                                    // BAD SEED
                                    console.log(
                                        "BAD SEED >>",
                                        current_i,
                                        current_j
                                    );
                                    continue;
                                } else {
                                    seedPoint++;
                                }

                                if (seedPoint === sizeOfShip) {
                                    isShipSeedOk = true;
                                }
                            }
                        }

                        console.log(
                            "GOOD SEED >>",
                            shipSeed_i,
                            shipSeed_j,
                            shipSeed_dir
                        );

                        for (
                            let shipTile = 0;
                            shipTile < sizeOfShip;
                            shipTile++
                        ) {
                            setUserGround((prevState) => {
                                // let newBase = [...prevState];
                                let newBase = JSON.parse(
                                    JSON.stringify(prevState)
                                );

                                if (shipSeed_dir) {
                                    newBase[shipSeed_i + shipTile][shipSeed_j] =
                                        [1]; // Vertical
                                    newBase = addWaterShadow(
                                        newBase,
                                        shipSeed_i + shipTile,
                                        shipSeed_j
                                    );
                                } else {
                                    newBase[shipSeed_i][shipSeed_j + shipTile] =
                                        [1]; // Horizontal
                                    newBase = addWaterShadow(
                                        newBase,
                                        shipSeed_i,
                                        shipSeed_j + shipTile
                                    );
                                }

                                return newBase;
                            });

                            debugger;
                        }
                    });
            }
        };
        createBase();
    }, []);

    useEffect(() => {
        if (userGround) {
            console.log(
                ">> USER GROUND:",
                JSON.stringify(userGround)
                    .replaceAll("[[", "\n[[")
                    .replace("[[[", "[\n[[")
                    .replace("]]]", "]]\n]")
                    .replaceAll("0", " ")
            );
        }
    }, [userGround]);

    // useEffect(() => {
    //     if (userGround) {
    //         baseArray.push(userGround);
    //     }
    // }, [userGround]);

    return (
        <div>
            <div className="showcase-base">
                {userGround?.length
                    ? userGround.map((i, index) => {
                          return (
                              <div key={index} className="base-row">
                                  {i.map((j, index) => {
                                      {
                                          return j.toString() === "1" ? (
                                              <div
                                                  key={index}
                                                  className="ship-tile"
                                              ></div>
                                          ) : j.toString() === "0" ? (
                                              <div
                                                  key={index}
                                                  className="water-tile"
                                              ></div>
                                          ) : (
                                              <div
                                                  key={index}
                                                  className="border-tile"
                                              ></div>
                                          );
                                      }
                                  })}
                              </div>
                          );
                      })
                    : "Loading..."}
            </div>
        </div>
    );
};

export default CreateBasePage;
