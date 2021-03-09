export default () => {
  const setBodyLoadedClassName = () => {
    document.body.classList.add(`body_loaded`);
  };

  window.addEventListener(`load`, setBodyLoadedClassName);
};
