$(function () {
    /* 如果两个初始化一样可以只写一个 */
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //  1.实现分类左侧的动态渲染
    //     1.1 发送请求 请求左侧分类的数据 /category/querySecondCategory
    //     1.2 拿到数据进行动态渲染
    //     1.3 使用模板引擎来渲染左侧分类菜单

    // 使用zepto的 $.ajax发送请求
    $.ajax({
        // type: 'get', //默认就是get 可以省略
        //url 请求地址 也必须要 注意带
        url:'/category/queryTopCategory',
        // dataType: 'json', //默认 把json转js对象 可以省略
        beforeSend: function () {
            // 让遮罩层显示
            $('#mask').show();
        },
        complete: function () {
            // 让遮罩层隐藏
            $('#mask').hide();
        },
        success: function (data) { //ajsx回调函数  接受返回数据 不能忽略
            console.log(data);
            // 2. 调用模板引擎函数 传入模板id 和 对象的数据(data 已经是对象了直接传入)
            var html= template('categoryLeftTpl',data);
            $('.category-left ul').html(html);
        }
    });
    /*
    2.实现分类左侧的点击渲染右侧分类
        2.1 给所有左侧的分类的li 的 a 添加点击事件 不能直接添加 左侧异步动态渲染 使用事件委托的方式添加事件
        2.2 拿到当前点击li 的 a的分类id
        2.3 拿到分类id在请求二级分类的数据 并且把当前拿到id作为 请求参数传递
        2.4 拿到二级分类的数据 渲染右侧分类
        2.5 为了一开始就显示默认id为1 的右侧分类数据 所以定义一个函数 默认传入1 在事件里面调用传入点击的id
        2.6 给当前点击a的父元素添加active 其他的兄弟删除active 
    */
    // 1.使用事件委托方式给左侧分类的ul 里 li 的 a 添加事件 移动端使用tap 解决延迟click事件
    $('.category-left ul').on('tap','li > a',function(){
        // console.log($(this).data('id'));//拿了只会做类型转换
        // console.log(this.dataset['id']);//拿了之后不会类型转换
        //2.获得到了当前点击a的分类的id
        var id = $(this).data('id');
        //3.根据当前id请求二级分类的api数据 调用获取右侧分类的函数传入id
        querySecondCategory(id);
        //4.给当前点击a 的父元素添加active 其他兄弟删除active sibling 兄弟元素 是a的父元素 li的所有兄弟
        $(this).parent().addClass('active').siblings().removeClass('active');
    }); 
    //5. 为了默认去调用请求右侧的分类的数据 并且显示第一个分类的数据 传入id 为1
    querySecondCategory(1);
    //定义一个专门获取右侧分类数据的函数
    function querySecondCategory(id){
        $.ajax({
            url: '/category/querySecondCategory', 
            //{参数名: 参数值} 参数是id 参数的值 id变量的值
            data: {id:id},
            success: function(data){
                console.log(data);
                // 4.创建模板渲染数据
                var html = template('categoryRightTpl',data);
                // 5.把模板渲染到右侧的mui-row里面
                $('.category-right .mui-row').html(html);                
            }
        });
    }
})