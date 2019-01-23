$(function () {
    // var obj = {
    //     proName: "",
    //     page: 1,
    //     pageSize: 4
    // }
    // obj.proName = getQueryString('key');
    // console.log(obj.proName);

    var key = getQueryString('key');

    queryProduct();

    // $('.btn-search').on('tap', function () {
    //     obj.proName = $('.input-search').val().trim();

    //     if (!obj.proName) {
    //         mui.alert('请输入你要搜索的关键字', '温馨提示(标题)', function () {

    //         });
    //         return;
    //     }
    //     queryProduct();

    //     mui('#refreshContainer').pullRefresh().refresh(true);
    //     page = 1;
    // });

    $('.btn-search').on('tap', function () {

        key = $('.input-search').val().trim();

        if (!key){
            mui.alert('请输入你要搜索的关键字', '温馨提示', function () {

            });
            return;
        }
        queryProduct();
        mui('#refreshContainer').pullRefresh().refresh(true);

        page = 1;

    });


    $('.product-list .mui-card-header a').on('tap', function () {
        var sortType = $(this).data('sort-type');
        console.log(sortType);

        var sort = $(this).data('sort');
        console.log(sort);

        sort = sort == 1 ? 2 : 1;



        $(this).data('sort', sort);

        var obj = {
            proName: key,
            page: 1,
            pageSize: 4
        }

        obj[sortType] = sort;
        queryProduct();

        $.ajax({
            url: '/product/queryProduct',
            data: obj,
            success: function (res) {
                console.log(res);

                var html = template('productListTpl', res);
                $('.product-list .mui-card-content .mui-row').html(html);

            }
        });

        $(this).addClass('active').siblings().removeClass('active');
        if (sort == 1) {
            $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-down');
        }
        mui('#refreshContainer').pullRefresh().refresh(true);

        page = 1;
    })

    var page = 1;

    mui.init({
        pullRefresh: {

            container: "#refreshContainer",
            down: {
                callback: function () {
                    setTimeout(function () {
                        queryProduct();

                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

                        mui('#refreshContainer').pullRefresh().refresh(true);

                        page = 1;
                    }, 2000);
                }
            },
            up: {
                callback: function () {
                    setTimeout(function () {
                        page++;
                        $.ajax({
                            url: '/product/queryProduct',
                            data: {
                                proName: key,
                                page: page,
                                pageSize: 4
                            },
                            success: function (res) {
                                console.log(res);
                                if (res.data.length > 0) {
                                    var html = template('productListTpl', res);
                                    $('.product-list .mui-card-content .mui-row').append(html);

                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                } else {
                                   // 7. 没有数据了 结束上拉加载 并且提示没有更多数据了
                                   mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }
                            }
                        });
                    }, 2000)
                }
            }
        }
    });

    $('.product-list').on('tap','.btn-buy',function(){
        // console.log(this);   
        var id = $(this).data('id');
        
        location = 'detail.html?id='+id;
    });

    function queryProduct() {
        $.ajax({
            url: "/product/queryProduct",
            data: {
                proName: key,
                page: 1,
                pageSize: 4
            },
            success: function (res){
                console.log(res);
                var html = template('productListTpl',res);
                $('.product-list .mui-card-content .mui-row').html(html);
            }
        });
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // console.log(r); 
        if (r != null) return decodeURI(r[2]);
        return null;
    }



});