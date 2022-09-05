import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: { name: '' },
      loading: false,
    };
  }

  componentDidMount() {
    this.handleUserInfo();
  }

  handleUserInfo = () => {
    this.setState({
      loading: true,
    }, async () => {
      const theUser = await getUser();
      this.setState({
        loading: false,
        userInfo: theUser,
      });
    });
  };

  render() {
    const { userInfo, loading } = this.state;
    return (
      <div data-testid="page-profile">
        {loading ? <Loading /> : <h2>{userInfo.name}</h2>}
      </div>
    );
  }
}

export default Profile;
