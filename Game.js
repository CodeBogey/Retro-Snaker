//自调用函数---游戏的
(function(){
    var that = null;//保存游戏的实例对象
    //游戏的构造函数
    function Game(map) {
        this.food = new Food();//食物对象
        this.snake = new Snake();//大蛇对象
        this.map = map;//地图
        that = this;
    }
    Game.prototype.init = function () {
        // 初始化游戏
        this.food.init(this.map);//食物初始化
        this.snake.init(this.map);//小蛇初始化
        // setInterval(function () {
        //     that.snake.move(that.food,that.map);
        //     that.snake.init(that.map);
        // },150)
        //换调用函数
        this.runSnake(this.food,this.map);
        //调用按键的方法
        this.bindKey();
    };
    //让大蛇自动跑起来
    Game.prototype.runSnake = function(food,map){
        //此时的this指向window
        var timer = setInterval(function () {
            this.snake.move(this.food,this.map);
            this.snake.init(this.map);
            //横坐标最大值
            var maxX = map.offsetWidth/this.snake.width;
            // 纵坐标最大值
            var maxY = map.offsetHeight/this.snake.height;
            //大蛇的头的坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            //判断
            if (headX < 0 || headX >= maxX){
                alert("Game(^__^)Over");
                //撞墙了停止定时器
                clearInterval(timer);
            }
            if (headY < 0 || headY >= maxY){
                alert("Game(^__^)Over");
                clearInterval(timer);
            }
        }.bind(that),150)
    };
    //键盘按下事件
    Game.prototype.bindKey = function(){
        // 获取按键，改变小蛇的方向
        document.addEventListener("keydown",function (e) {
            // 这里的this是document
            switch (e.keyCode) {
                case 37:this.snake.direction = "left";break;
                case 38:this.snake.direction = "top";break;
                case 39:this.snake.direction = "right";break;
                case 40:this.snake.direction = "bottom";break;
            }
        }.bind(that),false)
    };
    window.Game = Game;

}());