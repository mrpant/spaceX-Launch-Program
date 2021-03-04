
// TODO : Babel register to set entry point and allows to node ES6
require("babel-register")({
    presets: ["env"],
    plugins: [
        [
            "css-modules-transform",
            {
                camelCase: true,
                extensions: [".css", ".scss"],
            },
        ],
        "dynamic-import-node",
    ],
});

// TODO : entry point of server file.
require("./src/server/index");
