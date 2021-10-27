{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
A:=C>O AND V>REF(V,1)*2.5 AND CROSS(C,MA(C,5));
B:=C>O AND V>REF(V,1)*10;
A OR B;