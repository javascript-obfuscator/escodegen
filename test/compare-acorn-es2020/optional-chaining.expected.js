obj.aaa.bbb;
obj.aaa?.bbb;
obj?.aaa.bbb;
obj?.aaa?.bbb;
obj.aaa.bbb;
obj.aaa?.bbb;
(obj?.aaa).bbb;
(obj?.aaa)?.bbb;
(obj?.aaa).bbb.ccc.ddd;
((obj?.aaa).bbb?.ccc).ddd;
(obj?.aaa)?.bbb;
obj[aaa][bbb];
obj[aaa]?.[bbb];
obj?.[aaa][bbb];
obj?.[aaa]?.[bbb];
obj[aaa][bbb];
obj[aaa]?.[bbb];
(obj?.[aaa])[bbb];
(obj?.[aaa])?.[bbb];
obj[aaa][bbb][ccc][ddd];
((obj?.[aaa])[bbb]?.[ccc])[ddd];
1?.a;
obj()();
obj()?.();
obj?.()();
obj?.()?.();
obj()();
obj()?.();
(obj?.())();
(obj?.())?.();
obj()()()();
((obj?.())()?.())();
(a?.b)();
a?.b();
a?.b?.();
(a?.b)?.();
a?.().b;
(a?.()).b;
a?.b.c();
(a?.b.c)();
a.b?.().c;
(a.b?.()).c;
(a.b?.())?.c;
new (a?.b().c);
new (a?.b());
new (a?.b().c);
new (a?.b());
new (a?.b().c)(d, e);
new (a?.b())(d, e);