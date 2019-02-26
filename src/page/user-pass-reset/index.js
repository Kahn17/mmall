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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        $('.get-question').click(function () {
            var username = $.trim($('#username'));
            if (!_mm.validate(username, 'require')) {
                formError.show('请输入用户名');
                return;
            }
            _user.getQuestion(username, function (res) {
                formError.hide();
                _this.data.username = username;
                _this.data.question = question;
                _this.loadStepQuestion();

            }, function (err) {

                formError.show(err.msg);
            });
        });
        $('.get-answer').click(function(){
            var answer = $.trim($('#answer').val());
            if(answer){
                _user.checkAnswer({
                    username:_this.data.username,
                    question:_this.data.question,
                    answer:answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                formError.show('请输入密码提示问题答案');
            }
        });
        $('.get-password').click(function(){
            var password = $.trim($('#password').val());
            if(password && password.length >= 6){
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew:password,
                    forgetToken:_this.data.token
                },function (res) { 
                    window.location.href = './result.html?type=pass-reset';
                 },function(errMsg){
                     formError.show(errMsg);
                 })
            }else{
                formError.show('请输入不少于6位的新密码');
            }
        })
    },
    loadStepUsername: function () {
        $('.item-username').show();
    },
    loadStepQuestion: function () {
        formError.hide();
        $('.item-username').hide();
        $('.item-question').show().find('#question').text(this.data.question);
    },
    loadStepPassword: function () {
        formError.hide();
        $('.item-question').hide();
        $('.item-answer').show();
    }

}
$(function () {
    page.init();
});