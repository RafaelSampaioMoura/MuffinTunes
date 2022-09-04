import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.handleFavs();
  }

  handleFavs = () => {
    const { music } = this.props;
    const { trackName } = music;

    this.setState(
      {
        loading: true,
      },
      async () => {
        const response = await getFavoriteSongs();
        const isFav = response.find((res) => res === trackName);
        if (isFav) {
          this.setState({
            loading: false,
            checked: true,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      },
    );
  };

  handleChange = async (song) => {
    const { checked } = this.state;

    if (checked) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          await removeSong(song);
          await getFavoriteSongs();
          this.setState({
            loading: false,
            checked: false,
          });
        },
      );
    } else {
      this.setState(
        {
          loading: true,
        },
        async () => {
          await addSong(song);
          await getFavoriteSongs();
          console.log(await getFavoriteSongs());
          this.setState({
            loading: false,
            checked: true,
          });
        },
      );
    }
  };

  render() {
    const { loading, checked } = this.state;
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {trackName}
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite">
              Favoritar:
              {' '}
              <input
                type="checkbox"
                onChange={ () => this.handleChange(music) }
                checked={ checked }
                data-testid={ `checkbox-music-${trackId}` }
                id="favorite"
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.string,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
