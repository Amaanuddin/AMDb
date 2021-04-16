import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Actions from '../../store/actions';
import axios from 'axios';

const ContainerDiv = styled.div`
    display: block;
    text-align: -webkit-center;
`;

const ButtonDiv = styled.div`
    text-align: center;
    cursor: pointer;
    margin: 16px 0 0 0;
    background: #5101d1;
    width: fit-content;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
`;

const Input = styled.input`
    color: #333d47;
    display: flex;
    width: 50%;
    height: 44px;
    background: #ffffff;
    border: ${(props) =>
        props.displayError ? `1px solid #EB5757` : `1px solid #f1f1f1`};
    box-shadow: ${(props) =>
        props.displayError ? `0 0 4px 0 rgba(235, 87, 87, 0.3)` : `none`};
    box-sizing: border-box;
    border-radius: 4px;
    margin: 12px 0 0 0;
    padding: 14px;
    :focus {
        outline: none;
        box-shadow: 0 0 4px 0 rgba(71, 56, 128, 0.3);
        border: 1px solid #473880;
    }
    ::-webkit-input-placeholder {
        font-size: 14px;
        color: rgba(46, 53, 62, 0.5);
        font-style: italic;
    }
`;

const BreakWrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 16px;
`;

const StyledLink = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  a {
    font-size: 0.8rem;
    color: #4285f4;
    padding: 0;
  }
`;

const BreakerText = styled.span`
    color: rgba(14, 19, 24, 0.7);
    font-size: 16px;
    padding: 20px 10px 10px 0;
`;

function Login(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayPage, setDisplayPage] = useState('login');
    const login = async () => {
        console.log(process.env.REACT_APP_GRAPHQL_ENDPOINT, email, password)
        const request = {
            query: `
                query {
                    login(email: "${email}", password: "${password}"){
                        token
                        tokenExpiration
                        user{...userFields}
                    }
                }
                fragment userFields on User {
                    email
                    fav_movies
                    name
                }
            `
        };
        const response = await axios.post(process.env.REACT_APP_GRAPHQL_ENDPOINT, request);
        if (response.data.data.login) {
            //set data in redux and redirect the user to home page
            const { updateUser } = props;
            updateUser({ ...response.data.data.login })
            localStorage.setItem('token', response.data.data.login.token);

        }
        else {
            alert(response.data.errors[0].message)
        }
    }

    const signUp = async () => {
    console.log(process.env.REACT_APP_GRAPHQL_ENDPOINT, email, password)
    const request = {
        query: `
            mutation {
                signUp(email: "${email}", password: "${password}", name: "${username}"){
                    email
                    fav_movies
                    name
                }
            }
        `
    };
    const response = await axios.post(process.env.REACT_APP_GRAPHQL_ENDPOINT, request);
        if (response.data.data && response.data.data.signUp) {
            login();
        }
        else {
            alert(response.data.errors[0].message)
        }
}

    
    if (!props.user.token) {
        return (
            displayPage === 'login' ? (
                <ContainerDiv>
                    <Input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder="Email"
                    />
                    <Input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type="password"
                        placeholder="Password"
                    />
                    <BreakWrap>
                        <ButtonDiv onClick={() => login()}>
                            Login
            </ButtonDiv>
                        <BreakWrap>
                            <BreakerText>
                                <StyledLink>
                                    <Link
                                        onClick={() => {
                                            setDisplayPage('signup')
                                        }}
                                    >
                                        {' '}
                    Sign Up{' '}
                                    </Link>
                                </StyledLink>
                            </BreakerText>
                        </BreakWrap>
                    </BreakWrap>
                </ContainerDiv>
            ) : (
                <ContainerDiv>
                    <Input
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        placeholder="Username"
                    />
                    <Input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder="Email"
                    />
                    <Input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type="password"
                        placeholder="Password"
                    />
                    <BreakWrap>
                        <ButtonDiv onClick={() => signUp()}>
                            Register
            </ButtonDiv>
                        <BreakWrap>
                            <BreakerText>
                                <StyledLink>
                                    <Link
                                        onClick={() => {
                                            setDisplayPage('login')
                                        }}
                                    >
                                        {' '}
                    Login{' '}
                                    </Link>
                                </StyledLink>
                            </BreakerText>
                        </BreakWrap>
                    </BreakWrap>
                </ContainerDiv>
            )
        );
    }
    else {
        return <Redirect to="/movies"></Redirect>
    }

}


const mapDispatchToProps = (dispatch) => ({
  updateUser: (...params) => {
    dispatch(Actions.storeUserProfile.updateUser(...params));
  },
  getUserInfo: async (...params) => {
    await dispatch(Actions.userInfoActions.getUserInfo(...params));
  },
});
const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
