{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
底部出现:=MA(IF(L<=LLV(L,13),MA(C,21),0),3)/200;
买点:=IF(REF(底部出现,1)>0 AND REF(C,1)<=REF(O,1) AND 底部出现>0,1,0);
STICKLINE(买点=1,0,0.3,4,0),COLORYELLOW;
DRAWICON(买点=1,0.32,13);