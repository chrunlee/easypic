let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let app = express();


let config = require('./config/config');

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb',extended:true}));
app.use(cookieParser());

app.use(path.join(config.site.hostPrefix,config.site.route).replace(/\\/g,'/'),express.static(config.upload.prefix));


//路由
require('./routes/route')(app);




// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end(err.toString());
});

app.port = config.site.port;
module.exports = app;
