import { useContext } from "react";
import { UserDataContext } from "./store/UserData/DataContext";
import AppRoute from "./routes/AppRoute";

const App = () => {
    const {} = useContext(UserDataContext);

    return (
        <div className="app-container">
            <h1 className="app-header">No Internet Project - Sea Battle React</h1>

            <AppRoute />
        </div>
    );
};

export default App;
