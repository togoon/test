{- 参数 -}
N:=12;
指标:=-6;

均价:=MA(CLOSE,N);
乖离:(CLOSE-均价)/均价*100;
条件:乖离-指标<0;
