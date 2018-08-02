const App = (() => {
  const init = (relPath, user) => {
    Listeners.signout();
    API.getTypes().then(types => {
      Render.initNavbar(types, user);

      if(relPath === '/explore/new') {
        if(!user) {
          const msg = 'You must be signed in to add a new Haunted Place!'
          Render.showFormOverlayMsg('#add-haunted-place-form', msg);
          setTimeout(() => {
            redirect('/login');
          }, 2000);
        } else {
          Listeners.submitAddHauntedPlace();
          Render.populateTypeSelect('#add-hp-type', types);
        };
      };

      if (relPath === '/signup') {
        if(!user) {
          Listeners.submitSignUp();
        } else {
          redirect(`/u/${user.username}`);
        };
      };

      if (relPath === '/login') {
        if(!user) {
          Listeners.submitLogIn();
        } else {
          redirect(`/u/${user.username}`);
        };
      };
    });
  }

  const redirect = (relPath) => {
    window.location.replace(relPath);
  }

  return {
    init,
    redirect
  }
})();

const Auth = (() => {
  const localStorage = window.localStorage;

  const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
  }
  const getAccessToken = () => {
    return localStorage.accessToken;
  }
  const destroyAccessToken = () => {
    localStorage.removeItem('accessToken');
  }

  const createUser = (newUser) => {
    return $.post({
      url: '/auth/signup',
      data: newUser
    });
  }

  const loginUser = (userCreds) => {
    return $.post({
      url: '/auth/login',
      data: userCreds
    });
  }

  return {
    setAccessToken,
    getAccessToken,
    destroyAccessToken,
    createUser,
    loginUser
  }
})();

const API = (() => {
  const getTypes = () => {
    return $.get({
      url: '/api/v1/types'
    });
  }

  const createHauntedPlace = (newPlace) => {
    return $.post({
      beforeSend: (request) => {
        request.setRequestHeader('Authorization', `Bearer ${Auth.getAccessToken()}`);
      },
      url: '/api/v1/hauntedplaces/',
      data: newPlace
    });
  }

  return {
    getTypes,
    createHauntedPlace
  }
})();

const Listeners = (() => {
  const signout = () => {
    $('#navbar-signout a').click((e) => {
      e.preventDefault();
      Auth.destroyAccessToken();
      App.redirect('/');
    });
  }

  const submitSignUp = () => {
    $('#signup-form').submit((e) => {
      e.preventDefault();

      const newUser = {
        username: $('#signup-username').val(),
        email: $('#signup-email').val(),
        password: $('#signup-password').val(),
        passwordConfirm: $('#signup-password-confirm').val()
      };
      const validationResult = Validate.newUser(newUser);

      if (validationResult.isValid) {
        Auth.createUser(newUser).then(result => {
          if (result.error === 'Username already taken!') {
            Render.showInputErrMsg('#signup-username', result.error);
          } else if (result.error === 'User with this email already exists!') {
            Render.showInputErrMsg('#signup-email', result.error);
          } else if (result.error) { // other error (unexpected)
            Render.showFormOverlayMsg('#signup-form', 'Unauthorized request.');
          } else {
            const msg = `You have successfully signed up!`;
            Auth.setAccessToken(result.accessToken);
            Render.showFormOverlayMsg('#signup-form', msg);
            setTimeout(() => {
              App.redirect(`/u/${newUser.username.replace(/ /g, '_')}`);
            }, 3200);
          }; 
        });
      } else {
        const usernameErr = validationResult.errors.username;
        const emailErr = validationResult.errors.email;
        const pwErr = validationResult.errors.password;
        const pwConfirmErr = validationResult.errors.passwordConfirm;
  
        if (usernameErr) Render.showInputErrMsg('#signup-username', usernameErr);
        if (emailErr) Render.showInputErrMsg('#signup-email', emailErr);
        if (pwErr) Render.showInputErrMsg('#signup-password', pwErr);
        if (pwConfirmErr) Render.showInputErrMsg('#signup-password-confirm', pwConfirmErr);
      };
    });
  }

  const submitLogIn = () => {
    $('#login-form').submit((e) => {
      e.preventDefault();

      const userCreds = {
        usernameOrEmail: $('#login-username-or-email').val(),
        password: $('#login-password').val()
      };

      if (!userCreds.usernameOrEmail) {
        Render.showInputErrMsg('#login-username-or-email', 'Cannot be blank.');
      } else if (!userCreds.password) {
        Render.showInputErrMsg('#login-password', 'Cannot be blank.');
      } else {
        Auth.loginUser(userCreds).then(result => {
          if (result.error === 'Could not find user.') {
            Render.showInputErrMsg('#login-username-or-email', result.error);
          } else if (result.error === 'Invalid password!') {
            Render.showInputErrMsg('#login-password', result.error);
          } else if (result.error) { // other error (unexpected)
            Render.showFormOverlayMsg('#login-form', 'Unauthorized request.');
          } else {
            const msg = `You have successfully logged in!`
            Auth.setAccessToken(result.accessToken);
            Render.showFormOverlayMsg('#login-form', msg);
            setTimeout(() => {
              App.redirect(`/u/${result.username.replace(/ /g, '_')}`);
            }, 2400);
          };
        });
      };
    });
  };

  const submitAddHauntedPlace = () => {
    $('#add-haunted-place-form').submit((e) => {
      e.preventDefault();
  
      const newPlace = {
        name: $('#add-hp-name').val(),
        description: $('#add-hp-desc').val(),
        location: $('#add-hp-location').val(),
        TypeId: parseInt($('#add-hp-type option:selected').val())
      };
      const validationResult = Validate.newPlace(newPlace);
  
      if (validationResult.isValid) {
        API.createHauntedPlace(newPlace).then(result => {
          if (result.error === 'Must be unique (name already exists)!') {
            Render.showInputErrMsg('#add-hp-name', result.error);
          } else if (result.error) { // other error (unexpected)
            Render.showFormOverlayMsg('#add-haunted-place-form', 'Unauthorized request.');
          } else {
            const msg = `${result.name} has been successfully added!`
            Render.showFormOverlayMsg('#add-haunted-place-form', msg);
            setTimeout(() => {
              App.redirect(`/p/${result.name.replace(/ /g, '_')}`);
            }, 2000);
          }; 
        });
      } else {
        const nameErr = validationResult.errors.name;
        const descErr = validationResult.errors.description;
        const locErr = validationResult.errors.location;
  
        if (nameErr) Render.showInputErrMsg('#add-hp-name', nameErr);
        if (descErr) Render.showInputErrMsg('#add-hp-desc', descErr);
        if (locErr) Render.showInputErrMsg('#add-hp-location', locErr);
      };
    });
  }

  return {
    signout,
    submitSignUp,
    submitLogIn,
    submitAddHauntedPlace
  }
})();

