//自调用函数---食物的
(function(){
    var elements = [];//用来存储食物
    function Food(x,y,width,height,color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color|| "orange"
    }

    //为原型添加初始化方法（在地图上显示，所以需要地图这个参数）
    Food.prototype.init = function (map) {
        //先删除这个小食物
        remove();
        //创建div
        var div = document.createElement("div");
        //把div放到地图中
        map.appendChild(div);
        //设置div样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.background = this.color;
        //横纵坐标随机产生的----先脱离文档流
        div.style.position = "absolute";
        this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        //把div放到数组中
        elements.push(div);
    };
    //创建一个私有函数，删除食物用
    function remove(){
        var len = elements.length;
        //数组中有这个食物
        for (var i = 0; i < len; i++){
            var ele = elements[i];
            //找到这个数组里的div的父级元素，然后删掉他的子元素
            ele.parentNode.removeChild(ele);
            //再把elements里面的这个div也要删掉
            elements.splice(i,1);
        }
    }
    window.Food = Food;//暴露给window，外部可以用

}());