{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
DC:=(2*C+H+L+O)/5;
EMDC:=EMA(EMA(EMA(DC,4),4),4);
BB:=(EMDC-REF(EMDC,1))/REF(EMDC,1)*100,;
BA:=MA(BB,6);
私募资金:(BB-BA)*100,NODRAW,COLORRED;
DRAWBAND(私募资金,RGB(255,1,0),0,RGB(51,255,255));