const Validate = (() => {
  const lengthErrMsg = (str, min, max) => {
    if (str.length < min) {
      return `Too short (${min} characters min).`;
    } else if (str.length > max) {
      return `Too long (${max} characters max).`;
    } else {
      return '';
    };
  }

  const emailErrMsg = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (email.length < 3 || email.length > 100) return 'Invalid Email.';
    if (emailRegex.test(email.toLowerCase())) {
      return '';
    } else {
      return 'Invalid Email.'
    };
  }

  const newUser = (newUser) => {
    const result = {
      isValid: true,
      errors: {
        username: lengthErrMsg(newUser.username, 2, 50),
        email: emailErrMsg(newUser.email),
        password: lengthErrMsg(newUser.password, 8, 50),
        passwordConfirm: newUser.password === newUser.passwordConfirm ? '' : 'Passwords do not match!'
      }
    };
    if (result.errors.username || result.errors.email || result.errors.password || result.errors.passwordConfirm) {
      result.isValid = false;
    };
    return result;
  }

  const newPlace = (newPlace) => {
    const result = {
      isValid: true,
      errors: {
        name: lengthErrMsg(newPlace.name, 5, 100),
        description: lengthErrMsg(newPlace.description, 5, 500),
        location: lengthErrMsg(newPlace.location, 5, 100)
      }
    };
    if (result.errors.name || result.errors.description || result.errors.location) {
      result.isValid = false;
    };
    return result;
  }

  return {
    newUser,
    newPlace
  }
})();

const Render = (() => {
  const initNavbar = (types, user) => {
    for (const type of types) {
      const $a = $('<a>', {
        class: 'dropdown-item',
        href: `/explore/${type.name.replace(/ /g, '_')}`,
        text: type.name
      });
      $('.dropdown-menu').append($a);
    };
    if (user) {
      $('#navbar-signup').css('display', 'none');
      $('#navbar-login').css('display', 'none');
      $('#navbar-user a').attr('href', `/u/${user.username}`)
      $('#navbar-user a').html(`<i class="fas fa-user pr-2"></i> ${user.username}`);
      $('#navbar-user').css('display', 'block');
      $('#navbar-signout').css('display', 'block');
    };
  };

  const populateTypeSelect = (selector, types) => {
    const $select = $(selector);

    for (const type of types) {
      const $option = $('<option>', {
        text: type.name,
        value: type.id
      });
      $select.append($option);
    };
  }

  const showInputErrMsg = (inputSelector, errMsg) => {
    const $errContainer = $(inputSelector).parent().find('.error-container');
    _flashMsg($errContainer, errMsg);
  }

  const showFormOverlayMsg = (formSelector, msg) => {
    const $overlayContainer = $(formSelector).parent().find('.overlay-container');
    _flashMsg($overlayContainer, msg); 
  }

  const _flashMsg = ($container, msg) => { 
    $container.find('span').text(msg);
    $container.css('display', 'flex').animate({
      opacity: 1,
    }, 1200, () => {
      setTimeout(() => {
        $container.animate({
          opacity: 0,
        }, 1200, function(){
          $container.css('display', 'none');
        });
      }, 2400);
    });
  };

  return {
    initNavbar,
    populateTypeSelect,
    showInputErrMsg,
    showFormOverlayMsg,
  }
})();

$(document).ready(() => {
  if (Auth.getAccessToken()) {
    $.get({
      beforeSend: (request) => {
        request.setRequestHeader('Authorization', `Bearer ${Auth.getAccessToken()}`);
      },
      url: '/auth/user',
    }).then(user => {
      App.init(window.location.pathname, user);
    }).catch((xhr, status, err)=> { // invalid access token -> destroy it
      Auth.destroyAccessToken();
      App.init(window.location.pathname);
    });
  } else {
    App.init(window.location.pathname);
  };
});