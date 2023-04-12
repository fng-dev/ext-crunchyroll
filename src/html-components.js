let TOTAL_ITEMS = 0;
let MENU_ITEM = null;
const _createSideMenu = async (ITEMS) => {
  const isMenuCreated = document.querySelector(".netanime-side-menu");

  if (!isMenuCreated) {
    const menu = document.createElement("div");
    menu.classList.add("netanime-side-menu");

    const outMenu = document.createElement("div");
    outMenu.classList.add("netanime-side-menu-item");

    outMenu.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    const image = document.createElement("img");
    image.src = MENU_IMG;

    outMenu.appendChild(image);

    const menuitem = document.createElement("div");
    menuitem.classList.add("container");

    menu.appendChild(menuitem);
    menu.appendChild(outMenu);

    MENU_ITEM = menuitem;

    document.body.appendChild(menu);
  }

  if (isMenuCreated) {
    if (ITEMS.length !== TOTAL_ITEMS) {
      TOTAL_ITEMS = ITEMS.length;
      document
        .querySelectorAll(".btn-extension-fng")
        .forEach((e) => e.remove());
      for (const item of ITEMS) {
        const btn = _createButton(item.name, item.url);
        MENU_ITEM.appendChild(btn);
      }
    }
  }

  return false;
};

const _createButton = (text = "", url) => {
  const button = document.createElement("button");
  button.style.textTransform = "capitalize";
  button.className = "btn-extension-fng";
  const textButton = document.createTextNode(text.toLowerCase());
  button.appendChild(textButton);
  button.addEventListener("click", () => {
    window.location.href = `https://www.crunchyroll.com${url}`;
  });
  return button;
};
