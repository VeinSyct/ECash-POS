let processQuery = (txt) => {
    let _getKeyWords = (txt, a, c = !0) => {
            while (c) {
                w = _wordProcessor(txt, a);
                if (w.answer != "") {
                    m = " " + w.keywords + " ";
                    if (w.keywords.match(/(my name is|call me)/)) {
                        if (!_pm.knowledge) initKnowlege();
                        n = txt
                            .split(w.keywords.match(/(my name is)/) ? "my name is" : "call me")[1]
                            .trim()
                            .split(" ")[0];
                        if (n != "" && n != "_#client_") _pm.knowledge.client = upperFirstChar(n);
                    }
                    targets.push({ keyword: m.trim(), index: txt.indexOf(m.trim()) });
                    txt = txt.toLowerCase().replace(new RegExp(m), (m) => " " + Array(m.length - 1).join("_") + " ");
                } else c = !1;
            }
            targets.sort(({ index: a }, { index: b }) => a - b);
        },
        _wordProcessor = (txt, q, tgt) => {
            let _getWordComponent = (q, i, r, t) => {
                if (_pm.queries[q][i][t + r.index]) {
                    return randomPick(_pm.queries[q][i][t + r.index]).string;
                } else if (_pm.queries[q][i][t]) {
                    return randomPick(_pm.queries[q][i][t]).string;
                } else return "";
            };
            key = ans = "";
            for (let i = 0; i < _pm.queries[q].length; i++) {
                for (let j = 0; j < _pm.queries[q][i].keywords.length; j++) {
                    if (((tgt === undefined && txt.toLowerCase().includes(" " + _pm.queries[q][i].keywords[j].trim() + " ")) || (tgt && tgt.keyword == _pm.queries[q][i].keywords[j].trim())) && ans == "") {
                        key = _pm.queries[q][i].keywords[j].trim();
                        r = randomPick(_pm.queries[q][i].answers);
                        if (_pm.queries[q][i].answers) ans += r.string;
                        ans += " " + _getWordComponent(q, i, r, "openions");
                        ans += " " + _getWordComponent(q, i, r, "thoughts");
                        ans += " " + _getWordComponent(q, i, r, "feelings");
                        ans += " " + _getWordComponent(q, i, r, "emotions");
                        priority = priority || _pm.queries[q][i].priority;
                        return { keywords: key, answer: ans.trim() };
                    }
                }
            }
            return { keywords: "", answer: "" };
        },
        _getReplies = (d) => {
            d.response = _wordProcessor(d.txt, "responses", d.tgt);
            d.answer = d.response.answer;
            if (d.response.keywords != "") {
                d.phrases = d.txt.toLowerCase().split(" " + d.response.keywords + " ");
                d.phrase = "";
                for (let i = 1; i < d.phrases.length; i++) d.phrase += (i > 1 ? " " + d.response.keywords + " " : "") + d.phrases[i];
            } else d.phrase = d.txt;
            for (let i = 0, j = ["answer", "phrase"]; i < j.length; i++)
                d[j[i]] = d[j[i]]
                    .replace(/_#keyword/g, d.response.keywords)
                    .replace(/_#name/g, _pm.knowledge ? _pm.knowledge.name : "Anonymous")
                    .replace(/_#client/g, _pm.knowledge && _pm.knowledge.client ? _pm.knowledge.client : "you");
            return { response: d.response, phrase: d.phrase, answer: d.answer };
        },
        targets = [],
        replies = [],
        priority;
    (window._replaceWord = (txt, a, c) => {
        while (c != !0) {
            w = _wordProcessor(txt, a);
            if (w.answer != "") {
                txt = txt.toLowerCase().replace(new RegExp(" " + w.keywords + " ", "g"), " " + w.answer + "#% ");
            } else c = !0;
        }
        return " " + txt.replace(/#%/g, "").trim() + " ";
    }),
        (txt = _replaceWord(" " + txt.trim() + " ", "alternates"));
    _getKeyWords(txt, "responses");
    for (let i = 0; i < targets.length; i++) {
        reply = _getReplies({ txt: " " + txt.trim() + " ", tgt: targets[i] });
        txt = reply.phrase.trim();
        replies.push(reply);
    }
    if (replies[0]) {
        for (let i = 0; i < replies.length - 1; i++) replies[i].phrase = _replaceWord(" " + replies[i].phrase.trim() + " ", "pronouns").trim();
        for (let i = replies.length - 1; i > 0; i--) {
            replies[i - 1].phrase = replies[i].answer.includes("_#phrase") ? replies[i].answer.replace(/_#phrase/g, replies[i].phrase) : replies[i].answer + (replies[i].phrase == "" ? "" : ", ") + replies[i].phrase;
        }
        answer = replies[0].answer.includes("_#phrase") ? replies[0].answer.replace(/_#phrase/g, replies[0].phrase) : replies[0].answer + (replies[0].phrase == "" ? "" : ", ") + replies[0].phrase;
    } else _pm.ignore = answer = randomPick(_pm.queries.unknown).string.replace(/_#phrase/g, _replaceWord(txt, "pronouns"));
    setTimeout(() => {
        pushQuery(
            upperFirstChar(answer.trim().replace(/\b(\w+)\s+\1\b/g, "$1") + (Math.floor(Math.random() * 3) != 0 ? "?" : ".").replace(/\?\?/g, "?").replace(/../g, ".")),
            _pm.knowledge && _pm.knowledge.name ? _pm.knowledge.name : initKnowlege().name,
            !0,
            "assets/images/typing.gif",
            priority
        );
    }, 1200 + (Math.floor(Math.random() * 10) + 1) * 64);
},
revivetopics = () => {
    _pm.knowledge.revive.counter++;
    if (_pm.knowledge.revive.counter > 9) {
        _pm.knowledge.revive.counter = 0;
        if (_pm.knowledge.topics.length > 1)
            processQuery(_replaceWord(" " + randomPick(_pm.queries.revivetopics).string + " ", "pronouns").replace(/_#topic/g, _pm.knowledge.topics[Math.floor(Math.random() * (_pm.knowledge.topics.length - 1))]));
        revivetopics();
    } else setTimeout(revivetopics, 2400 + (Math.floor(Math.random() * 21) + 1) * 360);
},
initiatives = (d) => {
    setTimeout(() => {
        if (document.querySelector(".queries-cont").innerHTML == "") {
            pushQuery(
                upperFirstChar(
                    randomPick(_pm.queries.initiatives)
                        .string.replace(/_#name/g, _pm.knowledge && _pm.knowledge.name ? _pm.knowledge.name : initKnowlege().name)
                        .replace(/_#client/g, _pm.knowledge && _pm.knowledge.client ? _pm.knowledge.client : "")
                ),
                _pm.knowledge.name,
                !0,
                "assets/images/typing.gif",
                !0
            );
        } else revivetopics();
    }, 1200 + (Math.floor(Math.random() * 10) + 1) * 360);
},
initKnowlege = () => {
    return (_pm.knowledge = _pm.knowledge ? _pm.knowledge : { name: randomPick(_pm.queries.names).string, topics: [], revive: { counter: 0 } });
},
sendQuery = (d) => {
    if (d.m != "") {
        if (!_pm.knowledge) initKnowlege();
        _pm.knowledge.revive.counter = 0;
        _pm.knowledge.topics.push(d.m);
        d.n = ` ${pushQuery(d.m, "You")
            .replace(/_|,|!|\./g, " ")
            .replace(/  /g, " ")} `;
        if (_pm.knowledge) {
            for (let i = 0, j = ["name", "client"]; i < j.length; i++)
                d.n = _pm.knowledge[j[i]] ? d.n.replace(RegExp(`${_pm.knowledge[j[i]].toLowerCase()}`, "g"), `_#${j[i]}_`).replace(RegExp(`${_pm.knowledge[j[i]]}`, "g"), `_#${j[i]}_`) : d.n;
        }
        processQuery(d.n);
    }
},
pushQuery = (txt, n, c, t, p) => {
    if (isNoReplay(n) || p) {
        let id = (Math.random() + 1).toString(36).substring(7);
        let _putMsg = (d) => {
            return `<p style="margin-top: 0px; margin-bottom: 0px; color: ${!d.c?'lightblue':'lightgreen'}">${d.m}</p>`
        };
        let _queryBubble = (id, m, n, c, t) => {
            return{
                e:`<div id="${id}-cont" class="queries-bubble" style="align-self: flex-${c?'start':'end'}" id="${id}">
                    <h3 style="margin-${c?'left':'right'}: 9px; text-align: ${c?'right':'left'}">${n}</h3>
                    <div id="msg-${id}">
                        ${t?`<img src="${t}" width="96px" height="20px" style="margin-top: 3px; object-fit: cover"/>`:_putMsg({ m: m, c: c })}
                    </div>
                    <p style="margin-${c?'left':'right'}: 9px; text-align: ${c?'right':'left'}">${cNow()}</p>
                </div>
                <span id="x${id}"></span>`,
                id:id
            }
        };
        let cb = _queryBubble(id, txt, n, c, t);
        document.querySelector(".queries-cont").innerHTML = document.querySelector(".queries-cont").innerHTML + cb.e;
        if (t) {
            setTimeout(() => {
                if (isNoReplay(n) || p) {
                    document.getElementById("msg-" + id).innerHTML = _putMsg(
                        {
                            m: ` ${upperFirstChar(txt)} `
                                .replace(/  /g, " ")
                                .trim()
                                .replace(/ \?/g, "?")
                                .replace(/ \./g, ".")
                                .replace(/ !/g, "!")
                                .replace(/ ,/g, ",")
                                .replace(/ i /g, " _i_ ")
                                .replace(/ i'/g, " _i_'")
                                .replace(/ i\./g, " _i_.")
                                .replace(/_i_/g, "I")
                                .replace(RegExp(`${_pm.knowledge.name.toLowerCase()}`, "g"), _pm.knowledge.name)
                                .replace(RegExp(`${_pm.knowledge && _pm.knowledge.client ? _pm.knowledge.client.toLowerCase() : "_#client_"}`, "g"), _pm.knowledge.client),
                            c: !0
                        }
                    );
                    document.getElementById("msg-" + id).style.background = "var(--primary-bg-hover)";
                    delete _pm.ignore;
                    scrollAt("x" + cb.id, "end");
                } else document.getElementById(id + "-cont").remove();
            }, 1200 + (Math.floor(Math.random() * 10) + 1) * 360);
        }
        setTimeout(() => {
            document.getElementById(id + "-cont").style.display = "block";
            scrollAt("x" + cb.id, "end");
        }, 96);
    }
    return txt;
},
isNoReplay = (n) => {
    return ((!_pm.ignore || Math.floor(Math.random() * 5) != 1) && Math.floor(Math.random() * 7) != 1) || n.match(/(You)/);
},
scrollAt = (e, c) => {
    document.getElementById(e).scrollIntoView({ block: c, behavior: "smooth" });
},
randomPick = (s) => {
    i = Math.floor(Math.random() * s.length);
    return { string: s[i], index: i };
},
cNow = () => {
    m = new Date();
    return m.toDateString() + ' at ' + getTime()
},
getTime = () => {
    d = new Date();
    hrs = d.getHours();
    min = d.getMinutes();
    apm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    hrs = hrs < 10 ? " " + hrs : hrs;
    return hrs + ":" + ( min = min < 10 ? "0" + min : min ) + " " + apm;
},
upperFirstChar = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
setTimeout(()=>{
    _pm = { queries: getQueries() }
    initiatives({});
},360)