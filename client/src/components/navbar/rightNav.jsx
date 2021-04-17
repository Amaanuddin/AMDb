import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Actions from '../../store/actions';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
   a {
        color: #0D2538;
        &:hover {
                background: #ffffff;
                color: #5101d1;
                border-radius: 5px;
                padding: 0.25rem 0.5rem;
            }               
    }
    .active {
            color: #092f4e;
            background: none;
            border-bottom: 1px solid #f7f7f7;
            padding: 0 0 2px 0;

        }
  li {
    padding: 18px 10px;
    align-items: center;
   
    }
    :last-child {
        padding-right: 25px;
    }    
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: -16px;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    align-items: baseline;
    .active {
        color: #fff;
        background: none;
        border-bottom: 1px solid #44d0a3;
        padding: 0 0 2px 0;
    }
    li {
      a {
            color: #fff;
            &:hover {
                background: #ffffff;
                color: #5101d1;
                border-radius: 5px;
                padding: 0.25rem 0.5rem;
            }
        
    }
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
    @media (max-width: 768px) {
        padding: 0;
        width: 70px;
        height: 30px;
        text-align: left;
    }
`;

const RightNav = (props) => {
    const { user: { token }, open, setOpen } = props;
  return (
    <Ul open={open} onClick = {() => setOpen()}>
        {!token && (
            <li>
            <NavLink to="/login" >Login</NavLink>
            </li>
        )}
        <li>
            <NavLink exact to="/">Home</NavLink>
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
    </Ul>
  )
}

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
)(RightNav);
