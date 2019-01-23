$(function(){

    $('.btn-login').on('tap',function(){
        var username = $('.username').val().trim();

        if (!username) {
            mui.toast('请输入用户名',{
                duration: 'short',
                type: 'div'
            });
            return false;
        }
        var password = $('.password').val().trim();
        if (!password){
            mui.toast('请输入密码',{
                duration: 'short',
                type: 'div'
            });
            return false;
        }
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function(data){
                if (data.success) {
                    var returnUrl = getQueryString('returnUrl');
                    location = returnUrl;
                }else {
                    mui.toast(data.message,{
                        duration: 'short',
                        type: 'div'
                    });
                }
            }
        });
    });
    $('.btn-register').on('tap',function(){
        location = 'register.html';
    })

     // 获取url参数值的函数
     function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // console.log(r); 
        if (r != null) return decodeURI(r[2]);
        return null;
    }

});