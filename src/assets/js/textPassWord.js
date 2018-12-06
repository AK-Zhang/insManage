let p_len = function (pwd) {
  let password_length = pwd.length;
  let valid_password_length = false,
    contains_lovercase = false,
    contains_number = false,
    contains_uppercase = false;


  if (password_length > 7) {
    valid_password_length = true;
  } else {
    return 1;
  }

  contains_lovercase = /[a-z]/.test(pwd);
  contains_number = /\d/.test(pwd);
  contains_uppercase = /[A-Z]/.test(pwd);
  if (contains_lovercase == true && contains_number == true) {
    if (
      contains_uppercase == true &&
      valid_password_length == true
    ) {
      valid_password_length = true;
      return 4;
    } else {
      return 3;
    }
  } else {
    return 2;
  }
}

export default {
  p_len
}
