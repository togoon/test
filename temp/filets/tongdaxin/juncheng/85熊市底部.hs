{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
N:=27;M1:=9;M2:=5;M3:=3;
Var2:=(CLOSE-LLV(LOW,n))/(HHV(HIGH,n)-LLV(LOW,n))*100;
Var3:=SMA(Var2,m1,1);
K: SMA(Var3,m2,1);
D: SMA(K,m3,1);
J: 3*K-2*D;
VarA:=(CLOSE-LLV(LOW,21.55))/(HHV(HIGH,21.55)-LLV(LOW,34))*80;
VarB:=SMA(VarA,9,1);
VarC:=SMA(VarB,5,1);
IF(CROSS(VarB,VarC) AND VarB<13,100,0),linethick2,colorred;