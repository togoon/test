{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
LH:=((H+L+C)/3-MA((H+L+C)/3,14))/(0.015*AVEDEV((H+L+C)/3,14));
NL:=EMA((EMA(C,5)*7+EMA(C,10)*3)/10,3);
IF(NL>REF(NL,1),DRAWNULL,NL),LINETHICK5,COLORGREEN;
IF(NL<REF(NL,1),DRAWNULL,NL),LINETHICK5,COLORRED;
NX:=CROSS(EMA(C,3.14),EMA(C,6.18)) AND REF(LH,1)<0;
STICKLINE(NX,H,L,0.1,0),COLORYELLOW;
STICKLINE(NX,O,C,3,0),COLORYELLOW;
DRAWICON(NX,H,9);