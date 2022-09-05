import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import Header from './Header';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validInput: false,
      userName: undefined,
      userEmail: '',
      userDescription: '',
      loading: false,
    };
  }

  handleValidation = (e) => {
    const minNameLength = 3;

    if (e.target.value.length >= minNameLength) {
      this.setState({
        validInput: true,
        [e.target.name]: e.target.value,
      });
    }
  };

  handleClick = (userName, userEmail, userDescription) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await createUser({
          name: userName,
          email: userEmail,
          description: userDescription,
        });
        const { history } = this.props;
        history.push('/search');
      },
    );
  };

  render() {
    const { validInput, userName, userEmail, userDescription, loading } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-login" className="user-login">
          <form>
            {loading ? (
              <Loading />
            ) : (
              <div
                style={ {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignContent: 'space-between',
                  width: '500px',
                } }
              >
                <label htmlFor="userName" className="login-name">
                  Nome de Usuário:
                  {' '}
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    data-testid="login-name-input"
                    onChange={ this.handleValidation }
                    className="login-input"
                  />
                </label>
                <label htmlFor="userEmail" className="login-name">
                  {' '}
                  Email:
                  {' '}
                  <input
                    type="email"
                    name="userEmail"
                    id="userEmail"
                    onChange={ this.handleValidation }
                    className="login-input"
                  />
                </label>
                <label htmlFor="userDescription" className="login-name">
                  Descrição:
                  {' '}
                  <input
                    type="textarea"
                    name="userDescription"
                    id="userDescription"
                    onChange={ this.handleValidation }
                    className="login-input"
                  />
                </label>
              </div>
            )}

            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ !validInput }
              onClick={ () => this.handleClick(userName, userEmail, userDescription) }
              className="login-button"
            >
              Entrar
            </button>
            {/* {redirection && <Link to='/search' />} */}
          </form>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  validInput: PropTypes.bool,
  loading: PropTypes.bool,
  userName: PropTypes.string,
  history: PropTypes.array,
  push: PropTypes.function,
}.isRequired;

export default Login;
