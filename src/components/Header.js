import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      userName: undefined,
    };
  }

  componentDidMount() {
    this.handleHeader();
  }

  // Adiciona o nome do usuário no header
  handleHeader = async () => {
    const user = await getUser();
    if (user === '{}') {
      this.setState({
        loading: false,
        userName: 'Guest',
      });
    } else {
      this.setState({
        loading: false,
        userName: user.name,
      });
    }
  };

  render() {
    const { loading, userName } = this.state;
    const linkStyle = {
      textDecoration: 'none',
      color: 'black',
      fontWeight: 'bold',
    };

    return (
      <header data-testid="header-component" className="header">
        {/* Verifica se o usuário adicionou o login antes de renderizar o header */}
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <p data-testid="header-user-name">
            {userName}
          </p>
        )}
        <div className="logo">TRYBE TUNES</div>
        <div className="link-list">
          <Link
            to="/search"
            style={ linkStyle }
          >
            <p data-testid="link-to-search" className="links">To Search</p>
          </Link>
          <Link
            to="/favorites"
            style={ linkStyle }
          >
            <p data-testid="link-to-favorites">To Favorites</p>
          </Link>
          <Link
            to="/profile"
            style={ linkStyle }
          >
            <p data-testid="link-to-profile">To Profile</p>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
