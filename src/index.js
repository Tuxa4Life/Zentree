import { createRoot } from "react-dom/client";
import App from "./App";
import { ApiProvider } from "./Context/apiContext";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById('root'))
root.render(
    <ApiProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApiProvider>
)