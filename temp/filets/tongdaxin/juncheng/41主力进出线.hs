{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
VAR1:=(C*3+H+L+O)/6;
VAR2:=EMA(VAR1,13)-EMA(VAR1,34);
VAR3:=EMA(VAR2,5);
主力控盘:2*(VAR2-VAR3)*3.8,COLORRED;
主力弃盘:(-2)*(VAR2-VAR3)*3.8,COLORGREEN;
