$(function(){
    $.ajax ({
        url: '/user/queryUserMessage',
        success: function (data){
            if (data.error) {
                location = 'login.html?returnUrl='+location.href;
            }else {
                document.documentElement.style.display = 'block';
                console.log(data);

                $('.username').html(data.username);
                $('.mobile').html(data.mobile);
                
            }
        }
    });
    $('.btn-exit').on('tap',function(){
        $.ajax({
            url: '/user/logout',
            success: function (data) {
                if(data.success) {
                    location = 'login.html?returnUrl='+location.href;
                }
            }
        })
    })
})