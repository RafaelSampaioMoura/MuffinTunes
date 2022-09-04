import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.handleMusic();
  }

  handleMusic = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.setState(
      {
        loading: true,
      },
      async () => {
        const music = await getMusics(id);
        console.log(music);
        this.setState({
          loading: false,
          musics: [...music],
        });
      },
    );
  };

  render() {
    const { musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h2 data-testid="artist-name">{musics[0].artistName}</h2>
            <h3 data-testid="album-name">{musics[0].collectionName}</h3>
            <ul>
              {musics.map(
                (music, index) => index > 0 && (
                  <li key={ music.trackId }>
                    <MusicCard
                      music={ music }
                    />
                  </li>
                ),
              )}
            </ul>
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
