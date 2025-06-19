import { Route, Routes } from "react-router-dom";
import "./App.css";
import EditItem from "./components/EditItem";
import CreateItem from "./components/CreateItem";
import Menu from "./components/Menu";
import Nav from "./components/Nav";


function App() {
  return (
    <>
      <header><Nav /></header>
      <main>
        <p className="opening-p">only owners can visit the page</p>

      </main>
      
      <Routes>
        <Route path="/">
          <Route path="createItem" element={<CreateItem />} />
          <Route path="editItem/:id" element={<EditItem />} />
          <Route path="menu" element={<Menu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
