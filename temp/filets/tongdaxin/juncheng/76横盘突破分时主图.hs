{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
今日开盘线:DYNAINFO(4),COLORMAGENTA;
今日最高价:=DYNAINFO(5),COLORBLUE;
今日最低价:DYNAINFO(6),COLORGREEN;
今日均价线:=DYNAINFO(11),COLORYELLOW;
CC:=C;
TT:=BARSCOUNT(CC);
均价:SUM(V*C,0)/SUM(V,0),COLORGREEN;
均:=MA(CC,TT);
上均线:=均+2*STD(CC,3),COLORMAGENTA;
下均线:=均-2*STD(CC,3),COLORYELLOW;
DRAWICON(CROSS(均价,均),均价,1);
时长:=TIME>93000;
涨幅:=CC/REF(C,1)>1.02;
跌幅:=CC/REF(C,1)<0.98;
横盘:=((HHV(CC,TT)-LLV(CC,TT))/CC)<0.05;
YY:=SMA(VOL,30,1);
放量:=(YY-LLV(LLV(YY,1),30))/(HHV(HHV(YY,1),30)-LLV(LLV(YY,1),30))>0.95;
涨跌幅:=涨幅 OR 跌幅;
横涨1:=涨跌幅=0 AND 横盘 AND 放量 AND CROSS(均价,均);
DRAWTEXT(FILTER(横涨1,10),均价,'突'),COLORYELLOW;
横涨2:=涨跌幅=0 AND 横盘 AND 放量 AND CROSS(C,均价) AND CROSS(C,均);
DRAWTEXT(FILTER(横涨2,10),均价*0.99,'升'),COLORRED;