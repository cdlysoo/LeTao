$(function(){
    $('.btn-register').on('tap',function(){
        var check = true;

        var inputs = $('.mui-input-group input');

        inputs.each(function (index, value){
            var val = $(value).val().trim();

            if (!val) {
                var label = $(value).prev().text();

                mui.toast(label + "不允许为空");

                check = false;
                return false;
            }
        });
        if (check) {
            var mobile = $('.mobile').val();

            if (!(/^1[3456789]\d{9}$/.test(mobile))) {
                mui.toast("手机号码输入不合法,请重新输入");

                return false;
            }
            var username = $('.username').val();
            var password1 = $('.password1').val();
            var password2 = $('.password2').val();

            if(password1 != password2){
                mui.toast("两次输入的密码不一致,请重新输入");
                return false;
            }
            var vcode = $('.vcode').val();

            if (vcode != vCode) {
                mui.toast("验证码输入错误");
                return false;
            }
            $.ajax({
                url: '/user/register',
                type: 'post',
                data: {
                    username: username,
                    password: password1,
                    mobile: mobile,
                    vCode: vCode
                },
                success: function(data) {
                    if (data.success) {
                        location = 'login.html?returnUrl=user.html';
                    }else {
                        mui.toast(data.message);
                    }
                }
            })
        }
    });
    var vCode = '';

    $('.get-vcode').on('tap',function(data){
        $.ajax({
            url : '/user/vCode',
            success: function(data) {
                console.log(data.vCode);
                vCode = data.vCode;   
            }
        });
    });
});