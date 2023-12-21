import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home" className='px-3'>Libreria Nyarlathotep</Navbar.Brand>
      <Nav className="mr-auto px-5">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <Nav.Link href="#contact">Browse</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default MyNavbar;
