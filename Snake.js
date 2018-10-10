//自调用函数---大蛇的
(function(){
    var elements = [];
    //大蛇的构造函数
    function Snake(width,height,direction) {
        this.width = width || 20;//大蛇的每个部分的宽
        this.height = height || 20;
        this.direction = direction || "right";//方向
        this.body = [
            {x:3,y:2,color:"lightblue"},//头
            {x:2,y:2,color:"pink"},//身体
            {x:1,y:2,color:"pink"}//身体
        ]//大蛇的身体
    }
    //大蛇的初始化方法
    Snake.prototype.init = function (map) {
        //
        remove();
        for (var i = 0; i < this.body.length; i++){
            //数组中的每个元素都是一个对象
            var obj = this.body[i];
            //创建div
            var div = document.createElement("div");
            //地图插入div
            map.appendChild(div);
            //蛇的样式
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.position = "absolute";
            div.style.left = obj.x*this.width + "px";
            div.style.top = obj.y*this.height + "px";
            div.style.background = obj.color;
            //把div插入elements中;
            elements.push(div);
        }
    };
    //大蛇移动起来的函数
    Snake.prototype.move = function(food,map){
        // 改变设身体的位置
        var i = this.body.length - 1;//2
        for (; i > 0; i--){
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //改变蛇头的坐标位置
        switch (this.direction) {
            case "left":this.body[0].x -= 1; break;
            case "right":this.body[0].x += 1; break;
            case "top" : this.body[0].y -= 1;break;
            case "bottom": this.body[0].y += 1;break;
        }
        // 判断是否迟到食物
        //  蛇头的坐标
        var headX = this.body[0].x*this.width;
        var headY = this.body[0].y*this.height;
        //判断蛇头的坐标和食物的坐标是否相同
        if (headX == food.x && headY == food.y){
            // alert("eating")
            // 获取蛇尾
            var last = this.body[this.body.length - 1];
            //把蛇尾最后复制一个，重新加到小蛇的body中
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            food.init(map)
        }
    };
    //删除大蛇的私有函数
    function remove(){
        //获取数组
        var i = elements.length - 1;//这里是把整个蛇丢进去，整体
        for (;i>=0; i--){
            var ele = elements[i];
            //从当前的元素找到父元素，再删除他的子元素
            ele.parentNode.removeChild(ele);
            //从数组中删除这个div
            elements.splice(i,1);
        }
    }

    //把snake暴露给window
    window.Snake = Snake;

}());