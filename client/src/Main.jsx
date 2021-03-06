/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './components/navbar';
import Actions from './store/actions';
import Loading from './components/common/loading';
import Login from './components/login';
import styled from 'styled-components';
import axios from 'axios';
import Home from './components/Home';
import FavoriteMovies from './components/favmovies';


const MainWrapper = styled.div`
padding: 70px 0;
`;


function Main(props) {
  useEffect(() => {
    const x = async () => {
      getCurrentUser();
    }
    x()
  }, [])


  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const {updateUser } = props;
      const request = {
        query: `
            query {
              getAuthUser{
                  user {...userField}
                  token
                  tokenExpiration
                }
              }
            
            fragment userField on User {
              email
              fav_movies
              name
            }
            `
        };
      const response = await axios.post(process.env.REACT_APP_GRAPHQL_ENDPOINT, request, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { token: latestToken, tokenExpiration, user } = response.data.data.getAuthUser;
      const payload = {
        token: latestToken,
        tokenExpiration: tokenExpiration,
        profile: { ...user },
      };
      updateUser(payload);
      
    } catch (err) {
      const { signOut } = props;
      signOut();
    }
  };


    const { user } = props;
    if (user.profile === undefined) {
      return <Loading/>;
    }
    return (
      <MainWrapper >
        <Router>
            <div>
              <Navbar />
                <div >
                  <Switch>
                    <Route exact path = "/" component={Home} />
                    <Route exact path = "/favorites" component = {FavoriteMovies} />
                    <Route
                      exact
                      path = "/login"
                     component={Login}
                    />
                  </Switch>
                </div>
            </div>
        </Router>
      </MainWrapper>
    );
  
}



const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (...params) => {
    dispatch(Actions.storeUserProfile.updateUser(...params));
  },
  signOut: () => {
    dispatch(Actions.storeUserProfile.signOut());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
