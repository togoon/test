{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
N:=75;
摆动值:(CLOSE-MA(CLOSE,7)),COLORYELLOW;
中轴:0,COLORWHITE;
B:=(CLOSE-MA(CLOSE,7));
超买:(HHV(B,60)-0)*N/100,COLORRED;
超卖:(LLV(B,60)-0)*N/100,COLORGREEN;