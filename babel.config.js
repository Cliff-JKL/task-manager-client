{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
        // Enable development transform of React with new automatic runtime
        ["@babel/preset-react", { "development": !api.env('production'), "runtime": "automatic" }]
    ],
    "plugins": [
        ["@babel/plugin-proposal-class-properties", { "loose": false }],
        "@babel/proposal-object-rest-spread",
        "@babel/plugin-transform-runtime"
    ]
}

