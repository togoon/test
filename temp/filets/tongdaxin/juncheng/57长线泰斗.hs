{操作问题可以联系客服 微信号:traderByAI QQ号:2097927606;}
{更多指标，请关注微信公众号免费获取:Trader_AI;}
{欢迎指标交流QQ群:75200686,备注：指标交流;}
h1:(ema(((slope(close,34) * 20) + close),75) * 1);
h2:ema(close,8);
kl:=(h2 - h1);
stickline((kl >= 0),h2,h1,0.5,0)colorred;
stickline((kl < 0),h2,h1,0.5,0)colorgreen;