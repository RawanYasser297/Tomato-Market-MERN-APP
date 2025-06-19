import { useState } from "react";
import axios from "axios";
import categoryList from '../category';
import "./css/admin.css";
//import { BiSolidPlusSquare } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
axios.defaults.baseURL = "https://tomato-market-mern-app-server.onrender.com";
axios.defaults.withCredentials = true;
const CreateItem = () => {
  const [image, setImage] = useState('');
  const [category, setCategory] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [title, setTitle] = useState(" ");
  const [rating, setRating] = useState(" ");
  const [about, setAbout] = useState(" ");
  const [offer, setOffer] = useState(" ");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(null);
  const navigate=useNavigate()

  const data = {
    title,
    category,
    price,
    image,
    rating,
    about,
    offer,
  };

  const newItem = async (e) => {

    e.preventDefault();

    if (title.length < 8) {
      setErr("title required please");
      throw new Error("Something bad happened.");
    }

    try {
      const response = await axios.post(
        "/admin/createItem",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response) {
        setErr("Something bad happened.");
      }
      console.log(response.data);
      setErr(null);
      setMsg("added successfully");
      setTimeout(() => {
        setMsg(null);
        setAbout(" ");
        setCategory(" ");
        setPrice(" ");
        setImage(" ");
        setRating(" ");
        setOffer(" ");
        setTitle(" ");
        navigate('/')
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <form className="container"  onSubmit={newItem} encType="multipart/form-data" >
      <h4 style={{ fontWeight: "bolder", marginBottom: "10px" }}>
        add new item
      </h4>
      
      <div className="new-item-container ">
         <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        

        <div className="newItems-inputs-div">
          <input
            name="title"
            type="text"
            onChange={(e) => {
              setErr(null);
              setTitle(e.target.value);
            }}
            placeholder="title"
            style={err && { border: "red solid 2px" }}
          />
          {err && (
            <>
              <p style={{ color: "#ff0000", fontWeight: "bold" }}>{err}</p>
            </>
          )}
        </div>
        <input
          type="number"
          name="price"
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          name="about"
          onChange={(e) => setAbout(e.target.value)}
          placeholder="about"
        />

        <input
          type="text"
          name="rating"
          onChange={(e) => setRating(e.target.value)}
          placeholder="rate the item from 1 to 5"
        />

        <input
          type="text"
          name="offer"
          onChange={(e) => setOffer(e.target.value)}
          placeholder="add offer percentage %"
        />
        <select name="category" onChange={(e) => setCategory(e.target.value)}>
          <option value=''>choose category</option>
          {categoryList.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="button" style={{ margin: "15px" }}>
        add
      </button>
      {msg && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            padding: "5px",
            fontSize: "x-large",
          }}
        >
          <FaCheck style={{ color: "green" }} />
          <p style={{ color: "green", fontWeight: "bold" }}>{msg}</p>
        </div>
      )}
      <Link to="/admin" className="back-link">
        back to menu
      </Link>
    </form>
  );
};

export default CreateItem;
