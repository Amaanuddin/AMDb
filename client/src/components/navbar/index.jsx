import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Actions from '../../store/actions';
import { connect } from 'react-redux';

const Header = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 3.5rem;
    background: #5101d1;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`;

const Logo = styled.div`
    h1{
        margin: 0;
        font-size: 1.5rem;
        color: #dfcefc;
    }
`;

const Nav = styled.nav`
    margin-left: 1.5rem;
    ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        align-items: center;
    }

    li {
        margin: 0 1rem;
    }
    a {
        text-decoration: none;
        color: white;
        padding: 0.25rem 0.5rem;
        border: none;
        font: inherit;
        background: transparent;
        cursor: pointer;
        vertical-align: middle;
        margin: 0;
        &:hover {
            background: #ffffff;
            color: #5101d1;
            border-radius: 5px;
        }
        &.active {
            background: #ffffff;
            color: #5101d1;
            border-radius: 5px;
        }
    }

`;

const Button = styled.button`
    text-decoration: none;
    color: white;
    padding: 0.25rem 0.5rem;
    border: none;
    font: inherit;
    background: transparent;
    cursor: pointer;
    vertical-align: middle;
    margin: 0;
    &:hover {
        background: #ffffff;
        color: #5101d1;
        border-radius: 5px;
    }
`;

const Navbar = props => {
    const { user: { token } } = props;
    return (
        <Header >
            <Logo>
                <h1>AMDb</h1>
            </Logo>
            <Nav>
                <ul>
                    {!token && (
                        <li>
                        <NavLink to="/login" >Login</NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {token && ( 
                        <>
                            <li>
                                <NavLink to="/favorites">Favorites</NavLink>
                            </li>
                            <li>
                                <Button onClick={() => {
                                    localStorage.removeItem('token')
                                    props.signOut();
                                }}>Logout</Button>
                            </li>
                        </>
                    )} 
                </ul>
            </Nav>
        </Header>
    );
    
};

const mapDispatchToProps = (dispatch) => ({
  signOut: (...params) => {
    dispatch(Actions.storeUserProfile.signOut(...params));
  }
});
const mapStateToProps = (state) => ({
  user: state.user
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);