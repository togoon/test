{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
快线:=EMA(C,7)-EMA(C,21),LINETHICK2,COLORRED;
慢线:=MA(快线,4),COLORGREEN,LINETHICK2;
数值:=EMA((0.668*REF(快线,1)+0.333*快线),1),COLORSTICK;
X1:=V/SUM(V,13);
X2:=DMA(C,X1);
X3:=(C-X2)/X2*40;
L2:=MA(AMOUNT/(100*V),13);
CYS13:= (C-L2)/L2*100;
做多:=IF(快线>=数值,快线,数值);
做空:=IF(数值-快线,数值,快线);
强庄:STICKLINE(CYS13>4,L-0.22,L-0.35,2.5,0),COLORYELLOW;