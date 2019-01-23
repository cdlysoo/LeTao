$(function () {

    /* 渲染商品详情 */

    var id = getQueryString('id');
    // console.log(id);

    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (data) {
            var min = +data.size.split('-')[0];
            var max = +data.size.split('-')[1];
            // console.log(min,max);       

            var size = [];

            for (var i = min; i <= max; i++) {
                size.push(i);
            }
            // console.log(size);

            data.size = size;

            console.log(data);

            var html = template('detailTpl', data);

            $('#main .mui-scroll').html(html);


            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
            });


            // 初始化区域滚动
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

            // 7. 初始化数字框
            mui('.mui-numbox').numbox();
            // 8. 初始化尺码点击 让尺码能够点击切换 类名 为什么不需要委托 因为详情数据已经渲染完毕了可以直接使用
            $('.btn-size').on('tap', function () {
                $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
            });
        }
    });

    $('.btn-add-cart').on('tap',function(){
        var size = $('.btn-size.mui-btn-warning').data('size');
        console.log(size);

        if(!size) {
            mui.toast('请选择尺码!',{ duration:1000, type:'div' });
            return false;
        }
        var num = mui('.mui-numbox').numbox().getValue();
        console.log(num);
        
        if(!num) {
            mui.toast('请选择数量',{duration:1000, type:'div'});
            return false;
        }
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            success: function(data) {
                console.log(data);

                if (data.success) {
                    
                }else {
                    location = 'login.html?returnUrl='+location.href;
                }    
            }
        });
    });


    // 获取url参数值的函数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // console.log(r); 
        if (r != null) return decodeURI(r[2]);
        return null;
    }
});