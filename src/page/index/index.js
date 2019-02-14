require('./index.css');
var _mm = require('util/mm.js');
console.log(_mm.getUrlParam('keyword'));
var template = "<div>{{data}}</div>";
var data = {
    data:123
};
console.log(_mm.renderHtml(template,data));