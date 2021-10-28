{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
N:=3;
Var1:=MA(HHV(HIGH,485),17);
Var2:=MA(HHV(HIGH,222),17);
Var3:=MA(HHV(HIGH,96),17);
Var4:=MA(LLV(LOW,485),17);
Var5:=MA(LLV(LOW,222),17);
Var6:=MA(LLV(LOW,96),17);
Var7:=MA((Var4*0.96+Var5*0.96+Var6*0.96+Var1*0.558+Var2*0.558+Var3*0.558)/6,17);
Var8:=MA((Var4*1.25+Var5*1.23+Var6*1.2+Var1*0.55+Var2*0.55+Var3*0.65)/6,17);
Var9:=MA((Var4*1.3+Var5*1.3+Var6*1.3+Var1*0.68+Var2*0.68+Var3*0.68)/6,17);
VarA:=MA((Var7*3+Var8*2+Var9)/6*1.738,17);
VarB:=IF(DATE<=1050531,VarA,VarA*DAY);
VarC:=LOW;
VarD:=REF(LOW,1);
VarE:=SMA(ABS(VarC-VarD),3,1)/SMA(MAX(VarC-VarD,0),N,1)*100;
VarF:=MA(IF(CLOSE*1.35<=VarB,VarE*10,VarE/10),N);
Var10:=LLV(LOW,30);
Var11:=HHV(VarF,30);
Var12:=1990831;
绝佳买点:=IF(DATE<=Var12,MA(IF(LOW<=Var10,(VarF+Var11*2)/2,0),N),100000000);
I:=IF(CLOSE<REF(CLOSE,1),VOL/CAPITAL*10053,0);
骤雨初晴:= ABS(EMA(I,13.3)-18)/WINNER(CLOSE)*IF((CLOSE-MA(CLOSE,6))/MA(CLOSE,6)<-0.04,1,0);
短线买:if(绝佳买点>500 and 绝佳买点>2500,1,0),coloryellow,LINETHICK1;
中线买:if(绝佳买点>10000 and 绝佳买点>20000,2,0),colorff00ff,LINETHICK2;
倾家荡产买:if(绝佳买点>30000 and 绝佳买点>30000,3,0),colorred,LINETHICK3;