{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
TYP:=(HIGH + LOW + CLOSE)/3;
CCI:=(TYP-MA(TYP,13))/(0.015*AVEDEV(TYP,13));
幸福买点2:CROSS(CCI,-200) AND CCI>REF(CCI,1) AND MA(C,5)/L>=1.07 AND V<REF(V,1)*0.66 AND V<=MA(V,5),COLORRED;
DRAWTEXT(幸福买点2,0.70,'幸福买点2'),COLORYELLOW;