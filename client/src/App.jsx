import { Routes, Route } from "react-router-dom";
import NaveBar from "./components/navBar/NavBar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import PlaceOrder from "./pages/PlaceOrder";
import Item from "./components/bestSeller/Item";
import ItemsCategory from "./components/category/ItemsCategory";
import Footer from "./components/footer/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext, useEffect, useState } from "react";
import Nav from "./components/mobile/Nav";
import { ItemContext } from "./context/ItemProvider";
import AuthProvider from "./provider/AuthProvider";
import Alert from './components/alert/Alert'
import { UserContext } from "./context/UserContext";
import CancelOrder from "./components/stripe/CancelOrder";
import { VerifyOrder } from "./components/stripe/VerifyOrder";
import PersistLogin from './components/persist/PersistLogin'
import UserOrder from "./components/stripe/UserOrder";


function App() {
  const [clickLogin, setClickLogin] = useState("false");
  const {open,setOpen,}=useContext(ItemContext)
  const {alert,user,persist}=useContext(UserContext)

  useEffect(()=>{
    persist?console.log('remember me'):console.log('do not remember me')
    },[persist])
    
    
  console.log(user)
  console.log(typeof persist)
  console.log(persist)
  return (
    <div className="app">
      <NaveBar clickLogin={clickLogin} setClickLogin={setClickLogin} />
      {open?<Nav />:""}
      <Routes>
      <Route element={<PersistLogin  />}>
      <Route path="/" element={<Home clickLogin={clickLogin} setClickLogin={setClickLogin} />  }/>

        <Route path="/Item/:id" element={<Item />}  />
        <Route path="/category/:category" element={<ItemsCategory />}  />
        <Route path="/login"    element={<Login onClick={()=>setOpen(!open)}/>}  />
        <Route path="/register" element={<Register onClick={()=>setOpen(!open)} />}  />
        <Route path="/verifyOrder" element={<VerifyOrder />} /> 
        <Route  element={<AuthProvider  />}>
        <Route path="/cart" element={<Cart  />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/cancel" element={<CancelOrder />} />
        <Route path="/userOrders" element={<UserOrder />} />
        </Route>
      </Route>
      </Routes>
      <Footer />
      {
        !user?!alert && <Alert />:''
      }

    </div>
  );
}

export default App;
