{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
A1:=REF(C,2)>REF(C,3)*1.095 AND REF(C,2)=REF(H,2);
A2:=REF(C,1)<REF(O,1)*1.005 AND REF(C,1)*1.02<REF(C,2);
A3:=C>REF(C,2) AND C>REF(H,1) AND C>=REF(C,1)*1.095 AND C=H;
双响炮:A1 AND A2 AND A3;