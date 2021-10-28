{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
A1:=BARSLAST(CROSS(C,MA(C,20)));
A2:=BARSLAST(CROSS(MA(C,20),C));
起涨:IF(A1<A2,A1+1,0);