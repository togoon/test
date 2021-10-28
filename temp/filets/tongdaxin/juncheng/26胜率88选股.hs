{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
QVAR1A:=((HHV(HIGH,21)-CLOSE)/(HHV(HIGH,21)-LLV(LOW,21)))*(100)-10;
QVAR1B:=((CLOSE-LLV(LOW,21))/(HHV(HIGH,21)-LLV(LOW,21)))*(100);
QVAR1C:=SMA(QVAR1B,13,8);
QVAR1D:=SMA(QVAR1A,21,8);
机会:=SMA(QVAR1C,13,8);
尾2:(FILTERX((COUNT((机会-QVAR1D<(-68)),3)=3),10));