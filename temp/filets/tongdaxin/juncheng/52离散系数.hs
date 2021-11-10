{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
A:=(C-MA(C,20))/STD(C,20);
A1:=1+POW(A,2);
A2:=SQRT(A1);
A3:=A/A2;
LS:ASIN(A3)*90 COLORMAGENTA;
LS1:EMA(LS,2) COLORWHITE;
LS2:EMA(LS1,2) COLORYELLOW;
