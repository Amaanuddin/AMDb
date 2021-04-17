import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Burger from './burger';

const Nav = styled.nav`
    width: 100%;
    height: 70px;
    padding: 0 20px;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    top: 0;
    background: #44d0a3;
    .logo {
        padding: 15px 0;
        align-self: center;
        cursor: pointer;
        color: #290f8d;
    }
}
`

const Navbar = () => {
    return (
        <Nav>
             <NavLink to="/" className="logo"> <h1>AMDb</h1></NavLink>  
            <Burger />
        </Nav>
    );
}

export default Navbar