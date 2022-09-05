import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Header from './Header';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      userDescription: '',
      userImg: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.handleUserInfo();
  }

  handleUserInfo = async () => {
    const theUser = await getUser();
    const { name, email, image, description } = theUser;
    console.log(theUser);
    this.setState({
      loading: false,
      userName: name,
      userEmail: email,
      userImg: image,
      userDescription: description,
    });
  };

  render() {
    const { userName, userEmail, userDescription, userImg, loading } =
      this.state;
    return (
      <>
        <Header />
        <div data-testid='page-profile'>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <img src={userImg} alt={userName} data-testid='profile-image' />
              <h1>{userName}</h1>
              <h2>{userEmail}</h2>
              <p>{userDescription}</p>
              <Link to='/profile/edit'>
                <button type='button'>Editar perfil</button>
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
