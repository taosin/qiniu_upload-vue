/*
* @Author: iMocco
* @Date:   2017-09-01 17:32:00
* @Last Modified by:   iMocco
* @Last Modified time: 2017-09-04 10:40:48
*/

'use strict'
var express = require('express')
var powerexpress = require('power-express')(express)

var app = express()

var port = "8188"

var qiniu = require('qiniu')
var fs = require('fs')
var ACCESS_KEY = 'ACCESS_KEY';
var SECRET_KEY = 'SECRET_KEY';

var mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

var options = {
  scope: 'testweb',
};

var putPolicy = new qiniu.rs.PutPolicy(options);

module.exports = app.listen(port, function (err) {
  // 获取token
  app.get('/qiniu/getQiniuToken', function(req, res) {
  	res.append('Access-Control-Allow-Origin', '*')
  	res.header('Cache-Control', 'max-age=0, private, must-revalidate')
  	res.header('Pragma', 'no-cache')
  	var uploadToken=putPolicy.uploadToken(mac);
  	if (uploadToken) {
  		res.json({
  			code: 100,
  			data: uploadToken
  		})
  	}
  })
  console.log('Listening at http://localhost:' + port + '\n')
})