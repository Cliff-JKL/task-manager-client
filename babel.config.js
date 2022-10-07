const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
];
if (process.env.NODE_ENV === 'development') {
    plugins.push('react-refresh/babel');
}


module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins,
};