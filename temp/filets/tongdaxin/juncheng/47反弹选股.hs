{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
RSV:=(C-LLV(L,27))/(HHV(H,27)-LLV(L,27))*100;
K:=SMA(RSV,5,1),COLORFFFFFF;
D:=SMA(K,3,1),COLOR00FFFF;
J:=3*K-2*D,COLORFF00FF,LINETHICK2;
MA1:=(H+L+C+O)/4;
MA5:=MA(MA1,5);
PL:=(MA1/MA5-1)*100;
急跌:=PL<=-12;
反弹:IF(CROSS(J,2),1,0);