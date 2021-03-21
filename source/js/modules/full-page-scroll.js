import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;
    this.SCREEN_ANIMATION_DELAY_TIMEOUT = 100;

    this.screensWithOverlayTransitionObject = {
      story: [
        `prizes`,
      ],
    };

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.screenElementsArray = Array.from(this.screenElements);
    this.screenOverlayElement = document.getElementById(`screen__overlay`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.nextScreen = null;

    this.onScrollHandler = this.handleScroll.bind(this);
    this.onUrlHashChengedHandler = this.handleWindowPopstate.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.changePageDisplay();
  }

  saveNewActiveScreenIndex() {
    this.activeScreen = this.nextScreen;
    this.nextScreen = null;
  }

  changeActiveScreen() {
    if (this.checkIsScreenOverlayNeedToShow()) {
      this.setOverlayActiveStateOn();
    } else {
      this.saveNewActiveScreenIndex();
      this.changePageDisplay();
    }
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, this.SCREEN_ANIMATION_DELAY_TIMEOUT);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);

    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  checkIsScreenOverlayNeedToShow() {
    const activeScreenName = this.screenElementsArray[this.activeScreen].id;
    const nextScreenName = this.screenElementsArray[this.nextScreen].id;

    const isCurrentScreenOverlayShowed = this.screensWithOverlayTransitionObject[activeScreenName];

    if (!isCurrentScreenOverlayShowed) {
      return false;
    }

    return isCurrentScreenOverlayShowed.includes(nextScreenName);
  }

  setOverlayActiveStateOn() {
    this.screenOverlayElement.addEventListener(`transitionend`, this.handleOverlayTransitionEnd.bind(this), {once: true});
    this.screenOverlayElement.classList.add(`screen__overlay--active`);
  }

  reCalculateActiveScreenPosition(delta) {
    let currentScreen = this.activeScreen;

    if (delta > 0) {
      this.nextScreen = Math.min(this.screenElements.length - 1, ++currentScreen);
    } else {
      this.nextScreen = Math.max(0, --currentScreen);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  handleWindowPopstate() {
    const newIndex = this.screenElementsArray.findIndex((screen) => location.hash.slice(1) === screen.id);
    this.nextScreen = (newIndex < 0) ? 0 : newIndex;

    this.changeActiveScreen();
  }

  handleScroll(evt) {
    this.reCalculateActiveScreenPosition(evt.deltaY);

    if (this.activeScreen !== this.nextScreen) {
      this.changeActiveScreen();
    }
  }

  handleOverlayTransitionEnd() {
    this.saveNewActiveScreenIndex();
    this.changePageDisplay();

    this.screenOverlayElement.classList.remove(`screen__overlay--active`);
  }
}
