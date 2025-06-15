import { Route, Routes } from "react-router-dom";
import Graph from "./Pages/Graph";
import Home from "./Pages/Home";

const App = () => {
    return <div>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/families/:surname" element={<Graph />} />
        </Routes>
    </div>
}

export default App;