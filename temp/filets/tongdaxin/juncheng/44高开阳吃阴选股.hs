{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
涨幅:=1;
KZZZ:REF(C,1)<REF(O,1) AND O>REF(O,1) AND O/REF(C,1)>1+0.01*涨幅 AND O/REF(C,1)<1.097;