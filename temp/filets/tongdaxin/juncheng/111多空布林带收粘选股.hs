{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
N:=11;
M:=6;
M2:=5;
CV:=CLOSE;
BBIBOLL:=(MA(CV,3)+MA(CV,6)+MA(CV,12)+MA(CV,24))/4;
UPR:=BBIBOLL+M*STD(BBIBOLL,N);
DWN:=BBIBOLL-M*STD(BBIBOLL,N);
XG:((UPR-DWN)/DWN)*100<=M2 AND C>BBIBOLL;