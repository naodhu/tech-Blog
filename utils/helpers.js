// This module exports several helper functions that can be used to format data for display on the client side.
// The `format_date` function takes a JavaScript `Date` object and formats it as a string in the format "MM/DD/YYYY".
// The `format_amount` function takes a number and formats it with commas as thousands separators.
module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  },
};
