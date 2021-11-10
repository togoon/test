{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
V1:=V/MA(REF(V,1),5);
V2:=INDEXV/MA(REF(INDEXV,1),5);
LT:=(CAPITAL/100)/10000<=10;
V0:=V1/V2;
ZF:=O/REF(C,1);
角05:=ATAN((EMA(C,7)/REF(EMA(C,7),1)-1)*100)*57.3;
角13:=ATAN((EMA(C,13)/REF(EMA(C,13),1)-1)*100)*57.3;
角34:=ATAN((EMA(C,34)/REF(EMA(C,34),1)-1)*100)*57.3;
XG:LT AND 角05>50 AND 角13>35 AND 角34>17 AND V0>3.5 AND ZF>1 AND ZF<1.05 AND C>O;