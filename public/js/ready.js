const Auth = (() => {
  const localStorage = window.localStorage;

  const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
  };

  const getAccessToken = () => {
    return localStorage.accessToken;
  };

  const destroyAccessToken = () => {
    localStorage.removeItem('accessToken');
  };

  return {
    setAccessToken,
    getAccessToken,
    destroyAccessToken
  }
})();

const Render = {

};

$(document).ready(() => {
  // check if user has localStorage access token
  

});