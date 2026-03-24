import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../store/UserData/DataContext";

const Water = "0";
const Ship = "1";

const CreateBasePage = () => {
    const { userGround } = useContext(UserDataContext);

    const baseArray = [];

    return (
        <div>
            <div className="showcase-base">
                {userGround?.length
                    ? userGround.map((i, index) => {
                          return (
                              <div key={index} className="base-row">
                                  {i.map((j, index) => {
                                      return (
                                          <div key={index}>
                                              {j.toString() === "0"
                                                  ? Water
                                                  : Ship}
                                          </div>
                                      );
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
