import React from 'react';
import './NavBar.css'; // Import CSS file
import { Box, AppBar, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

function MyComponent() {
  return (
    <Box className="component">
      <AppBar position="static" className="headerBar">
        <Toolbar className="nav">
          <NavLink to="./" className="tabs">Home</NavLink>
          <NavLink to="search" className="tabs">Search</NavLink>
          <NavLink to="add" className="tabs">Add Food</NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MyComponent;