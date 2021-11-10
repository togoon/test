{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
VAR1:=HHV(H,66);
VAR2:=REF(C,1);
VAR3:=REF(O,1);
VAR4:=(VAR1-H)/H;
VAR5:=(H>=VAR1);
VAR6:=(VAR5>0 AND VAR5<=0.025);
VAR7:="MACD.MACD";
最牛金牛:IF((C-VAR2)/VAR2>0.095 AND VAR2>VAR3 AND (VAR5 OR VAR6) AND CROSS(VAR7,0),100,0),COLORRED;