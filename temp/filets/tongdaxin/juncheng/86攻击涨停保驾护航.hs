{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
N:=IF(BARSLAST(CROSS(MA(C,3),MA(C,5)))<BARSLAST(CROSS(MA(C,5),MA(C,3))),BARSLAST(CROSS(MA(C,3),MA(C,5)))+1,0-BARSLAST(CROSS(MA(C,5),MA(C,3)))-1);
STICKLINE(N>0,0-25,0-25+N*2,2,1),COLORFF8800;