{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
VAR1XY:=(CLOSE-LLV(LOW,9))/(HHV(HIGH,9)-LLV(LOW,9))*100;
VAR2XY:=EMA(VAR1XY,30);
VAR3XY:=EMA(VAR2XY,30);
VAR4XY:=3*VAR2XY-2*VAR3XY;
势:=EMA(VAR4XY,5);
准备资金:CROSS(10,势);