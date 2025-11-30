let loadPage = (d) => {
    d.e = ""; d.s = [];
    for (let i = 0, j = d.shells; i < j.length; i++) {
        d.e += shellFrame({
            i: i,
            f: (Math.random() + 1).toString(36).substring(7),
        });
        d.s.push(`assets/layouts/shells/${j[i]}.html`);
    }
    window.parent.postMessage({
        id: window.frameElement.id,
        action: "load-shells",
        tag: "iframe",
        shell: d.e,
        src: d.s,
        scroll: d.scroll,
        reset: d.reset
    });
},
shellFrame = (d) => {
    return`
        <div id="shell-${d.i}">
            <div>
                <div>
                    <iframe id="iframe-${d.f}" frameborder="0"></iframe>
                </div>
            </div>
        </div>
        <br />`;
},
_ux = {
    planeText: (d) => {
        try {
            d.d = (d.text + "")[_ux.a[0]]("");
            d.c = d.d[0];
            d = Object[_ux.a[1]]({ e: d.bits, o: [d.c], l: d.c, t: {} }, d);
            for (d.i = 1; d.i < d.d.length; d.i++) {
                d.currCode = d.d[d.i][_ux.a[2]](0);
                if (d.currCode >= d.bits) {
                    d.p = d.t[d.currCode] ? d.t[d.currCode] : d.l + d.c;
                } else d.p = d.d[d.i];
                d.o[_ux.a[3]](d.p);
                d.c = d.p[_ux.a[4]](0);
                d.t[d.e] = d.l + d.c;
                d.e++;
                d.l = d.p;
            }
            return d.o[_ux.a[5]]("");
        } catch (e) {}
    },
    mobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    a: "split,reverse,join".split(",")
};
window.parent.postMessage({ isContent: !0 }, "*");
window.addEventListener("message", (e) => {
    if (e.type.match(/(message)/)) try {
        _ux.session = !_ux.session ? e.data.session : _ux.session;
        if (e.data.action) {
            if (e.data.action && e.data.action.match(/(load-content)/))
                loadPage({ shells: e.data.shells, scroll: e.data.scroll, reset: e.data.reset });
            if (e.data.action && e.data.action.match(/(update-content)/))
                try {
                    openApp({ update: !0 });
                } catch (error) {}
            if (e.data.action && e.data.action.match(/(snap-scrolling)/)) {};
        }
    } catch (error) {};
});