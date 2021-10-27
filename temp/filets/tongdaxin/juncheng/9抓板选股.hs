{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
抓涨停:=O>C AND C>REF(C,1) AND O/REF(C,1)>1.03;
获利盘:=WINNER(C)>0.9;
XG:抓涨停 AND 获利盘;
