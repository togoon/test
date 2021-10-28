{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
N:=5;
VAR2:=CLOSE*VOL;
VAR3:=EMA((EXPMA(VAR2,3)/EXPMA(VOL,3)+EXPMA(VAR2,6)/EXPMA(VOL,6)+EXPMA(VAR2,12)/EXPMA(VOL,12)+EXPMA(VAR2,24)/EXPMA(VOL,24))/4,13);
SUP:=1.06*VAR3;
SDN:=VAR3*0.94;
涨幅:=(C-REF(C,1))/REF(C,1)*100;
五日总涨幅:=SUM((C-REF(C,1))/REF(C,1)*100,N)<5;
反七伤:REF(涨幅<-5.5,N) AND 五日总涨幅 AND C>SDN;