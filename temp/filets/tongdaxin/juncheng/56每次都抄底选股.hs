{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
P1:=-6;
BIAS1W :=(CLOSE-MA(CLOSE,6))/MA(CLOSE,6)*100;
BIAS2W :=(CLOSE-MA(CLOSE,12))/MA(CLOSE,12)*100;
BIAS3W :=(CLOSE-MA(CLOSE,24))/MA(CLOSE,24)*100;
MM:=(BIAS1W+2*BIAS2W+3*BIAS3W)/6;
MN:=MA(MM,3);
抄底:MN<P1;