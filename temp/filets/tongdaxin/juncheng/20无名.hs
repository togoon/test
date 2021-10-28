{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}

B:=VOL/REF(MA(VOL,5),1);

CD:=ABS(MA(C,5)/MA(C,20))<0.98;
XG1:= CD AND B>1;
STICKLINE(XG1,0,1,1,-1),COLORRED;
