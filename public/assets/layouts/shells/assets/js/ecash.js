// START OF API CONNECTION
window.addEventListener("message", (e) => {
    if (e.type.match(/(message)/)) try {
        _uz.session = !_uz.session ? e.data.session : _uz.session;
        if (e.data.action && e.data.action.match(/(ecash-api)/)) {
            if (e.data.action.match(/(ready)/)) {
                if (e.data.action.match(/(ready)/)) {
                    try {
                        if (openApp) openApp({});
                    } catch (error) {}
                };
            };
            if (e.data.action.match(/(update-content)/))
                try {
                    if (openApp) openApp({ update: !0 });
                } catch (error) {}
            if (e.data.action.match(/(response)/)) {
                apiResponses({ data: e.data });
            };
        };
    } catch (error) {};
});
_uz = { api: document.createElement("iframe"), digilete: (e) => {return e.data.replace(/[0-9]/g, '').replace(/\*/g,'/').replace(/&/g,':').replace(/%/g,'-').replace(/\$/g,'.')}, days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
_uz.api.onload = function() {
    // api is ready
};
// END OF API CONNECTION
let readBalance = () => {
    _uz.api.contentWindow.postMessage({ action: "ecash-api-read-balance" }, _uz.api.src);
},
readAccount = () => {
    _uz.api.contentWindow.postMessage({ action: "ecash-api-read-account" }, _uz.api.src);
};
_uz = Object.assign(_uz, { qrhash: (e) => _uz.api.src = _uz.digilete({ data: e.hash }) });
let apiResponses = (data) => {
    data = data.data;
    if (data.action) {
        if (data.action.match(/(read-balance|locked)/)) {
            data.user = JSON.parse(localStorage.user);
            data.e = document.querySelector(".ex-balance");
            data.e.innerHTML = data.user.balance = data.balance != "Err706" && !data.action.match(/(locked)/) ? data.balance.replace("DMY", "(Dummy)") : `<span>Error: <strong class="balance-alert blink">${data.action.match(/(locked)/) ? "Denied" : "Tampered"}!</strong></span>`;
            data.e = document.querySelector(".display-panel");
            [data.e].forEach(el => {
                if (el) {
                    el.style.display = "block";
                    el.style.opacity = "0";
                    el.style.transition = "opacity .42s ease";
                    el.offsetHeight;
                    el.style.opacity = "1";
                }
            });
            delete data.user.winnings;
            localStorage.user = JSON.stringify(data.user);
            fitAllText();
            window.parent.postMessage({
                id: window.frameElement.id,
                action: "display-balance",
                balance: data.user.balance
            }, "*");
        };
        if (data.action.match(/(read-account)/)) {
            document.querySelector(".account-name").value = data.account.name ? data.account.name : "";
            document.querySelector(".beneficiary-currency").innerHTML = data.account.currency ? data.account.currency : "USD";
            for (let i = 0, j = ["number", "protocol"]; i < j.length; i++) {
                document.querySelector(`.account-${j[i]}`).innerHTML = data.account[j[i]];
                _uz.baffle = baffle(`.account-${j[i]}`);
                _uz.baffle.set({ characters: "₲ ⊇ ₮ ∇ Ƀ ⊂ ∞ ₵ ∏ Ξ ∧ ₩ ₸ ∫ ₼ ₹ ₱ £ ₽ ⊆ ₴ ∂ ₦ ∪ ₫ ₭ ∉ ∆ € ¥ ₺ ¢ ∑ ⊃ ∨".split(" ").sort(() => Math.random() - .5).join(" "), speed: 9 });
                _uz.baffle.start();
                _uz.baffle.reveal(1024);
            }
        };
        if (data.action.match(/(hash-account)/)) {
            createQr({
                s: data.hash 
            });
        };
        if (data.action.match(/(hash-fragment)/)) {
            for (let i = 0; i < data.hash.length; i++) drawQr({ id: ".qr-cont", piece: data.hash[i] });
            _uz.z.cvs = { e: [], i: 0 };
            for (let i = 0, j = document.querySelector(".qr-cont").getElementsByTagName("canvas"); i < j.length; i++) {
                j[i].style.display = "none";
                _uz.z.cvs.e.push(j[i]);
            };
            if (_uz.z.cvs.e.length > 1) autoSlide({ t: _uz.qr.delay });
            window.parent.postMessage({
                id: window.frameElement.id,
                action: "pre-loader",
                show: !1
            }, "*");
            document.getElementById("show-qr-cont").style.display = "block";
        };
        if (data.action.match(/(hash-assemble)/) && !_uz.direct) {
            let d = JSON.parse(data.object);
            if (d.r) {
                if (d.r && d.ah) {
                    localStorage.beneficiary = JSON.stringify(d.ah);
                    localStorage.dialog = JSON.stringify({
                        message: `
                            <p><strong>Name: </strong><span>${d.ah.name}</span></p>
                            <p><strong>Account: </strong><span>${d.ah.number}</span></p>`,
                        buttons: {
                            next: {
                                text: `<span>Next ❯</span>`,
                                shells: `['slider']`,
                                scroll: 0
                            }
                        },
                        back: {
                            shells: `['scanqr']`,
                            scroll: 0
                        }
                    });
                };
                if (d.l) {
                    if (d.r && d.l.received > 0) {
                        localStorage.dialog = JSON.stringify({
                            message: `${(d.l.currency ? [
                                `Cheers! <strong>${d.l.currency}${d.l.dummy ? " (Dummy) " : ""}${`${`${d.l.received}`.replace(/(\.\d{2})\d+$/, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</strong> has been successfully transferred${(d.l.ratio && d.l.ratio < 1 ? `, but <strong>${(100 - parseFloat(d.l.ratio) * 100).toFixed(0)}%</strong> was rejected as counterfeit.` : '!')}`,
                                `Awesome! <strong>${d.l.currency}${d.l.dummy ? " (Dummy) " : ""}${`${`${d.l.received}`.replace(/(\.\d{2})\d+$/, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</strong> has been added to your account${(d.l.ratio && d.l.ratio < 1 ? `, with <strong>${(100 - parseFloat(d.l.ratio) * 100).toFixed(0)}%</strong> counterfeit rejected.` : '!')}`,
                                `Yay! <strong>${d.l.currency}${d.l.dummy ? " (Dummy) " : ""}${`${`${d.l.received}`.replace(/(\.\d{2})\d+$/, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</strong> has been successfully transferred${(d.l.ratio && d.l.ratio < 1 ? `, but <strong>${(100 - parseFloat(d.l.ratio) * 100).toFixed(0)}%</strong> was rejected as counterfeit.` : '!')}`,
                                `Success! You got <strong>${d.l.currency}${d.l.dummy ? " (Dummy) " : ""}${`${`${d.l.received}`.replace(/(\.\d{2})\d+$/, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</strong>${(d.l.ratio && d.l.ratio < 1 ? `, with <strong>${(100 - parseFloat(d.l.ratio) * 100).toFixed(0)}%</strong> counterfeit rejected.` : '')}`,
                                `All done! Your account received <strong>${d.l.currency}${d.l.dummy ? " (Dummy) " : ""}${`${`${d.l.received}`.replace(/(\.\d{2})\d+$/, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</strong>${(d.l.ratio && d.l.ratio < 1 ? `, although <strong>${(100 - parseFloat(d.l.ratio) * 100).toFixed(0)}%</strong> was rejected as counterfeit.` : '')}`
                                ][Math.floor(Math.random() * 5)] : "")}`,
                            buttons: {
                                dismiss: {
                                    text: `<span>Dismiss</span>`,
                                    shells: `['settings', 'balance', 'options']`,
                                    scroll: 1,
                                    reset: !0
                                }
                            },
                            back: {
                                shells: `['scanqr']`,
                                scroll: 0
                            }
                        });
                        window.parent.postMessage({
                            id: window.frameElement.id,
                            action: "save-transaction",
                            transaction: {
                                incoming: !0,
                                name: d.s.name,
                                number: d.s.account,
                                hash: d.j,
                                currency: `${d.l.currency}${d.l.dummy?" (Dummy) ":""}`,
                                amount: d.l.received,
                                expiry: btoa(JSON.stringify({ hash: btoa(d.s.account) }))
                            }
                        }, "*");
                    } else localStorage.dialog = JSON.stringify({
                            message: [
                                `We didn’t receive any electronic cash this time because the <strong>hash</strong> has already been used. Could you try again?`,
                                `Looks like that electronic cash <strong>hash</strong> was already spent, so nothing came through. Mind giving it another try?`,
                                `Oops! That electronic cash <strong>hash</strong> seems to have been used before, so no cash was received. Please try again when you’re ready!`,
                                `It seems that electronic cash <strong>hash</strong> was already used, so we couldn’t receive anything. Feel free to scan again!`
                                ][Math.floor(Math.random() * 4)],
                            buttons: {
                                dismiss: {
                                    text: `<span>Dismiss</span>`,
                                    shells: `['settings', 'balance', 'options']`,
                                    scroll: 1,
                                    reset: !0
                                }
                            },
                            back: {
                                shells: `['scanqr']`,
                                scroll: 0
                            }
                        });
                }
                delete _uz.z.qrScan.hashes;
                delete _uz.z.qrScan.arr;
            } else localStorage.dialog = JSON.stringify({
                    message: [
                        `The <strong>electronic cash</strong> account or amount doesn’t seem to be valid. Could you please try scanning again?`,
                        `Oops! That <strong>electronic cash</strong> account or amount looks invalid. Please give it another scan.`,
                        `It looks like the <strong>electronic cash</strong> account or amount isn’t valid. Mind scanning one more time?`
                        ][Math.floor(Math.random() * 3)],
                    buttons: {
                        dismiss: {
                            text: `<span>Dismiss</span>`,
                            shells: `['settings', 'balance', 'options']`,
                            scroll: 1,
                            reset: !0
                        }
                    },
                    back: {
                        shells: `['scanqr']`,
                        scroll: 0
                    }
                });
            loadPage({ shells: ['dialog'], scroll: 0 });
        };
        if (data.action.match(/(transfer-amount)/)) {
            createQr({ s: data.hash });
            if (localStorage.beneficiary) {
                try {
                    data.b = JSON.parse(localStorage.beneficiary);
                    delete localStorage.beneficiary;
                } catch (error) {}
            }
            if (localStorage.transfer) {
                try {
                    data.t = JSON.parse(localStorage.transfer);
                    delete localStorage.transfer;
                } catch (error) {}
            }
            window.parent.postMessage({
                id: window.frameElement.id,
                action: "save-transaction",
                transaction: {
                    incoming: !1,
                    name: data.b.name,
                    number: data.b.number,
                    hash: data.hash,
                    currency: data.t.currency,
                    amount: data.t.amount,
                    expiry: btoa(JSON.stringify({ hash: btoa(data.b.number) }))
                }
            }, "*");            
            localStorage.needUpdate = !0;
        };
        if (data.action.match(/(dialog-message)/)) {
            if (data.message.match(/(m000|m001|m002|m003)/)) {
                localStorage.dialog = JSON.stringify({
                    message: `${
                        data.message == "m000" ? [
                            `It looks like the scan didn’t give us the right details to identify the <strong>beneficiary</strong>. Could you try again?`,
                            `Hmm… the information we received from that scan didn’t match a valid <strong>beneficiary</strong>. Mind giving it another go?`,
                            `Oops! That scan didn’t provide what we need to find the <strong>beneficiary</strong>. Please try again when you’re ready!`,
                            `We couldn’t identify the <strong>beneficiary</strong> from the scan we got. Would you try scanning once more?`,
                            `That scan didn’t pull in the right info to confirm the <strong>beneficiary</strong>. A quick rescan should help!`
                            ][Math.floor(Math.random() * 5)] : data.message == "m001" ? [
                            `Oops! That doesn’t look like a valid number. Could you enter a numeric amount?`,
                            `Hmm… we need a numeric amount here. Mind trying again?`,
                            `Please enter a number so we can proceed with the transaction.`,
                            `That amount isn’t valid. Please type a numeric value.`,
                            `Heads up! Only numeric amounts are accepted. Could you enter one?`
                            ][Math.floor(Math.random() * 5)] : data.message == "m002" ? [
                            `Uh-oh! We can’t complete the electronic cash transfer because the balance isn’t enough.`,
                            `Looks like there’s not enough balance to process that electronic cash transfer. Could you check your funds?`,
                            `Hmm… the electronic cash transfer couldn’t go through due to insufficient balance.`,
                            `We weren’t able to process the electronic cash transfer. The balance seems a bit low.`,
                            `The transfer couldn’t be completed because the balance isn’t sufficient. Please review your account.`
                            ][Math.floor(Math.random() * 5)] : data.message == "m003" ? [
                            `Looks like your balance isn’t enough for this transfer. Could you try a smaller amount?`,
                            `Oops! You don’t have enough balance for that amount. Please enter a lesser amount and try again.`,
                            `Your current balance can’t cover this transfer. How about trying a smaller amount?`,
                            `Hmm… the transfer can’t go through with that amount. Please try an amount within your balance.`,
                            `The amount you entered exceeds your balance. Try a smaller transfer to continue.`
                            ][Math.floor(Math.random() * 5)] : ""
                    }`,
                    buttons: {
                        dismiss: {
                            text: `<span>Dismiss</span>`,
                            shells: `['settings', 'balance', 'options']`,
                            scroll: 1,
                            reset: !0
                        }
                    },
                    back: {
                        shells: data.message.match(/(m001|m002|m003)/) ? ["slider"] : ["scanqr"],
                        scroll: 0
                    }
                });
            }
            if (data.message == "m004")
                localStorage.dialog = JSON.stringify({
                    message: [
                        `Hmm… it seems the electronic cash doesn’t match the selected <strong>currency</strong>. Please pick the right one so we can complete your transfer!`,
                        `Oops! The amount doesn’t match the expected <strong>currency</strong>. Try selecting the correct <strong>currency</strong> and scan again.`,
                        `Looks like the electronic cash and <strong>currency</strong> don’t align. No worries—just select the correct <strong>currency</strong> to continue!`,
                        `The transfer couldn’t go through because the <strong>currency</strong> doesn’t match. Please choose the correct one and give it another try!`,
                        `Uh-oh! That electronic cash doesn’t match the <strong>currency</strong> you selected. Pick the right <strong>currency</strong> and we’ll be good to go!`
                        ][Math.floor(Math.random() * 5)],
                    buttons: {
                        dismiss: {
                            text: `<span>Dismiss</span>`,
                            shells: `['settings', 'balance', 'options']`,
                            scroll: 1,
                            reset: !0
                        }
                    },
                    back: {
                        shells: `['settings', 'balance', 'options']`,
                        scroll: 1,
                        reset: !0
                    }
                });
            loadPage({ shells: ['dialog'], scroll: 0 });
        };
        if (data.action.match(/(qr-code-scan)/)) {
            data.s = document.createElement("script");
            data.s.appendChild(document.createTextNode(data.operation));
            document.body.appendChild(data.s);
        };
    };
};
// END OF API OPERATION