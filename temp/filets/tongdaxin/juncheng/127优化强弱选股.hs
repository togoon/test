{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
L1:=SMA(C,5,1);
K1:=REF(SLOPE(L1,10),60),LINETHICK5,COLORFF0000;
K2:=REF(SLOPE(L1,10),30),LINETHICK4,COLORFF00AA;
K3:=REF(SLOPE(L1,10),12),LINETHICK3,COLORAA00FF;
K4:=REF(SLOPE(L1,10),6),LINETHICK2,COLOR5500FF;
K5:=SLOPE(L1,10),LINETHICK1,COLOR0000FF;
c1:k5>k4 and k4>k3 and k3>k2 and k2>k1;