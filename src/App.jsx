import { useState } from 'react'
import './App.css'
import Navbar from './Component/Navbar/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Popular from './Component/MainContent/Popular/Popular';
import TopRated from './Component/MainContent/TopRated/TopRated';
import MovieDetails from './Component/Details/MovieDetails';
import FavoriteMovie from './Component/MainContent/favorite/FavoriteMovie';
import Home from './Component/MainContent/home/Home';
import Footer from './Component/Footer/Footer';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/toprated' element={<TopRated />} />
        <Route path='/favorite' element={<FavoriteMovie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
export default App
