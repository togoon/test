{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
VAR1:=REF(CLOSE,1);
VAR2:=SMA(MAX(CLOSE-VAR1,0),7,1)/SMA(ABS(CLOSE-VAR1),7,1)*100;
VAR3:=SMA(MAX(CLOSE-VAR1,0),13,1)/SMA(ABS(CLOSE-VAR1),13,1)*100;
VAR4:=SMA(MAX(VAR1-CLOSE,0),7,1)/SMA(ABS(CLOSE-VAR1),7,1)*100;
VAR5:=SMA(MAX(VAR1-CLOSE,0),13,1)/SMA(ABS(CLOSE-VAR1),13,1)*100;
VAR6:=BARSCOUNT(CLOSE);
提示顶底: VAR2<25 AND VAR3<30 AND VAR6>35, COLORSTICK;
0-ABS(VAR4<25 AND VAR5<30 AND VAR6>35), COLORSTICK;