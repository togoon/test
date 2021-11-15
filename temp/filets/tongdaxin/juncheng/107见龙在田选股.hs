RSV:=(CLOSE-LLV(LOW,9))/(HHV(HIGH,9)-LLV(LOW,9))*100;
K:=SMA(RSV,3,1);
D:=SMA(K,3,1);
J:=3*K-2*D;

{- 前面是kdj -}

B:=LLV(J,90);
B1:=J=B;

{- 这个hhv和llv用得离谱 -}
KK:J>REF(J,1) AND REF(B1,1)=1 AND (HHV(C,O)-LLV(C,O))/C<0.02;
