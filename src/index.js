import { createRoot } from "react-dom/client";
import App from "./App";
import { ApiProvider } from "./Context/apiContext";

const root = createRoot(document.getElementById('root'))
root.render(
    <ApiProvider>
        <App />
    </ApiProvider>
)