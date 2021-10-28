{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
V1:=MA(V,40);
KK:=MA(C,20);
A1:=COUNT(V/V1<1.3,14)>11;
A2:=EVERY(C>=KK,3);
A3:=COUNT(V/V1>1.5,5)>=3;
ZTJ:(A1 AND LONGCROSS(A2,0.5,30)) OR (A3 AND LONGCROSS(A2,0.5,30));