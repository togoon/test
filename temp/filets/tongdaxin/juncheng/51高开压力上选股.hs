{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
涨幅:=1;
NN:=80;
MM:=3;
一:=REF(HHV(H,NN),MM);
二:=REF(LLV(L,NN),MM);
三:=一-(一-二)*0.191;
四:=一-(一-二)*0.382;
五:=一-(一-二)*0.5;
六:=一-(一-二)*0.618;
七:=一-(一-二)*0.809;
KAAAAA:=IF(O>一 AND REF(C,1)<一,1,0);
KBBBAA:=IF(O>二 AND REF(C,1)<二,1,0);
KCCCAA:=IF(O>三 AND REF(C,1)<三,1,0);
KDDDAA:=IF(O>四 AND REF(C,1)<四,1,0);
KEEEAA:=IF(O>五 AND REF(C,1)<五,1,0);
KFFFAA:=IF(O>六 AND REF(C,1)<六,1,0);
KGGGAA:=IF(O>七 AND REF(C,1)<七,1,0);
高开涨停A:=KAAAAA OR KBBBAA OR KCCCAA OR KDDDAA OR KEEEAA OR KFFFAA OR KGGGAA;
KYYYY:高开涨停A AND O/REF(C,1)>1+0.01*涨幅 AND O/REF(C,1)<1.097;