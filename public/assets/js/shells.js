let loadShells = (d) => {
    d.e = document.getElementById(`shell-${d.i}`);
    d = localStorage.needUpdate ? Object.assign(d, { shells: ["settings", "balance", "options"], scroll: 1, reset: !0, update: (delete localStorage.needUpdate) }) : d;
    if (d.e) {
        d.f = d.e.getElementsByTagName("iframe")[0];
        if (d.f) d.f.contentWindow.postMessage({ session: _uz.session, action: "load-content", shells: d.shells, scroll: d.scroll, reset: d.reset });
    }
}
loadSrc = (d) => {
    d.e = document.getElementById(`shell-${d.i}`);
    if (d.e) {
        d.f = d.e.getElementsByTagName("iframe")[0];
        if (d.f.src == "") {
            d.f.src = d.src[d.i];
            if(!_pm.decam)
                document.querySelector(".pre-loader").style.display = "block";
            else _pm.decam.unfade(document.querySelector(".pre-loader"), 120);
        }
    }
},
urlCharDecode = (url) => {
    return url
        .toString()
        .replace(/%2C/g, ",")
        .replace(/%CF%85/g, "υ")
        .replace(/%CF%82/g, "ς")
        .replace(/%20/g, " ")
        .replace(/%26/g, "&")
        .replace(/%27/g, "'")
        .replace(/%22/g, '"')
        .replace(/%3C/g, "<")
        .replace(/%3E/g, ">")
        .replace(/%28/g, "(")
        .replace(/%29/g, ")")
        .replace(/%5B/g, "[")
        .replace(/%5D/g, "]")
        .replace(/%7B/g, "{")
        .replace(/%7D/g, "}");
},
receivedData = (d) => {
    document.getElementById(d.id).contentWindow.postMessage({
        session: _uz.session,
        action: d.type == "shoutouts" ? "public-message" : d.type,
        uid: _pm.user.uid,
        message: (_pm.return.exist = _pm.return.data[0]) ? structuredClone(_pm.return.exist) : undefined
    });
},
fullscreen = (d) => {
    if (!_uz.full) {
        _uz.full = !0;
        try {
            if (d.scr.requestFullscreen) {
                d.scr.requestFullscreen();
            } else if (d.scr.msRequestFullscreen) {
                d.scr.msRequestFullscreen();
            } else if (d.scr.mozRequestFullScreen) {
                d.scr.mozRequestFullScreen();
            } else if (d.scr.webkitRequestFullscreen)
                d.scr.webkitRequestFullscreen();
        } catch (e) {}
    } else {
        delete _uz.full;
        if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen)
			document.webkitExitFullscreen();
    }
},
insertCommas = (n) => {
    return `${n}`.replace(/(\.\d{2})\d+$/, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
},
onWindowResize = (d) => {
    _uz.mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    d.o = document.getElementsByTagName("iframe");
    if (d.o.length > 1)
        for (let i = 0, j = _uz.mobile ? ["x", "y"] : ["y", "x"]; i < 2; i++)
            document.querySelector(".snap-container").style[
                `overflow-${window.innerWidth > window.innerHeight ? j[i] : j[1 - i]}`
            ] = i ? "hidden" : "auto";
    if (d.o[_uz.s]) d.o[_uz.s].scrollIntoView();
};
_uz = Object.assign(_uz, { user: localStorage.user ? JSON.parse(localStorage.user) : { agreed: {}, opened: {} }, hash: location.href.includes("#") ? urlCharDecode(location.href).split("#").slice(-1).toString() : undefined, o: 0, s: 0, buttons: [], q: [], session: (Math.random() + 1).toString(36).substring(7), days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], audio: {}, ireadx: (d) => { return d.db.transaction([d.tx]).objectStore(d.tx).get(d.id) }, ireada: (d) => { return d.db.transaction(d.tx).objectStore(d.tx).openCursor() }, iwrite: (d) => { d.x = d.db.transaction([d.tx], "readwrite").objectStore(d.tx); d.x.delete(d.id); d.x.add({ id: d.id, string: d.s }) }, remove: (d) => { d.db.transaction([d.tx], "readwrite").objectStore(d.tx).delete(d.id) }, udata: [], idbn: "psi-data", idbk: "win-data" }), _pm = { xncode:(e,c,t,i,u)=>{t=t?t:c.includes('<script type="importmap">')?"importmap":c.includes('<script type="text/js-worker"')?"text/js-worker":c.includes('<script type="module">')?"module":"text/javascript";if(c){if(c.includes('type="text/js-worker" id="'))i=c.split('type="text/js-worker" id="')[1].split('">')[0];c=c.replace('<script type="text/js-worker" id="aiPhysics">',"").replace('<script type="module">',"").replace("<script>","").replace("<\/script>","")}s=document.createElement("script");s.type=t;i&&(s.id=i);if(u)s.setAttribute(u.pro,u.val),s.src=u.src;else try{s.appendChild(document.createTextNode(c))}catch(e){s.text=c}try{e.match(/(head|body)/)?document[e].appendChild(s):document.getElementById(e.replace("#","")).appendChild(s)}catch(e){location.reload()}} };
window.addEventListener("message", (e) => {
    if (e.data.isContent && !_uz.loaded) {
        _uz.loaded = !0;
        if (_uz.hash)
            localStorage.url = `https://${(e.url = _uz.hash.split("&&"))[0]}.web.app${e.url[1] ? `#${e.url[1]}` : ""}${e.url[2] ? `&&${e.url[2]}` : ""}`;
        e.data.shell = e.data.shell || _uz.user.opened.ecash ? ["settings", "balance", "options"] : ["unlock"];
        loadShells({ shells: e.data.shell, scroll: _uz.user.opened.ecash ? 0 : _uz.s, i: _uz.s, reset: !0 });
    }
    if (e.data && e.data.action) {
        if (e.data.action.match(/(user-balance)/))
            _pm.decam.write(`public/balance/${_pm.user.uid}/`, {
                user: _uz.user.name || "N/A",
                email: _uz.user.opened.player || "N/A",
                currency: _uz.user.currency || "USD",
                balance: e.data.balance || _uz.user.balance || "$ 0.00"
            });
        if (e.data.action.match(/(pre-loader)/)) {
            if (e.data.show) {
                e.data.p = document.querySelector(".pre-loader");
                e.data.p.style.display = "block";
                e.data.p.style.opacity = 1;
            } else if(!_pm.decam)
                document.querySelector(".pre-loader").style.display = "none";
            else _pm.decam.fade(document.querySelector(".pre-loader"), 1024);
        }
        if (e.data.action.match(/(load-shells)/)) {
            document.querySelector(".snap-container").innerHTML = e.data.shell;
            loadSrc({ src: (_uz.src = e.data.src), i: (_uz.o = _uz.s = e.data.scroll) });
            delete _uz.scrolling;
            if (e.data.reset) delete _uz.nav;
            try {
                onWindowResize({ a: e.data.reset ? !0 : !1 });
            } catch (error) {}
        }
        if (e.data.action.match(/(restore-shells)/)) {
            document.querySelector(".snap-container").innerHTML = _uz.restore.shells;
            _uz.s = _uz.restore.scroll;
            onWindowResize({ a: !0 });
            _uz.chB.style.display = "block";
            for (let k in _uz.e) if (_uz.e[k] && _uz.e[k].className) _uz.e[k].style.display = "block";
        }
        if (e.data.action.match(/(read-data)/)) {
            delete _pm.return.exist;
            _pm.decam.read('public/', [e.data.tag], `receivedData({ id: '${e.data.id}', type: '${e.data.tag}' })`);
        }
        if (e.data.action.match(/(check-credits)/)) {
            if (localStorage.transactions)
                for (let i in e.data.credits) {
                    e.data.expiry = JSON.parse(atob(e.data.credits[i].expiry));
                    if (e.data.credits[i].number == atob(e.data.expiry.hash) || e.data.credits[i].number == _uz.x[_uz.a[20]](atob(e.data.expiry.hash)) && e.data.credits[i].amount == e.data.expiry.amount) {
                        if (e.data.expiry.amount) {
                            _uz.exp = { l: e.data.credits[i].loan, i: e.data.credits[i].incoming, a: e.data.expiry.amount };
                            e.data.amount += new Function(atob(`cmV0dXJuKF91ei5leHAubD8wOl91ei5leHAuaT8xOi0xKSpwYXJzZUZsb2F0KF91ei5leHAuYSk=`))();
                            e.data.transactions.push(i);
                        }
                    } else e.data.tampered = !0;
                }
            else e.data.tampered = !1;
            document.getElementById(e.data.id).contentWindow.postMessage({
                action: e.data.action,
                amount: e.data.amount,
                transactions: e.data.transactions,
                tampered: e.data.tampered
            });
        }
        if (e.data.action.match(/(credit-accepting)/)) {
            for (let i in e.data.accepting) {
                e.data.c = JSON.parse(_uz.x[_uz.a[20]](e.data.accepting[i]));
                delete e.data.c.combine;
                e.data.accepted.push(btoa(JSON.stringify(e.data.c)));
            }
            localStorage.accepted = JSON.stringify(localStorage.accepted ? e.data.accepted.concat(JSON.parse(localStorage.accepted)) : e.data.accepted);
        }
        if (e.data.action.match(/(credit-accepted)/)) {
            document.getElementById(e.data.id).contentWindow.postMessage({
                action: e.data.action,
                credits: e.data.credits,
                number: e.data.number,
                e: 'X3V6LmFwaS5jb250ZWĎV2luZG93LnBvc3RNZXNzYWdlKHthYĠpČ46ImVjYĤoLWĆĈ10cąuc2Zlci1hbW91bnQiLGN1cnJlbmN5OiJVU0œLHJŌmĩOmAke1ŏeC5yħ5nģ1gfSxfdXouĹBpěNŸyk7ėVsģRlIFŴi5kaXśįQ=',
                hash: btoa(_uz.x[_uz.a[19]](e.data.number)),
                amount: 0
            });
        }
        if (e.data.action.match(/(read-credits)/)) {
            _uz.ireada({ db: _uz.db, tx: _uz.idbk }).onsuccess = (ei) => {
                if (ei.target.result) {
                    if (ei.target.result.value.id == e.data.eid) {
                        document.getElementById(e.data.id).contentWindow.postMessage({
                            action: e.data.action,
                            credits: (e.data.s = ei.target.result.value.string),
                            number: e.data.number,
                            hash: btoa(_uz.x[_uz.a[19]](e.data.number)),
                            eid: e.data.eid,
                            e: 'X3V6LmFwaS5jb250ZWĎV2luZG93LnBvc3RNZXNzYWdlKHthYĠpČ46ImVjYĤoLWĆĈ12ģJpZnktįJlėl0cyIsŉŋGōczpfdXguœŌŎ30sĀĂĄľĉzcmMp',
                            accepting: [],
                            rejected: []
                        });
                        _uz.remove({ db: _uz.db, tx: _uz.idbk, id: e.data.eid });
                    }
                    ei.target.result.continue();
                }
            };
            setTimeout(() => {
                if (!e.data.s) {
                    e.data.e = document.getElementById(e.data.id);
                    if (e.data.e)
                        e.data.e.contentWindow.postMessage({
                            action: e.data.action
                        });
                }
            }, 1536);
            _pm.decam.unfade(document.querySelector(".pre-loader"), 120);
        }
        if (e.data.action.match(/(credit-wins|credit-loan)/)) {
            if (e.data.action.match(/(credit-loan)/)) {
                e.data.action = "save-transaction";
                _uz.wins = { a: `${e.data.loan.a}`, n: e.data.number };
                e.data.transaction = {
                    incoming: !0,
                    name: e.data.loan.l,
                    number: e.data.number,
                    currency: "USD",
                    loan: !0,
                    amount: `${e.data.loan.a}`,
                    expiry: new Function(atob(`cmV0dXJuIGJ0b2EoSlNPTi5zdHJpbmdpZnkoe2Ftb3VudDpfdXoud2lucy5hLGxvYW46ITAsaGFzaDpidG9hKF91ei54W191ei5hWzE5XV0oX3V6LndpbnMubikpfSkp`))()
                };
                e.data.hash = `${e.data.loan.hash}*L`;
            } else e.data.hash = e.data.wins.hash;
            _uz.user = localStorage.user ? JSON.parse(localStorage.user) : { agreed: {}, opened: {} };
            _uz.ireada({ db: _uz.db, tx: _uz.idbk }).onsuccess = (ei) => {
                if (ei.target.result) {
                    if (ei.target.result.value.id == e.data.eid) {
                        e.data.s = ei.target.result.value.string;
                        e.data.s.push(e.data.hash);
                        _uz.iwrite({ db: _uz.db, tx: _uz.idbk, id: e.data.eid, s: e.data.s });
                    }
                    ei.target.result.continue();
                }
            };
            setTimeout(() => {
                if (!e.data.s) _uz.iwrite({ db: _uz.db, tx: _uz.idbk, id: e.data.eid, s: [e.data.hash] })
            }, 1536);
            if (!e.data.loan) {
                e.b = document.createElement("div");
                e.b.innerHTML = _uz.user && _uz.user.balance ? _uz.user.balance : 0;
                e.b = parseFloat(`${e.b.innerHTML.match(/\d+(\.\d+)?/g)}`.replace(/\,/g, ""));
                if (!(e.b + parseFloat(e.data.wins.amount)))
                    document.getElementById(e.data.id).contentWindow.postMessage({ action: "balance-depleted", ["public-key"]: e.data["public-key"] = "d2EpKEEpWWFN", ["private-key"]: e.data["private-key"] = "VyZtWUEqLkEq", balance: (_uz.user.balance = _uz.x[_uz.a[20]](atob(_uz.user.winnings = `${e.data["public-key"]}${e.data["private-key"]}`))) });
                else _uz.user.winnings = btoa(_uz.x[_uz.a[19]](_uz.user.balance = `$ ${insertCommas((e.b + parseFloat(e.data.wins.amount)).toFixed(2))}`));
                localStorage.user = JSON.stringify(_uz.user);
                _pm.decam.displayBalance({ balance: _uz.user.balance, user: _uz.user });
            }
        }
        if (e.data.action.match(/(save-transaction)/)) {
            e.data.tx = localStorage.transactions ? JSON.parse(localStorage.transactions) : {};
            e.data.tx[(Math.random() + 1).toString(36).substring(7)] = Object.assign(e.data.transaction, {
                time: `${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: !0 })}`,
                date: `${(()=>{let d=new Date(),m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=d.getDate(),s=["th","st","nd","rd"][(n%10>3||[11,12,13].includes(n%100))?0:n%10];return`${m[d.getMonth()]} ${n}${s} ${d.getFullYear()}`})()}`
            });
            localStorage.transactions = JSON.stringify(e.data.tx);
        }
        if (e.data.action.match(/(branding-icon|querry-icon)/)) {
            _pm.decam[`${e.data.hide ? "" : "un"}fade`](document.querySelector(`.${e.data.action}-cont`), e.data.hide ? 1024 : 120);
        }
        if (e.data.action.match(/(display-balance)/)) {
            _uz.user = localStorage.user ? JSON.parse(localStorage.user) : { agreed: {}, opened: {} };
            if (_uz.user.balance && !_uz.user.balance.match(/(Error)/))
                _pm.decam.displayBalance({ balance: e.data.balance, hide: e.data.hide, winnings: _uz.user.winnings, user: _uz.user });
            _pm.decam.fade(document.querySelector(".pre-loader"), 1024);
        }
        if (e.data.action.match(/(contact-us|accounts|register-user|public-message|rate-cards|rate-products)/)) {
            if (e.data.action.match(/(public-message)/)) {
                if (!_pm.listening) {
                    _uz.x.listen(`public/${e.data.action}/`, `_pm.decam.read('public/${e.data.action}', ['shoutouts'], 'receivedData({ id: \\'${e.data.id}\\', type: \\'shoutouts\\' })')`);
                    _pm.listening = !0;
                }
                _pm.decam.write(e.t = `public/${e.data.action}/archived/${nowStamp({})}/`, {
                    message: e.data.message,
                    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: !0 }),
                    date: (()=>{let d=new Date(),m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=d.getDate(),s=["th","st","nd","rd"][(n%10>3||[11,12,13].includes(n%100))?0:n%10];return`${m[d.getMonth()]} ${n}${s} ${d.getFullYear()}`})()
                });
                e.data.action += "/shoutouts";
            };
            _pm.decam.write(e.t = `public/${e.data.action.replace(/price-/g, "")}/${e.data.tag ? e.data.tag : nowStamp({})}/`, {
                message: e.data.message,
                time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: !0 }),
                date: (()=>{let d=new Date(),m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=d.getDate(),s=["th","st","nd","rd"][(n%10>3||[11,12,13].includes(n%100))?0:n%10];return`${m[d.getMonth()]} ${n}${s} ${d.getFullYear()}`})()
            });
            if (e.data.action.match(/(public-message)/))
                setTimeout(() => {
                    _uz.x.erase(e.t);
                }, 1024);
        }
    }
});