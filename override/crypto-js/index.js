;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./md5"), require("./pbkdf2"), require("./aes"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./md5", "./pbkdf2"], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS;

}));