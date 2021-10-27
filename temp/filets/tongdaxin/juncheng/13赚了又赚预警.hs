{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
ZF:=(C-REF(C,1))/REF(C,1)*100;
AA:=EMA(EMA((C-REF(C,1)),6),6)*100/EMA(EMA(ABS((C-REF(C,1))),6),6);
DD:=LLV(AA,BARSLAST(AA<REF(AA,1))+1);
ZT:=BARSLAST(CROSS(AA,DD*0.66) AND AA<0 AND DD<-20);
MR:CROSS(AA,DD*0.66) AND AA<0 AND DD<-20;