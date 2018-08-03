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

      if(relPath.includes('/u/')) {
        if (!user) {
          redirect('/login');
        } else {
          const username = relPath.slice(3).replace(/ /g, ' ');
          API.getUserData(username).then(result => {
            if(result) {
              Listeners.hpModal();
              Listeners.reviewModal();
              Render.populateTypeSelect('#edit-HP-type', types);
              // result is array: [0] -> user data, [1] gravatarUrl
              Render.initUserPage(result[0], result[1].gravatarUrl, user);
            } else {
              redirect('/');
            };
          });
        }
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
  const getUserData = (username) => {
    return $.get({
      url: `/api/v1/users/${username}`
    });
  } 

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

  const updateHauntedPlace = (HPid, updatedHP) => {
    return $.ajax({
      beforeSend: (request) => {
        request.setRequestHeader('Authorization', `Bearer ${Auth.getAccessToken()}`);
      },
      url: `/api/v1/hauntedplaces/${HPid}`,
      type: 'PUT',
      data: updatedHP
    });
  }

  const updateReview = (HPid, Rid, updatedReview) => {
    return $.ajax({
      beforeSend: (request) => {
        request.setRequestHeader('Authorization', `Bearer ${Auth.getAccessToken()}`);
      },
      url: `/api/v1/hauntedplaces/${HPid}/reviews/${Rid}`,
      type: 'PUT',
      data: updatedReview
    });
  }

  const deleteReview = (HPid, Rid) => {
    return $.ajax({
      beforeSend: (request) => {
        request.setRequestHeader('Authorization', `Bearer ${Auth.getAccessToken()}`);
      },
      url: `/api/v1/hauntedplaces/${HPid}/reviews/${Rid}`,
      type: 'DELETE'
    });
  }

  return {
    getUserData,
    getTypes,
    createHauntedPlace,
    updateHauntedPlace,
    updateReview,
    deleteReview
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

  const hpModal = () => {
    $(document).on('click', '.hp-modal-btn', function() {
      $('#editHPLabel').html(`Edit <code>${$(this).attr('data-HPname')}</code>`);
      $('#edit-HP-name').val($(this).attr('data-HPname'));
      $('#edit-HP-description').val($(this).attr('data-HPdesc'));
      $('#edit-HP-location').val($(this).attr('data-HPloc'));
      $(`#edit-HP-type option[value="${$(this).attr('data-HPtypeId')}"]`).prop("selected", true);

      $('#update-HP-btn').attr('data-HPid', $(this).attr('data-HPid'));
    });

    $('#update-HP-btn').click(function() {
      const updatedHP = {
        TypeId: parseInt($(`#edit-HP-type option:selected`).val()),  
        name: $('#edit-HP-name').val(),
        description: $('#edit-HP-description').val(),
        location: $('#edit-HP-location').val() 
      }
      const validationResult = Validate.newPlace(updatedHP);

      if(validationResult.isValid) {
        const HPid = $(this).attr('data-HPid');

        API.updateHauntedPlace(HPid, updatedHP).then(result => {
          if (result[0] === 1) {
            const msg = 'Haunted Place successfully updated!';
            const newType = $(`#edit-HP-type option[value="${updatedHP.TypeId}"]`).text();
            // update the haunted place in table (btn/link data and rows)
            $(`.hp-modal-btn[data-HPid="${HPid}"]`).text(updatedHP.name);
            $(`.hp-modal-btn[data-HPid="${HPid}"]`).attr('data-HPtypeId', updatedHP.TypeId);
            $(`.hp-modal-btn[data-HPid="${HPid}"]`).attr('data-HPname', updatedHP.name);
            $(`.hp-modal-btn[data-HPid="${HPid}"]`).attr('data-HPdesc', updatedHP.description);
            $(`.hp-modal-btn[data-HPid="${HPid}"]`).attr('data-HPloc', updatedHP.location);

            $(`.hp-modal-btn[data-HPid="${HPid}"]`).parent().parent().find('td:eq(0)').text(newType);
            $(`.hp-modal-btn[data-HPid="${HPid}"]`).parent().parent().find('td:eq(2)').text(updatedHP.description);
            $(`.hp-modal-btn[data-HPid="${HPid}"]`).parent().parent().find('td:eq(3)').text(updatedHP.location);
            //
            Render.showFormOverlayMsg('#edit-HP-form', msg);
            setTimeout(() => {
              $('#editHPModal').modal('toggle');
            }, 2000);
          } else if (result.error === 'Must be unique (name already exists)!') {
            Render.showInputErrMsg('#edit-HP-name', result.error);
          } else { // other error (unexpected)
            Render.showFormOverlayMsg('#edit-HP-form', 'Unauthorized request.');
          };
        });

      } else {
        const nameErr = validationResult.errors.name;
        const descErr = validationResult.errors.description;
        const locErr = validationResult.errors.location;

        if (nameErr) Render.showInputErrMsg('#edit-HP-name', nameErr);
        if (descErr) Render.showInputErrMsg('#edit-HP-description', descErr);
        if (locErr) Render.showInputErrMsg('#edit-HP-location', locErr);
      };
    });
  }

  const reviewModal = () => {
    $(document).on('click', '.review-modal-btn', function() {
      $('#editDelReviewLabel').html(`Edit review for <code>${$(this).attr('data-HPname')}</code>`);
      $('#edit-review-title').val($(this).attr('data-Rtitle'));
      $('#edit-review-body').val($(this).attr('data-Rbody'));
      $(`#edit-review-rating option[value="${$(this).attr('data-Rrating')}"]`).prop("selected", true);

      $('#update-review-btn').attr('data-HPid', $(this).attr('data-HPid'));
      $('#update-review-btn').attr('data-Rid', $(this).attr('data-Rid'));
      $('#delete-review-btn').attr('data-HPid', $(this).attr('data-HPid'));
      $('#delete-review-btn').attr('data-Rid', $(this).attr('data-Rid'));
    });

    $('#update-review-btn').click(function() {
      const updatedReview = {
        title: $('#edit-review-title').val(),
        body: $('#edit-review-body').val(),
        rating: parseInt($(`#edit-review-rating option:selected`).val())  
      }
      const validationResult = Validate.updatedReview(updatedReview);

      if(validationResult.isValid) {
        const HPid = $(this).attr('data-HPid');
        const Rid = $(this).attr('data-Rid');

        API.updateReview(HPid, Rid, updatedReview).then(result => {
          if (result[0] === 1) {
            const msg = 'Review successfully updated!'
            // update the review in table (btn/link data and rows)
            $(`.review-modal-btn[data-Rid="${Rid}"]`).text(updatedReview.title);
            $(`.review-modal-btn[data-Rid="${Rid}"]`).attr('data-Rtitle', updatedReview.title);
            $(`.review-modal-btn[data-Rid="${Rid}"]`).attr('data-Rbody', updatedReview.body);
            $(`.review-modal-btn[data-Rid="${Rid}"]`).attr('data-Rrating', updatedReview.rating);

            $(`.review-modal-btn[data-Rid="${Rid}"]`).parent().parent().find('td:eq(2)').text(updatedReview.body);
            $(`.review-modal-btn[data-Rid="${Rid}"]`).parent().parent().find('td:eq(3)').text(updatedReview.rating);
            //
            Render.showFormOverlayMsg('#edit-review-form', msg);
            setTimeout(() => {
              $('#editDelReviewModal').modal('toggle');
            }, 2000);
          } else {  // other error (unexpected)
            Render.showFormOverlayMsg('#edit-review-form', 'Unauthorized request.');
          };
        });
      } else {
        const titleErr = validationResult.errors.title;
        const bodyErr = validationResult.errors.body;
  
        if (titleErr) Render.showInputErrMsg('#edit-review-title', titleErr);
        if (bodyErr) Render.showInputErrMsg('#edit-review-body', bodyErr);
      };
    });

    $('#delete-review-btn').click(function() {
      const HPid = $(this).attr('data-HPid');
      const Rid = $(this).attr('data-Rid');

      API.deleteReview(HPid, Rid).then(result => {
        console.log(result);
        if (result === 1) {
          const msg = 'Review successfully deleted!';
          // remove review from table
          $(`.review-modal-btn[data-Rid="${Rid}"]`).parent().parent().remove();
          //
          Render.showFormOverlayMsg('#edit-review-form', msg);
          setTimeout(() => {
            $('#editDelReviewModal').modal('toggle');
          }, 2000);
        } else {  // other error (unexpected)
          Render.showFormOverlayMsg('#edit-review-form', 'Unauthorized request.');
        };
      }); 
    });
  }

  return {
    signout,
    submitSignUp,
    submitLogIn,
    submitAddHauntedPlace,
    hpModal,
    reviewModal
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

  const updatedReview = (updatedReview) => {
    const result = {
      isValid: true,
      errors: {
        title: lengthErrMsg(updatedReview.title, 5, 100),
        body: lengthErrMsg(updatedReview.body, 5, 500),
      }
    };
    if (result.errors.title || result.errors.body) {
      result.isValid = false;
    };
    return result;
  }
 
  return {
    newUser,
    newPlace,
    updatedReview
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

  const initUserPage = (user, gravatarUrl, authUser) => {
    const hauntedPlaces = user.HauntedPlaces;
    const reviews = user.Reviews;

    $('#user-photo').attr('src', gravatarUrl);
    $('#user-username').text(user.username);
    $('#user-email').text(user.email);
    $('#user-createdAt').text(moment.utc(user.createdAt).local().format('MMM D, YYYY'));

    if (!hauntedPlaces.length) {
      $('#collapseOne table').css('display', 'none');
      $('#collapseOne .alert').css('display', 'block');
    } else {
      for (const place of hauntedPlaces) {
        const $tdType = $('<td>', {text: place.Type.name});
        const $tdDesc = $('<td>', {text: place.description});
        const $tdLoc = $('<td>', {text: place.location});
        let $tdName;
        
        if (authUser.username === user.username) {
          $tdName = $('<td>', {
            html: `
              <button type="button" class="hp-modal-btn btn btn-link p-0" data-toggle="modal" data-target="#editHPModal" data-HPid="${place.id}" data-HPname="${place.name}" data-HPdesc="${place.description}" data-HPloc="${place.location}" data-HPtypeId="${place.TypeId}">
              ${place.name}
              </button>
            `
          });
        } else {
          $tdName = $('<td>', {text: place.name});
        };
      
        $('#collapseOne tbody').append($('<tr>').append($tdType, $tdName, $tdDesc, $tdLoc));
      };
    };

    if(!reviews.length) {
      $('#collapseTwo table').css('display', 'none');
      $('#collapseTwo .alert').css('display', 'block');
    } else {
      for (const review of reviews) {
        const $tdHP = $('<td>', {
          text: review.HauntedPlace ? review.HauntedPlace.name : '' 
        });
        const $tdBody = $('<td>', {text: review.body});
        const $tdRating = $('<td>', {text: review.rating});
        const $tdCreatedAt = $('<td>', {text: moment.utc(user.createdAt).local().format('ddd MMM D, YYYY h:mm a')});
        let $tdTitle;
  
        if (authUser.username === user.username && review.HauntedPlace) {
          $tdTitle = $('<td>', {
            html: `
              <button type="button" class="review-modal-btn btn btn-link p-0" data-toggle="modal" data-target="#editDelReviewModal" data-Rid="${review.id}" data-Rtitle="${review.title}" data-Rbody="${review.body}" data-Rrating="${review.rating}" data-HPname="${review.HauntedPlace.name}" data-HPid="${review.HauntedPlaceId}">
              ${review.title}
              </button>
            `
          });
        } else {
          $tdTitle = $('<td>', {text: review.title});
        };
      
        $('#collapseTwo tbody').append($('<tr>').append($tdHP, $tdTitle, $tdBody, $tdRating, $tdCreatedAt));
      };
    };
  }

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
    initUserPage,
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