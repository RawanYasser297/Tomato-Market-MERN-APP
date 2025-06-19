import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter} from "react-router-dom";
import ItemProvider from "./context/ItemProvider.jsx";
import MenuProvider from "./context/MenuProvider";
import UserProvider from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
    <MenuProvider>
    <ItemProvider>
      <App />
    </ItemProvider>
    </MenuProvider>
    </UserProvider>
  </BrowserRouter>
);
