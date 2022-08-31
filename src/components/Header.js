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
    const loadingElement = <p>Carregando...</p>;
    const welcomeUser = (
      <p data-testid="header-user-name">
        Welcome
        {userName}
      </p>
    );
    return (
      <header data-testid="header-component">
        {loading ? loadingElement : welcomeUser}
        <Link to="/search">
          <p data-testid="link-to-search">To Search</p>
        </Link>
        <Link to="/favorites">
          <p data-testid="link-to-favorites">To Favorites</p>
        </Link>
        <Link to="/profile">
          <p data-testid="link-to-profile">To Profile</p>
        </Link>
      </header>
    );
  }
}

export default Header;
