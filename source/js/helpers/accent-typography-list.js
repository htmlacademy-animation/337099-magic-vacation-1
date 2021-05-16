import AccentTypographyBuild from "./accent-typography-build";

const accentTypographyList = {
  introTitleTop: new AccentTypographyBuild(`.js-intro__title`),
  introDate: new AccentTypographyBuild(`.js-intro__date`, 400),
  sliderTitle: new AccentTypographyBuild(`.slider__item-title`, 300),
  prizeTitle: new AccentTypographyBuild(`.prizes__title`, 300),
};

export default function accentTypographyInit() {
  accentTypographyList.introTitleTop.destroyAnimation();
  setTimeout(() => {
    accentTypographyList.introTitleTop.runAnimation();
  }, 200);

  accentTypographyList.introDate.destroyAnimation();
  setTimeout(() => {
    accentTypographyList.introDate.runAnimation();
  }, 900);

  accentTypographyList.sliderTitle.destroyAnimation();
  setTimeout(() => {
    accentTypographyList.sliderTitle.runAnimation();
  }, 5);

  accentTypographyList.prizeTitle.destroyAnimation();
  setTimeout(() => {
    accentTypographyList.prizeTitle.runAnimation();
  }, 5);
};
