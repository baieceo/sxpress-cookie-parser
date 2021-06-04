// sxpress-cookie-parser

// cookie解析
function cookieParser(cookieStr) {
  var cookies = {};  // 解析结果
  // 通过; 切分cookies列表
  var cookieList = cookieStr.split('; ');

  for (var i = 0; i < cookieList.length; i++) {
    // 通过=切分cookie的key和value
    var cookieItem = cookieList[i].split('=');

    cookies[cookieItem[0]] = cookieItem[1];
  }

  return cookies;
}

module.exports = function (req, res, next) {
  var sxpressInstance = global.sxpressInstance;
  var responseCookies = sxpressInstance._responseCookies;
  var cookie = req.headers.cookie || '';
  var cookies = cookieParser(cookie);

  req.cookies = cookies;

  /*
    挂载设置cookie方法至res对象
    domain：cookie在什么域名下有效，类型为String,。默认为网站域名
    expires: cookie过期时间，类型为Date。如果没有设置或者设置为0，那么该cookie只在这个这个session有效，即关闭浏览器后，这个cookie会被浏览器删除。
    httpOnly: 只能被web server访问，类型Boolean。
    maxAge: 实现expires的功能，设置cookie过期的时间，类型为String，指明从现在开始，多少毫秒以后，cookie到期。
    path: cookie在什么路径下有效，默认为'/'，类型为String
    secure：只能被HTTPS使用，类型Boolean，默认为false
  */
  res.cookie = function (key, value, options) {
    responseCookies.push({
      key: key,
      value: value,
      options: options
    });
  };

  next();
};
