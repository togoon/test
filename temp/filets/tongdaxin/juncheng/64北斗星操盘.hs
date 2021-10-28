{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
北斗星操盘线: MA(3*SMA((CLOSE-LLV(LOW,27))/(HHV(HIGH,27)-LLV(LOW,27))*100,5,1)-2*SMA(SMA((CLOSE-LLV(LOW,27))/(HHV(HIGH,27)-LLV(LOW,27))*100,5,1),3,1),5), , COLORBLUE;
安全星云区: 5, , COLORYELLOW;
主力异动: IF(北斗星操盘线<=5,50,0), , COLORGREEN;
北斗星出击: IF(CROSS(北斗星操盘线,安全星云区),100,0), , COLORRED;
北斗星买点: 北斗星出击, , COLORRED;
DRAWTEXT(北斗星出击,50,'北斗星买点'), , COLORRED;
DRAWICON(北斗星出击,50,1);