import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validName: false,
      searchedName: '',
      loading: false,
      foundName: undefined,
      albums: [],
    };
  }

  handleValidation = (e) => {
    const minNameLength = 2;

    this.setState({
      searchedName: e.target.value,
    });

    if (e.target.value.length >= minNameLength) {
      this.setState({
        validName: true,
      });
    }
  };

  handleClick = (artist) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const search = await searchAlbumsAPI(artist);
        console.log(search);
        this.setState({
          loading: false,
          foundName: artist,
          albums: [...search],
          searchedName: '',
        });
      },
    );
  };

  render() {
    const { validName, searchedName, loading, foundName, albums } = this.state;
    return (
      <div data-testid="page-search" className="search-component">
        <form>
          {loading ? (
            <Loading />
          ) : (
            <label htmlFor="search-artist">
              <input
                type="text"
                id="search-artist"
                name="search-artist"
                data-testid="search-artist-input"
                value={ searchedName }
                onChange={ this.handleValidation }
                className="music-search"
              />
            </label>
          )}
          {validName ? (
            <button
              type="button"
              data-testid="search-artist-button"
              onClick={ () => this.handleClick(searchedName) }
              className="search-button"
            >
              Pesquisar
            </button>
          ) : (
            <button type="button" data-testid="search-artist-button" disabled>
              Pesquisar
            </button>
          )}
        </form>
        {albums.length > 0 ? (
          <>
            <h2>
              Resultado de álbuns de:
              {foundName}
            </h2>
            <div className="search-results">
              {albums.map(
                ({
                  collectionId,
                  artworkUrl100,
                  collectionName,
                  artistName,
                }) => (
                  <div key={ collectionId } className="album-card">
                    <img
                      src={ artworkUrl100 }
                      alt={ collectionName }
                      className="album-image"
                    />
                    <Link
                      to={ `album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                      style={ { textDecoration: 'none' } }
                    >
                      <h3 style={ { textAlign: 'center' } }>{collectionName}</h3>
                    </Link>
                    <p style={ { textAlign: 'center' } }>{artistName}</p>
                  </div>
                ),
              )}
            </div>
          </>
        ) : (
          <h3>Nenhum álbum foi encontrado</h3>
        )}
      </div>
    );
  }
}

export default Search;
