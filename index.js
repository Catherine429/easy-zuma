/**
 * Created by Administrator on 2018/3/9.
 */
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        var yImg = new Image();
        var degree = 0;

        yImg.onload = function () {

            oGC.save();
            oGC.translate(oC.width/2, oC.height/2);
            oGC.translate(-40, -40);
            oGC.drawImage(yImg, oC.width/2, oC.height/2);
            oGC.restore();

        }

        yImg.src = 'person.png';

        var ball = [];
        setInterval(function () {
            ball.push({
                x : oC.width/2,
                y : oC.height/2 - 200,
                degree : 0,
                r : 20
            });
        }, 350);

        setInterval(function () {

            oGC.clearRect(0, 0, oC.width, oC.height);

            oGC.save();
            oGC.beginPath();
            oGC.translate(oC.width/2, oC.height/2);
            oGC.rotate(degree);
            oGC.translate(-40, -40);
            oGC.drawImage(yImg, 0, 0);
            oGC.closePath();
            oGC.restore();

            oGC.beginPath();
            oGC.arc(oC.width/2, oC.height/2, 200, -90*Math.PI/180, 180*Math.PI/180, false);
            oGC.stroke();
            oGC.closePath();

            oGC.beginPath();
            oGC.arc(oC.width/2-200+150, oC.height/2, 150, 0, 180*Math.PI/180, true);
            oGC.stroke();
            oGC.closePath();

            oGC.beginPath();
            oGC.arc(oC.width/2-200+300, oC.height/2, 20, 0, 360*Math.PI/180, false);
            oGC.stroke();
            oGC.closePath();

            for(var i=0; i<ball.length; i++) {
                oGC.beginPath();
                oGC.arc(ball[i].x, ball[i].y, ball[i].r, 0, 360*Math.PI/180, false);
                oGC.fill();
                oGC.closePath();
            }


            for(var i=0; i<bullet.length; i++) {
                oGC.save();
                oGC.beginPath();
                oGC.fillStyle = 'red';
                oGC.arc(bullet[i].x, bullet[i].y, bullet[i].r, 0, 360*Math.PI/180, false);
                oGC.fill();
                oGC.closePath();
                oGC.restore();
            }


        }, 1000/60);

        setInterval(function () {

            for(var i=0; i<ball.length; i++) {
                ball[i].degree++;
                ball[i].x = 200*Math.sin(ball[i].degree*Math.PI/180)+oC.width/2;
                ball[i].y = oC.height/2-200*Math.cos(ball[i].degree*Math.PI/180);

                if(ball[i].degree > 270) {
                    ball[i].x = 150*Math.sin(ball[i].degree*Math.PI/180)+oC.width/2-200+150;
                    ball[i].y = oC.height/2-150*Math.cos(ball[i].degree*Math.PI/180);
                }

                /*if(ball[i].x == (oC.width/2-200+300) && (ball[i].y == oC.height/2)) {
                 alert("游戏结束");
                 window.location.reload();
                 }*/             //为什么不行？？？

                if(ball[i].degree == 450) {
                    alert("游戏结束");
                    window.location.reload();
                }


            }

            for(var i=0; i<bullet.length; i++) {
                bullet[i].x = bullet[i].x + bullet[i].sX;
                bullet[i].y = bullet[i].y + bullet[i].sY;
            }

            //碰撞检测
            for(var i=0; i<bullet.length; i++) {
                for(var j=0; j<ball.length; j++) {
                    if(crashCheck(bullet[i].x, bullet[i].y, ball[j].x, ball[j].y, bullet[i].r, ball[j].r)) {
                        bullet.splice(i, 1);
                        ball.splice(j, 1);
                        break;
                    }
                }
            }


        }, 30);

        oC.onmousemove = function (ev) {

            var ev = ev || window.event;

            var a = ev.clientX - oC.offsetLeft - (oC.width-80)/2;
            var b = (oC.height-80)/2 - (ev.clientY - oC.offsetTop);
            var c = Math.sqrt(a*a+b*b);

            if(b > 0) {
                degree = Math.asin(a/c);
            } else {
                degree = 90*Math.PI/180 + Math.acos(a/c);
            }


        }


        //每点击一次，就创建一个子弹出来
        var bullet = [];
        oC.onmousedown = function (ev) {

            var ev = ev || window.event;
            var a = ev.clientX - oC.offsetLeft - oC.width/2;
            var b = ev.clientY - oC.offsetTop - oC.height/2;
            var c = Math.sqrt(a*a+b*b);

            var speed = 5;

            var speedX = speed * a/c;
            var speedY = speed * b/c;


            bullet.push({
                x : oC.width/2,
                y : oC.height/2,
                r : 20,
                sX : speedX,
                sY : speedY
            });

        }

        function crashCheck(x1, y1, x2, y2, r1, r2) {

            var x = x2 - x1;
            var y = y2 - y1;
            var z = Math.sqrt(x*x+y*y);

            if(z < (r1 + r2)) {
                return true;
            } else {
                return false;
            }

        }