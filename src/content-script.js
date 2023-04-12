if (!isDBExists()) {
  _createDB();
}

const animes = _getAnimes();

const target = document.querySelector("body");

const observer = new MutationObserver((mutation) => {
  const isEpisodePageData = _getPageData();
  let DB = _getDB();
  let ITEMS = [];
  let ANIME = null;

  /**
   *  Validate if its an episode page
   *  @isEpisodePageData
   */

  if (isEpisodePageData) {
    /**
     *  Search anime
     *  @searchAnime
     */

    const searchAnime = DB.animes.find(
      (item) => item.name === isEpisodePageData.animeName
    );

    if (!searchAnime) {
      /**
       *  Create anime register
       *  @anime
       */

      const anime = _saveAnime(
        isEpisodePageData.animeName,
        isEpisodePageData.animeUrl
      );

      if (anime) {
        /**
         *  Create episode register
         *  @episode
         */

        ANIME = anime;

        _saveEpisode(anime, {
          name: isEpisodePageData.episodeName,
          url: isEpisodePageData.episodeUrl,
          deleted_at: null,
        });
      }
    }

    if (searchAnime) {
      ANIME = searchAnime;
      const episodes = DB.episodes.filter(
        (item) => item.anime_id === searchAnime.id
      );

      const searchEpisode = episodes.find(
        (item) => item.name === isEpisodePageData.episodeName
      );

      if (!searchEpisode) {
        /**
         *  Create episode register
         *  @episode
         */

        _saveEpisode(searchAnime, {
          name: isEpisodePageData.episodeName,
          url: isEpisodePageData.episodeUrl,
          deleted_at: null,
        });
      }
    }
  }

  DB = _getDB();

  /**
   *  Add items (Animes or Episodes)
   *  @ITEMS
   */

  const pathName = window.location.pathname;

  if (pathName.indexOf("watch") !== -1 && ANIME) {
    ITEMS = DB.episodes.filter((item) => item.anime_id === ANIME.id);
  }

  if (pathName.indexOf("watch") === -1) {
    ITEMS = DB.animes;
  }

  _createSideMenu(ITEMS);
});

observer.observe(target, { attributes: true, childList: true, subtree: true });
