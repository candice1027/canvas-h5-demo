
// window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx =canvas.getContext('2d');
    var drawing = false;
    var startLocation = {
        'x': 0,
        'y': 0
    }
    var useRubber = false;
    var eraser = document.getElementById('eraser');
    var pencil = document.getElementById('pencil');
    //颜色按钮
    //var colorArr = ['red','yellow','green'];
    //初始化
    init();
    function init() {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    }
    window.onresize = function() {
        init();
    }
    // drawRect()
    // //画长方形
    // function drawRect() {
    //     ctx.fillStyle = '#fff';
    //     ctx.fillRect(0,0,canvas.width,canvas.height);
    // }
    //画线
    function drawLine(x,y) {
        ctx.beginPath();
        ctx.moveTo(startLocation.x,startLocation.y);
        ctx.lineTo(x,y);
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
    }

    //擦去图画
    function clearPic(x,y) {
        ctx.clearRect(x,y,10,10);
    }

    //使用橡皮
    eraser.onclick = function() {
        useRubber = true;
        eraser.classList.add('active');
        pencil.classList.remove('active');
    }
    //使用铅笔
    pencil.onclick = function() {
        useRubber = false;
        pencil.classList.add('active');
        eraser.classList.remove('active');
    }
    //清屏
    var clearBtn = document.getElementById('clear-btn');
    clearBtn.onclick = function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    //保存
    // var saveBtn = document.getElementById('save-btn');
    // saveBtn.onclick = function() {
    //     var url = canvas.toDataURL("image/png");
    //     var a = document.createElement('a');
    //        a.href = url;
    //        a.download = '你画的图真美';
    //        document.body.appendChild(a);
    //        a.click();
    // }
    //改变颜色
    var blackColor = document.getElementById('black');
    var redColor = document.getElementById('red');
    var yellowColor = document.getElementById('yellow');
    var greenColor = document.getElementById('green');
        blackColor.onclick = function() {
            ctx.strokeStyle = 'black';
            blackColor.classList.add('active');
            redColor.classList.remove('active');
            yellowColor.classList.remove('active');
            greenColor.classList.remove('active');
        }
        redColor.onclick = function() {
            ctx.strokeStyle = 'red';
            redColor.classList.add('active');
            yellowColor.classList.remove('active');
            greenColor.classList.remove('active');
            blackColor.classList.remove('active');
        }
        yellowColor.onclick = function() {
            ctx.strokeStyle = 'yellow';
            redColor.classList.remove('active');
            yellowColor.classList.add('active');
            greenColor.classList.remove('active');
            blackColor.classList.remove('active');
        }
        greenColor.onclick = function() {
            ctx.strokeStyle = 'green';
            redColor.classList.remove('active');
            yellowColor.classList.remove('active');
            greenColor.classList.add('active');
            blackColor.classList.remove('active');
        }

    //监听用户鼠标事件
    listenMouse(canvas);
    function listenMouse(canvas) {   
        canvas.ontouchstart = function(e) {
            console.log(e)
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if (useRubber) {
                clearPic(x,y)
            } else {
                drawing = true;   
                startLocation.x = x;
                startLocation.y = y;
            }  
        }
        canvas.ontouchend = function(e) {
            drawing = false;
        }
        canvas.ontouchmove = function(e) {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if (useRubber) {
                clearPic(x,y);
                return false;
            } 
            if (drawing) {  
                drawLine(x,y);
                startLocation.x = x;
                startLocation.y = y;
            }      
        }
    }
// }
