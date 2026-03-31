import React from "react";

const BaseNavigator = ({ showBaseIndex, setShowBaseIndex, baseArrays }) => {
    return (
        <div className="base-navigator">
            <div className="navigator-switcher">
                <div
                    className={`prev-arrow ${showBaseIndex === 0 && "disabled-arrow"}`}
                    onClick={() =>
                        showBaseIndex > 0
                            ? setShowBaseIndex((prevState) => prevState - 1)
                            : null
                    }
                >
                    {"<"}
                </div>
                <div className="base-bubbles">
                    {baseArrays.map((_, index) => (
                        <div
                            key={index}
                            className={`base-bubble ${
                                index === showBaseIndex ? "active-bubble" : ""
                            }`}
                            onClick={() => setShowBaseIndex(index)}
                        ></div>
                    ))}
                </div>
                <div
                    className={`next-arrow ${showBaseIndex === baseArrays.length - 1 && "disabled-arrow"}`}
                    onClick={() =>
                        showBaseIndex < baseArrays.length - 1
                            ? setShowBaseIndex((prevState) => prevState + 1)
                            : null
                    }
                >
                    {">"}
                </div>
            </div>
            <div className="base-index">{showBaseIndex + 1}</div>
        </div>
    );
};

export default BaseNavigator;
