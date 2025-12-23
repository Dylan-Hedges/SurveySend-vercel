//Regular Expression - checks that email is valid e.g something@something.com taken from emailregex.com
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//Checks list of emails are valid
export default emails => {
  const invalidEmails = emails
    //Splits string of emails on the commas into an array
    .split(',')
    //Removes spaces on each side of the email address - use .map( ) to create a new array of these trimmed email addresses
    .map(email => email.trim())
    //Checks if email is valid - takes each item in the list, uses the reg ex to test it, keep all that fail the test and dump all that pass
    .filter(email => re.test(email) === false);
    //Returns error message with all invalid emails - if there is a length i.e invalidEmails is not empty then return an error message
    if (invalidEmails.length){
      return `These emails are invalid: ${invalidEmails}`;
    }
    //Returns null if there are no errors
    return null;
};
