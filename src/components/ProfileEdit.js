import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validEmail: false,
      validUser: false,
      validImage: false,
      validDescription: false,
      loading: true,
      nUser: '',
      nEmail: '',
      nImage: '',
      nDescription: '',
      oUser: '',
      oEmail: '',
      oImage: '',
      oDescription: '',
    };
  }

  componentDidMount() {
    this.handleUserData();
  }

  handleUserNameValidation = (e) => {
    this.setState({
      oUser: e.target.value,
    });
    const minNameLength = 3;
    if (e.target.value.length >= minNameLength) {
      this.setState({
        validUser: true,
        nUser: e.target.value,
      });
    }
  };

  handleUserEmailValidation = (e) => {
    this.setState({
      oEmail: e.target.value,
    });
    if (
      e.target.value.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    ) {
      this.setState({
        validEmail: true,
        nEmail: e.target.value,
      });
    }
  };

  handleUserImageValidation = (e) => {
    this.setState({
      oImage: e.target.value,
    });
    if (e.target.value) {
      this.setState({
        validImage: true,
        nImage: e.target.value,
      });
    }
  };

  handleUserDescriptionValidation = (e) => {
    this.setState({
      oDescription: e.target.value,
    });
    const minNameLength = 3;
    if (e.target.value.length >= minNameLength) {
      this.setState({
        validDescription: true,
        nDescription: e.target.value,
      });
    }
  };

  handleUserData = async () => {
    const userData = await getUser();
    // console.log(userData);

    this.setState({
      loading: false,
      oUser: userData.name,
      oEmail: userData.email,
      oImage: userData.image,
      oDescription: userData.description,
    });
  };

  handleClick = (newUser, newEmail, newDescription, newImage) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await updateUser({
          name: newUser,
          email: newEmail,
          image: newImage,
          description: newDescription,
        });

        this.setState({
          validEmail: false,
          validUser: false,
          validImage: false,
          validDescription: false,
          loading: false,
          nUser: '',
          nEmail: '',
          nImage: '',
          nDescription: '',
        });

        const { history } = this.props;
        history.push('/profile');
      },
    );
  };

  render() {
    const {
      loading,
      validDescription,
      validEmail,
      validImage,
      validUser,
      nUser,
      nEmail,
      nDescription,
      nImage,
      oUser,
      oEmail,
      oImage,
      oDescription,
    } = this.state;
    const validForm = validDescription && validEmail && validImage && validUser;

    return (
      <>
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div data-testid="page-profile-edit">
            <form>
              <div>
                Mudar usuário:
                {' '}
                <label htmlFor="change-user">
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="change-user"
                    id="change-user"
                    value={ oUser }
                    onChange={ this.handleUserNameValidation }
                  />
                </label>
              </div>
              <div>
                Mudar email:
                {' '}
                <label htmlFor="change-email">
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    name="change-email"
                    id="change-email"
                    value={ oEmail }
                    onChange={ this.handleUserEmailValidation }
                  />
                </label>
              </div>
              <div>
                Mudar descrição:
                {' '}
                <label htmlFor="change-description">
                  <input
                    data-testid="edit-input-description"
                    type="text"
                    name="change-description"
                    id="change-description"
                    value={ oDescription }
                    onChange={ this.handleUserDescriptionValidation }
                  />
                </label>
              </div>
              <div>
                Mudar imagem:
                {' '}
                <label htmlFor="change-image">
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="change-image"
                    id="change-image"
                    value={ oImage }
                    onInput={ this.handleUserImageValidation }
                  />
                </label>
              </div>
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ !validForm }
                onClick={ () => this.handleClick(nUser, nEmail, nDescription, nImage) }
              >
                Editar perfil
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.array,
  push: PropTypes.function,
}.isRequired;

export default ProfileEdit;
