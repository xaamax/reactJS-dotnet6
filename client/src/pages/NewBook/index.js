/* eslint-disable import/no-anonymous-default-export */
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import "./style.css";

import api from "../../services/api";
import {useNavigate, useParams} from "react-router-dom";

import {FiArrowLeft} from "react-icons/fi"
import logoImage from "../../assets/logo.svg";

export default () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const authorization = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
  
  const {bookID} = useParams();

  useEffect(() => {
    if(bookID) loadBook();
  }, [bookID])

  async function loadBook(){
    try {
      const response = await api.get(`api/book/v1/${bookID}`, authorization);
      let formatDate = response.data.launchDate.split("T",10)[0];
      setAuthor(response.data.author);
      setTitle(response.data.title);
      setPrice(response.data.price);
      setLaunchDate(formatDate);
    } catch (error) {
        alert("Error recorvery Book.")
        navigate("/books");
    }
  }

  async function saveOrUpdate(e){
    e.preventDefault();

    let method = bookID ? "put" : "post";
    const data = {
      author,
      title,
      price,
      launchDate
    }
    if(method === "put") data.id = bookID;
    try {
      await api[method](`api/book/v1`, data, authorization);
    } catch (error) {
      alert("Error while recording Book! Try again.");
    }
    navigate('/books');
  }


  
  return (
    <div className="new-book-container">
        <div className="content">
            <section className="form">
                <img src={logoImage} alt="Erudio" />
                <h1>{bookID ? "Update " : "Add New "}Book</h1>
                <p>Enter the book information and click on 'Add'.</p>
                <Link className="back-link" to="/books"><FiArrowLeft size={16} color="#251FC5" />Back to Books</Link>
            </section>
            <form onSubmit={saveOrUpdate}>
              <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
              <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
              <input type="date" value={launchDate} onChange={e => setLaunchDate(e.target.value)}/>
              <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)}/>
              <button className="button" type="submit">{bookID ? "Update" : "Add"}</button>
            </form>
        </div>
    </div>
  );
}