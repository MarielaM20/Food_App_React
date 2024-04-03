import React from 'react';
import Navbar from "./components/NavBar/Navbar"; 
import AddFood from "./components/AddFood/AddFood";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import EditFood from "./components/EditFood/EditFood";
import { Container } from '@material-ui/core';
import SearchBar from "./components/SearchBar/SearchBar"; 
import FoodData from "./Database/db.json";
import './App.css'; 

function App() {
    return (
        <Container>
            <BrowserRouter> 
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchBar placeholder="Enter a Food Name..." data={FoodData.foods}  />} />
                    <Route path="/add" element={<AddFood />} />
                    <Route path="/edit/:id" element={<EditFood />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
