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
        $('.btn-register').click(function () {
            _this.submit();
        })
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            //异步验证用户名是否存在
            if(!username){
                return;
            }
            
            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (err) {
                formError.show(err);
            });
        });

    },
    submit: function () {
        
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        var formValidateResult = this.formValidate(formData);
        if (formValidateResult.status) {
            console.log('oks');
            _user.register(formData, function (res) {
                console.log('ok');
                window.location.href = './result.html?type=register' || './index.html';
            }, function (error) {
                formError.show(error);
            })
        } else {
            formError.show(formValidateResult.msg);
        }
    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '账号名不能为空';
            
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = '密码不能小于6位';
            return result;
        }
        if (formData.passwordConfirm !== formData.password) {
            result.msg = "密码不一致";
            return result;
        }
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '答案不能为空';
            return result;
        }
        result.msg = '验证通过';
        result.status = true;
        return result;
    }
};

$(function () {
    page.init();
})