const express = require('express');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const app = express();

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: false,
    stats: {colors: true},
}));

app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log
}))

app.use('/static', express.static('static'));

app.listen(8888, () => {
    console.log('start listen on 8888')
})