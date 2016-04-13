import express from 'express';
import path from 'path';
import fs from 'fs';
import routes from './server/routes/index';
import webpack from 'webpack';
import webpackConfig from './webpack.conf';

const compiler = webpack(webpackConfig);

const app = express();

const rawHtmlViewEngine = (filename, options, callback) => {
  fs.readFile(filename, 'utf8', (err, str) => {
    if(err) return callback(err);
    callback(null, str);
  });
}

// view engine setup
//use html as template
app.engine('html', rawHtmlViewEngine);
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.runWebpack = (cb) => {
    compiler.run((err, stats) => {
        console.log("webpack successfully compiled build.js");
        cb();
    });
};

module.exports = app;