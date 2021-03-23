export default class RulesPage {
  constructor() {
    this.rulesItemTextCollection = document.querySelectorAll(`.js-rules__item-text`);
    this.lastRulesItemTextEl = this.rulesItemTextCollection.length ?
      this.rulesItemTextCollection[this.rulesItemTextCollection.length - 1] :
      null;

    this.rulesLinkEl = document.querySelector(`.js-rules__link`);
  }

  init() {
    this.attachEvents();
  }

  showRulesLink() {
    if (!this.rulesLinkEl) {
      return;
    }

    this.rulesLinkEl.classList.add(`rules__link--showed`);
  }

  hideRulesLink() {
    if (!this.rulesLinkEl) {
      return;
    }

    this.rulesLinkEl.classList.remove(`rules__link--showed`);
    this.detachEvents();
  }

  attachEvents() {
    if (this.lastRulesItemTextEl && this.rulesLinkEl) {
      this.lastRulesItemTextEl.addEventListener(`animationend`, this.showRulesLink.bind(this));
    }

    if (this.rulesLinkEl) {
      document.body.addEventListener(`screenChanged`, this.hideRulesLink.bind(this));
    }
  }

  detachEvents() {
    this.lastRulesItemTextEl.removeEventListener(`animationend`, this.showRulesLink.bind(this));
    document.body.removeEventListener(`screenChanged`, this.hideRulesLink.bind(this));
  }
}
