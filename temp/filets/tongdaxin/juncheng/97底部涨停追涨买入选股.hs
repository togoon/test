{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
长下影线:=(MIN(C,O)-L)>ABS(C-O)*1.95;
长上影线:=(H-MAX(C,O))>ABS(C-O)*1.95;
涨停:=C/REF(C,1)>=1.075 AND REF(C,1)/REF(C,2)<1.03;
底部追涨:LLV(L,(长上影线 OR 长下影线))>REF(HHV(H,涨停),1) AND H/LLV(L,10)<1.35;