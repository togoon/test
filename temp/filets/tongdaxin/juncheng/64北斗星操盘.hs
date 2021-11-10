北斗星操盘线: MA(3*SMA((CLOSE-LLV(LOW,27))/(HHV(HIGH,27)-LLV(LOW,27))*100,5,1)-2*SMA(SMA((CLOSE-LLV(LOW,27))/(HHV(HIGH,27)-LLV(LOW,27))*100,5,1),3,1),5), , COLORBLUE;
安全星云区: 5, , COLORYELLOW;
主力异动: IF(北斗星操盘线<=5,50,0), , COLORGREEN;
北斗星出击: IF(CROSS(北斗星操盘线,安全星云区),100,0), , COLORRED;
北斗星买点: 北斗星出击, , COLORRED;
DRAWTEXT(北斗星出击,50,'北斗星买点'), , COLORRED;
DRAWICON(北斗星出击,50,1);
