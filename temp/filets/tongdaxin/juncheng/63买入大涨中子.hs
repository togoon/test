{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
V3:=(CLOSE-LLV(LOW,8))/(HHV(HIGH,8)-LLV(LOW,8))*100;
操盘线:SMA(V3,2,1),LINETHICK3;
V5:SMA(操盘线,2,1);
抄底:IF(操盘线>REF(操盘线,1) AND REF(操盘线,1)<REF(操盘线,2) AND 操盘线<23 ,18,0),COLORYELLOW,LINETHICK3;
追买:IF(操盘线>REF(操盘线,1) AND CROSS(操盘线,V5) AND V5<50,8,0),COLORCYAN;