{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
白龙: MA(CLOSE,125);
黄龙: 白龙+2*STD(CLOSE,170);
紫龙: 白龙-2*STD(CLOSE,145);
青龙: SAR(125,1,7), LINESTICK;
VAR2:=HHV(HIGH,70);
VAR3:=HHV(HIGH,20);
红龙: VAR2*0.83;
蓝龙: VAR3*0.91;