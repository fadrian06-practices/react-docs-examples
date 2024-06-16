import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	html: {
		title: "Thinking in React",
		meta: {
			"color-scheme": "dark",
		},
	},
});
