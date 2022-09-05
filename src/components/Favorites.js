import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import NotFound from './NotFound';
// import Header from './Header';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      favSongs: [],
      checked: true,
    };
  }

  componentDidMount() {
    this.handleList();
  }

  handleChange = async (song) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await removeSong(song);
        const favorites = await getFavoriteSongs();
        this.setState({
          loading: false,
          checked: false,
          favSongs: [...new Set(favorites)],
        });
      },
    );
  };

  handleList = () => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const favoriteList = await getFavoriteSongs();
        const uniqueFavs = [...new Set(favoriteList)];
        console.log(uniqueFavs);
        this.setState({
          loading: false,
          favSongs: [...uniqueFavs],
        });
      },
    );
  };

  render() {
    const { loading, favSongs, checked } = this.state;

    return (
      <>
        {/* <Header /> */}
        <div data-testid="page-favorites">
          {favSongs.length === 0 ? (
            <NotFound />
          ) : (
            <table>
              <tbody>
                {loading ? (
                  <Loading />
                ) : (
                  favSongs.map((song, index) => (
                    <tr key={ song.trackId }>
                      <th>{index}</th>
                      <th>{song.trackName}</th>
                      <th>
                        <audio
                          data-testid="audio-component"
                          src={ song.previewUrl }
                          controls
                        >
                          <track kind="captions" />
                          O seu navegador não suporta o
                          elemento
                          <code>audio</code>
                          .
                        </audio>
                        <label htmlFor="favorite">
                          Favorita
                          <input
                            type="checkbox"
                            onChange={ () => this.handleChange(song) }
                            checked={ checked }
                            id="favorite"
                          />
                        </label>
                      </th>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
}

export default Favorites;
