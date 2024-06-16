import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	html: {
		title: "Tic-Tac-Toe",
		meta: {
			"color-scheme": "dark",
		},
	},
});
