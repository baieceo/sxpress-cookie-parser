sxpress-cookie-parser middleware for sxpress

#### example

```javascript
var sxpress = require('sxpress');
var cookieParser = require('sxpress-cookie-parser');
var app = sxpress();

app.use(cookieParser());

app.use(function (req, res, next) {
	console.log(req.cookies);

    res.cookie('sxpressId', +new Date());

	next();
});
```