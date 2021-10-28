{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
VARA:=(CLOSE-LLV(LOW,9))/(HHV(HIGH,9)-LLV(LOW,9))*100;
VARB:=SMA(VARA,3,1);
VARC:=SMA(VARB,3,1);
加速: EMA(3*VARB-2*VARC,3)/30.5,COLORYELLOW;