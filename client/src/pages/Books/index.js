/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

import "./style.css";
import { FiPower, FiEdit, FiTrash2 } from "react-icons/fi"

import logoImage from "../../assets/logo.svg";

export default () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const accessToken = localStorage.getItem("accessToken");
  const authorization = { 
      headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }


  useEffect(() => {
      fetchMoreBooks();
  }, [accessToken]);

  async function fetchMoreBooks(){
    const response = await api.get(`api/book/v1/asc/4/${page}`, authorization);
    setBooks([...books, ...response.data.list]);
    setPage(page + 1);
  }

async function deleteBook(id){
  try {
    await api.delete(`api/book/v1/${id}`, authorization);
    setBooks(books.filter(book => book.id !== id));

  } catch (error) {
    alert("Delete Book failed! Try again.");
  }
  navigate('/books');
}

async function logout(){
  try {
    await api.get('api/auth/v1/revoke', authorization);
    localStorage.clear();
  } catch (error) {
    alert("Logout failed! Try again.");
  }
  navigate('/');
}

async function editBook(id){
  try {
    navigate(`/book/${id}`);
  } catch (error) {
    alert("Edit Book failed! Try again.");
  }
}

  return (
    <div className="book-container">
      <header>
        <img src={logoImage} alt="Erudio" />
        <span>Bem-vindo(a), <strong>{userName.toUpperCase()}</strong>!</span>
        <Link className="button" to="/book">Add New Book</Link>
        <button type="button" onClick={logout}><FiPower size={18} color="#251FC5" /></button>
      </header>

      <h1>Registered Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>Title:</strong>
            <p>{book.title}</p>
            <strong>Author:</strong>
            <p>{book.author}</p>
            <strong>Price:</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
            <strong>Release Date:</strong>
            <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>
            <button type="button" onClick={() => editBook(book.id)}><FiEdit size={20} color="#251FC5" /></button>
            <button type="button" onClick={() => deleteBook(book.id)}><FiTrash2 size={20} color="#251FC5" /></button>
          </li>
        ))}
      </ul>
      <button className="button" onClick={fetchMoreBooks} type="button">Load more</button>
    </div>
  )
}
