const passwordValidator = require("password-validator");

/* Validate, password meets its criticeria or not. */
exports.validatePassword = async (password) => {
  // Create a schema
  var schema = new passwordValidator();
  // Add properties to it
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(20) // Maximum length 20
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digits
    .has()
    .symbols(1) // Must have at least 1 special character
    .has()
    .not()
    .spaces(); // Should not have spaces

  const isValid = schema.validate(password, { details: true });
  return isValid;
};

/* Validate, Email meets its criticeria or not. */
exports.validateEmail = async(email) => {
  const emailRegex = /^\s*[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}\s*$/;
  const validEmail = emailRegex.test(email);
  return validEmail; // true/false
};

/* validate, age */
exports.validateAge = async(age) =>{
  const ageValue = parseInt(age, 10);
  if(!isNaN(ageValue) || (ageValue >= 1 && ageValue <= 125 )){
    return true;
  } else {
    return false;
  }
}