import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,sjs}"],
		plugins: {
			js,
			"@stylistic": stylistic
		},
		extends: ["js/recommended"],
		languageOptions: {
			globals: {
				...globals.browser,
				env: "readonly",
				Application: "readonly",
				BackgroundProcess: "readonly",
				Popup: "readonly",
				exports: "writable"
			},
			sourceType: "module"
		},
		rules: {
			"no-constructor-return": "warn",
			"no-unassigned-vars": "error",
			"no-useless-assignment": "warn",
			"no-unreachable-loop": "error",
			"default-case-last": "error",
			"dot-notation": "error",
			"no-alert": "error",
			"no-eval": "error",
			"no-lonely-if": "error",
			"no-param-reassign": "error",
			"no-useless-constructor": "error",
			"no-var": "error",
			"prefer-const": "warn",
			"no-fallthrough": "off",
			"no-unused-vars": "warn",
			"@stylistic/quote-props": ["error", "as-needed"]
		}
	},

	// global ignores should be last or separate
	globalIgnores(["./src/lib/external"])
]);
