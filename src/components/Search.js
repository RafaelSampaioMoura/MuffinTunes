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
      <div data-testid="page-search">
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
              />
            </label>
          )}
          {validName ? (
            <button
              type="button"
              data-testid="search-artist-button"
              onClick={ () => this.handleClick(searchedName) }
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
            <>
              {albums.map(
                ({
                  collectionId,
                  artworkUrl100,
                  collectionName,
                  artistName,
                }) => (
                  <div key={ collectionId }>
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <Link
                      to={ `album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      <h3>{collectionName}</h3>
                    </Link>
                    <p>{artistName}</p>
                  </div>
                ),
              )}
            </>
          </>
        ) : (
          <h3>Nenhum álbum foi encontrado</h3>
        )}
      </div>
    );
  }
}

export default Search;
