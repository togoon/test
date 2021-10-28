{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
M10:=EXPMA(C,10);
TJ:=IF(MAX(C,O)<=M10,RANGE(MAX(C,O)/M10,0.99,1.005),IF(MIN(C,O)>=M10,RANGE(MIN(C,O)/M10,0.999,1.01),DRAWNULL));
TJ1:=C=HHV(MAX(C,O),10) AND V=HHV(V,10);
XG:REF(EVERY(TJ,10),1) AND TJ1;