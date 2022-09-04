import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validName: false,
      userName: undefined,
      loading: false,
    };
  }

  handleValidation = (e) => {
    const minNameLength = 3;

    if (e.target.value.length >= minNameLength) {
      this.setState({
        validName: true,
        userName: e.target.value,
      });
    }
  };

  handleClick = (userName) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await createUser({ name: userName });
        const { history } = this.props;
        history.push('/search');
      },
    );
  };

  render() {
    const { validName, userName, loading } = this.state;

    return (
      <div data-testid="page-login" className="user-login">
        <form>
          {loading ? (
            <Loading />
          ) : (
            <label htmlFor="username" className="login-name">
              Nome de Usuário:
              {' '}
              <input
                type="text"
                id="username"
                name="username"
                data-testid="login-name-input"
                onChange={ this.handleValidation }
                className="login-input"
              />
            </label>
          )}

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ !validName }
            onClick={ () => this.handleClick(userName) }
            className="login-button"
          >
            Entrar
          </button>
          {/* {redirection && <Link to='/search' />} */}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  validName: PropTypes.bool,
  loading: PropTypes.bool,
  userName: PropTypes.string,
  history: PropTypes.array,
  push: PropTypes.function,
}.isRequired;

export default Login;
