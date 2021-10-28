{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
X_1:=150;
X_2:=3;
X_3:=REF(HHV(HIGH,X_1),X_2);
X_4:=REF(LLV(LOW,X_1),X_2);
X_5:=X_3-(X_3-X_4)*0.618;
X_6:=REFDATE(X_5,DATE);
横盘天数:BARSLASTCOUNT(CLOSE<X_6),COLORGREEN;
X_7:=CROSS(CLOSE,X_6);
X_8:=横盘天数>300;
X_9:=REF(X_8,1);
X_10:=X_9 AND X_7;
DRAWICON(X_10,150,34);