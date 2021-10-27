{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
LS:=C/REF(C,1)>1.048 AND C=H AND BETWEEN(FORCAST(V,4),0.2*FORCAST(V,12),2.1*FORCAST(V,12));
拉升:FILTER(LS,28);