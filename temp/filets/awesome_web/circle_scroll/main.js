window.onload=function(){
  var odiv = document.getElementById('div1');
  var oul = odiv.getElementsByTagName('ul')[0];
  var ali = oul.getElementsByTagName('li');
  var spa = -2;				

  oul.innerHTML=oul.innerHTML+oul.innerHTML; // 把内容复制一份，便于实现循环对接

  oul.style.width=ali[0].offsetWidth*ali.length+'px'; // 动态指定一下width

  function move(){
    if(oul.offsetLeft<-oul.offsetWidth/2){
      oul.style.left='0';
    }
    if(oul.offsetLeft>0){
      oul.style.left=-oul.offsetWidth/2+'px'
    }
    oul.style.left=oul.offsetLeft+spa+'px';
  }
  var timer = setInterval(move,30)

  odiv.onmousemove=function(){clearInterval(timer);}
  odiv.onmouseout=function(){timer = setInterval(move,30)};

  document.getElementsByTagName('a')[0].onclick = function(){
    spa=-2;
  }
  document.getElementsByTagName('a')[1].onclick = function(){
    spa=2;
  }
}
