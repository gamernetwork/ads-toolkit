module.exports = {
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "env": {
    "browser": "true",
    "jquery": true,
    "amd": true,
    "node": true
  },
  "rules": {
      // enable additional rules
      "indent": ["error", 2],
      "no-console": ["warn"],
      "semi": ["error"]
  }
}