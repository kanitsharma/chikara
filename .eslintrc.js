module.exports = {
  "parser": "babel-eslint",
	"extends": "airbnb",
	"plugins": [
		"react",
		"jsx-a11y",
		"import",
		"flowtype",
		"flowtype-errors"
	],
  "rules": {
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "react/jsx-filename-extension": [1, {"extensions": [".js"]}],
    "jsx-a11y/no-static-element-interactions": 0
  }
};
