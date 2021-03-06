$(function(){
     /* 1. 添加搜索记录
      1. 获取当前输入的搜索内容
      2. 不能直接添加这个内容到数组中 把内容存储到一个数组里面去 把数组添加到本地存储中
      3. 判断 去除重复的 如果之前数组中存在这个值 要先删除 再往前添加
      4. 把数组存储到本地存储的中的时候 要把数组转出一个json字符串再存进去
      5. 调用设置本地存储的函数 把json字符串存储到本地存储中 */
    
    //1.给搜索按钮添加点击事件
    $('.btn-search').on('tap',function(){

        console.log(this);
        //2.获取当前输入框输入的内容 可能会有首尾空格 这种是不合法输入 需要把空格去掉 .trim();
        var search = $('.input-search').val().trim();
        console.log(search);
        //3.进行非空判断 如果用户在没有输入或者都是空格 提示输入正确
        if (search == '') {
            mui.alert('你不输入在下不给看', '温馨提示', function(){

            });
            // 如果用户没有输入内容需要阻止添加搜索记录
            return;  
        }
        // 4.把数据加到一个数组中
            // 4.1 因为可能不是第一次添加 之前就已经有值 在之前的值的基础上在添加
            // 4.2 先获取之前的数组 获取之前的键historyData1里面的数组
        var arr = localStorage.getItem('historyData1');
        //5. 对数组字符串进行一个转换转成一个js数组 但是又有可能是第一次加 之前数组不存在 没有数组转不了使用 空数组
        arr = JSON.parse(arr || '[]');
        //6.还得做数组的去重如果 数组中已经有这个值 先把这个值删除 再去添加这个值
        //判断当前值在数组中存在 因为存在返回值的索引 不会是-1
        if (arr.indexOf(search) != -1){
            // 7.去数组中删除这个值 splice是数组的删除一个值的函数 第一个参数的是要删除的索引 第二个参数是删几个
            arr.splice(arr.indexOf(search),1);
        }
        //8. 去除了重复之后 再把当前值加到数组的前面 先转出字符串再存储到本地存储中
        arr.unshift(search);
        arr = JSON.stringify(arr);
        //9. 数组加完之后把数组存储到本地存储中 先转出字符串在存储到本地存储中
        localStorage.setItem('historyData1',arr);
        //10. 输入完成后清空文本框 把输入value值设置为空
        $('.input-search').val('');
        //11. 添加完成后重新查询一下 显示最新添加的记录
        queryHistory();

        location = 'productlist.html?key='+search+'&time'+new Date().getTime();
        
    });
       // 一开始调用一下
       queryHistory();
       /* 实现历史记录的查询
            1. 获取本地存储中的数组字符串 也要转出一个js数组对象
            2. 创建一个列表模板 渲染模板 */
       // 由于每次添加了都需要查询 把查询的代码放到一个函数queryHistory里面 第一次调用一下 在添加完成也调用一下
       function queryHistory() {
           // 1. 读取本地存储的值
           var arr = localStorage.getItem('historyData1');
           // 2. 对数组字符串进行一个转换转成一个JS数组 但是又有可能是第一次加 之前数组不存在 没有数组转不了使用 空数组
           arr = JSON.parse(arr || '[]');
           console.log(arr);
           // 把 arr 作为一个值包装 对象的 rows数组上 
           // 是对象就不用包本身要求就是对象满足了  是数组就要包 数组不满足要求他需要对象
           var html = template('searchHistoryTpl', {
               rows: arr
           });
           // 3. 把模板渲染到页面上
           $('.search-history ul').html(html);
       }

       $('.search-history').on('tap','.btn-delete',function(){
           var index = $(this).data('index');

           var arr = localStorage.getItem('historyData1');
           arr= JSON.parse(arr || '[]');

           arr.splice(index,1);

           arr = JSON.stringify(arr);
           //9. 数组加完之后把数组存储到本地存储中 先转出字符串在存储到本地存储中
           localStorage.setItem('historyData1',arr);

           queryHistory();
       });

    /* 清空记录 */

    $('.btn-clear').on('tap',function(){

        localStorage.removeItem('historyData1');

        queryHistory();
    });

    $('.search-history .mui-table-view').on('tap','li',function(){
        var search = $(this).data('value');
        // console.log(search);
        
        location = 'productlist.html?key='+search+'&time='+new Date().getTime()
    })

   })