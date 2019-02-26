require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide();
    }
}

var page = {
    init: function () {

        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $('.btn-submit').click(function (e) {
            
            _this.submit();
            
        });
        $('#password').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    submit: function () {

        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        var validateResult = this.formValidate(formData);

        if (validateResult.status) {
            _user.login(formData, function(res){
                formError.hide();
                window.location.href = _mm.getUrlParam('redirect')|| './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        } else {
            _mm.errorTips(validateResult.msg);
        }
    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = "账号不能为空";
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = "密码不能为空";
            return result;
        }
        result.status = true;
        result.msg = "验证通过";
        return result;
    }
};
$(function () {
    page.init();
});
// require('./index.css');
// require('page/common/nav-simple/index.js');
// var _mm = require('util/mm.js');
// var _user = require('service/user-service.js');

// var formError = {
//     show: function (errMsg) {
//         console.log(errMsg);
//         $('.error-item').show().find('.error-msg').text(errMsg);
//     },
//     hide: function () {
//         $('.error-item').hide();
//     }
// };
// var page = {
//     init: function () {
//         this.bindEvent();
//     },
//     bindEvent: function () {
//         var _this = this;
//         //登录按钮的点击
//         $('.btn-submit').click(function (e) {
//             e.preventDefault();

//             _this.submit();
//         })
//         $('.password,.username').keyup(function (e) {
//             if (e.keyCode === 13) {
//                 _this.submit();
//             }
//         })
//     },
//     submit: function () {

//         var formData = {
//                 username: $.trim($('.username').val()),
//                 password: $.trim($('.password').val()),
//             },
//             validateResult = this.formValidate(formData);
//         if (validateResult) {
//             //提交     

//             _user.login(formData, function (res) {

//                 window.location.href = _mm.getUrlParam('redirect') || './index.html';
//             }, function (err) {

//                 formError.show(err);
//             });
//         } else {
//             formError.show(validateResult.msg);
//         }
//     },
//     formValidate: function (data) {

//         var result = {
//             status: false,
//             msg: ''
//         };
//         if (!_mm.validate(data.username, 'require')) {
//             result.msg = '用户名不能为空';
//             return result;
//         }
//         if (!_mm.validate(data.password, 'require')) {
//             result.msg = '密码不能为空';
//             return result;
//         }
//         result.status = true;
//         result.msg = '验证成功';
//         return result;
//     }

// }
// $(function(){
//     page.init();
// });