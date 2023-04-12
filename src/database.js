const DB_NAME = "db_txt";

const isDBExists = () => {
  const DB = localStorage.getItem(DB_NAME);
  console.log("[LOG]", JSON.parse(DB));
  return DB ? true : false;
};

const _createDB = () => {
  try {
    const DB = {
      animes: [],
      episodes: [],
    };

    localStorage.setItem(DB_NAME, JSON.stringify(DB));
    return true;
  } catch (e) {
    return false;
  }
};

const _getDB = () => {
  const DB = localStorage.getItem(DB_NAME);
  console.log("[LOG] _getDB:", JSON.parse(DB));
  if (DB) return JSON.parse(DB);
  return;
};

const _saveDB = (DB) => {
  console.log("[LOG] DB SAVE", DB);
  localStorage.setItem(DB_NAME, JSON.stringify(DB));
};

const _deleteDB = () => {
  localStorage.clear(DB_NAME);
};

const _getAnimes = () => {
  try {
    const DB = _getDB(DB_NAME);
    console.log("[LOG] _getAnimes:", DB);
    if (!DB) {
      throw "Banco de dados nao encontrado";
    }

    return DB.animes;
  } catch (e) {
    console.log("[LOG]", e);
    return false;
  }
};

const _getAnimeAndEpisodes = (ANIME_NAME) => {
  try {
    const DB = _getDB(DB_NAME);
    if (!DB) {
      throw "Banco de dados nao encontrado";
    }

    const ANIME = DB.animes.find((item) => item.name === ANIME_NAME);

    if (!ANIME) return false;

    const EPISODES = DB.episodes.filter((item) => item.anime_id === ANIME.id);

    return {
      anime: ANIME,
      episodes: EPISODES,
    };
  } catch (e) {
    console.log("[LOG]", e);
    return false;
  }
};

const _saveAnime = (ANIME_NAME, ANIME_URL) => {
  try {
    const DB = _getDB(DB_NAME);
    if (!DB) {
      throw "Banco de dados nao encontrado";
    }

    const anime = DB.animes.find(
      (item) => item.name === ANIME_NAME && item.deleted_at === null
    );

    if (anime) return anime;

    const NEW_ANIME = {
      id: DB.animes.length + 1,
      name: ANIME_NAME,
      url: ANIME_URL,
      deleted_at: null,
    };

    DB.animes.push(NEW_ANIME);
    _saveDB(DB);

    return NEW_ANIME;
  } catch (e) {
    console.log("[LOG]", e);
    return false;
  }
};

const _saveEpisode = (ANIME, NEW_EPISODE) => {
  try {
    const DB = _getDB(DB_NAME);
    if (!DB) {
      throw "Banco de dados nao encontrado";
    }

    const episodes = DB.episodes.filter((item) => item.anime_id === ANIME.id);

    const episode = episodes.find((item) => item.name === NEW_EPISODE.name);

    if (episode) return episode;

    const EP = { ...NEW_EPISODE, anime_id: ANIME.id };
    DB.episodes.push(EP);

    _saveDB(DB);

    return EP;
  } catch (e) {
    console.log("[LOG]", e);
    return false;
  }
};
