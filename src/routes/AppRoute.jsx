import { useContext } from "react";
import { GameDataContext } from "../store/GameData/DataContext";

import HomePage from "../pages/HomePage";
import BuyPage from "../pages/BuyPage";
import GamePage from "../pages/GamePage";
import PageNotFound from "../pages/PageNotFound";
import CreateBasePage from "../pages/CreateBasePage";

const AppRoute = () => {
    const { gameLocation } = useContext(GameDataContext);

    switch (gameLocation) {
        case "HomePage":
            return <HomePage />;
        case "CreateBase":
            return <CreateBasePage />;
        case "BuyPage":
            return <BuyPage />;
        case "GamePage":
            return <GamePage />;
        default:
            return <PageNotFound />;
    }
};

export default AppRoute;
