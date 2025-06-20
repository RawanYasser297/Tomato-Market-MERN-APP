//import {useEffect} from 'react'
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/menu.css";

axios.defaults.baseURL = "https://tomato-market-mern-app-server.onrender.com";
axios.defaults.withCredentials = true;

const Menu = () => {
  // console.log("Items in Controllers:", items);
  // Check if items are being passed
  const [items, setItems] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("/admin");
      if (!response) throw new Error("Something bad happened.");
      console.log(response.data);
      setItems(response.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handelDeleteItem = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`admin/${id}`);
      if (!response.ok) {
        console.error("Fetching problems");
      }
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  console.log("ddddd" + items.map((e) => e.title));

  return (
    <div className="controllers-menu">
      <h4 className="menu-h4">menu</h4>
      <p className="menu-length">your list contain {items.length} items</p>
      <table>
        <thead>
          <th id="num"> </th>
          <th id="img" className="t-image">
            image
          </th>
          <th id="tit" className="t-title">
            title
          </th>
          <th id="price">price</th>
          <th id="offer">offer</th>
          <th id="edit">Edit</th>
          <th id="del">Delete</th>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td headers="num">
                {index + 1}
              </td>
              <td headers="img">
                <img
                  src={`https://tomato-market-mern-app-server.onrender.com/${item.image}`}
                  className="menu-images"
                />
              </td>
              <td headers="tit">{item.title}</td>
              <td headers="price">${item.price}</td>
              <td headers="offer">${item.offer}</td>
              <td headers="edit">
                <Link to={`/editItem/${item._id}`}>
                  <RxUpdate  />
                </Link>
              </td>

              <td headers="del">
                <MdDelete
                  className="MdDelete"
                  onClick={() => handelDeleteItem(item._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;

