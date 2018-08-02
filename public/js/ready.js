const App = (() => {
  const init = (relPath, user) => {
    Listeners.signout();
    API.getTypes().then(types => {
      Render.initNavbar(types, user);

      if(relPath === '/explore/new') {
        if(!user) {
          redirect('/login');
        } else {
          Listeners.submitAddHauntedPlace();
          Render.populateTypeSelect('#add-hp-type', types);
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

  return {
    setAccessToken,
    getAccessToken,
    destroyAccessToken
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
              App.redirect('/');
            }, 3200);
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