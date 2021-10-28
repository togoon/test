{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
Var0:=SMA((C-LLV(L,30))/(HHV(H,30)-LLV(L,30)),3,1);
Var1:=SMA(Var0,3,1)*100;
Var2:=MA(Var1,7);
XG:IF(Var2>REF(Var2, 1) and REF(Var2, 1)<REF(Var2, 2) and ref(c,BARSLAST(REF(Var2, 1)>REF(Var2, 2) ))>1.4*c,1,0);