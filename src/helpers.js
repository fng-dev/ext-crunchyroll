const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, ms);
  });
};

const _getPageData = () => {
  const url = document.querySelector("[data-t=show-title-link]");
  const animeName = document.querySelector("[data-t=show-title-link]>h4");
  const episodeName = document.querySelector(".erc-current-media-info>h1");

  if (url && animeName && episodeName) {
    const animeData = {
      animeUrl: url.getAttribute("href"),
      animeName: animeName.textContent,
      episodeUrl: window.location.pathname,
      episodeName: episodeName.textContent,
    };

    return animeData;
  }

  return false;
};
const _getAnimeHomePage = () => {
  const animeName = document.querySelector(".hero-heading-line>h1");

  if (animeName) {
    const animeData = {
      animeName: animeName.textContent,
    };

    return animeData;
  }

  return false;
};
