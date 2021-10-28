{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
DRAWTEXT_FIX(1,0.88,5,0,'~☆~太虚~☆~'),COLORBLUE;
多方趋势:((7)*(SMA(((CLOSE-LLV(LOW,27))/(HHV(HIGH,27)-LLV(LOW,27)))*(30),4,1))-(3)*(SMA(SMA(((CLOSE-LLV(LOW,27))/(HHV(HIGH,27)-LLV(LOW,27)))*(30),4,1),3,1))-SMA(SMA(SMA(((CLOSE-LLV(LOW,27))/(HHV(HIGH,27)-LLV(LOW,27)))*(30),4,1),3,1),2,1)),COLOR0000FF;
空方趋势:(EMA(MA(多方趋势,5),7)),COLORF0F000;
STICKLINE((多方趋势>78) AND (多方趋势>=空方趋势),78,多方趋势,5,1),COLOR00FF00;
STICKLINE((空方趋势<=多方趋势),空方趋势,多方趋势,3,0),COLOR0000FF;
STICKLINE((空方趋势>多方趋势),多方趋势,空方趋势,3,0),COLORF0F000;
STICKLINE((空方趋势<14) AND (空方趋势>多方趋势),多方趋势,20,3,0),COLOR00FFFF;
TJ:=FILTER((空方趋势<14) AND (空方趋势>多方趋势),6);
DRAWTEXT(TJ,40,'低吸'),COLORFFFFFF;
探测金矿:(空方趋势<12) AND (空方趋势<=多方趋势),COLOR00FFFF;
选金股:CROSS(多方趋势,空方趋势) AND (空方趋势<22),COLOR0000FF;
DRAWTEXT(CROSS(多方趋势,空方趋势) AND (空方趋势<22),30,'金股'),COLOR00FFFF;
中间线:50,COLORFFFFFF,POINTDOT;