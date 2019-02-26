require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
        
    },
    bindEvent: function () {
        //
        var _this = this;
        $(document).on('click', '.btn-submit', function (e) {
            e.preventDefault();
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
                passwordNew: $.trim($('#password-new').val()),


            };
            var validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {

                _user.updatePassword(userInfo, function (res) {

                    window.location.href = './user-center.html';
                }, function (errMsg) {

                    _mm.errorTips(errMsg);
                });
            } else {

                _mm.errorTips(validateResult.msg);
            }
        })
    },
   
    //验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if ( formData.passwordNew.length < 6) {
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '密码不一致';
            return result;
        }

        result.msg = '验证通过';
        result.status = true;
        return result;

    }
}
$(function () {
    page.init();
})