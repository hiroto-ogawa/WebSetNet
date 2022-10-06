// phishtank の URL
var url = "http://data.phishtank.com/data/online-valid.json";

// chrome.local.storage の容量節約のため、URL から ドメインを抜き出す
// const domainParser = (specific_url) => {
//     let domain = specific_url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]; // ドメインを返す
//     return domain
// }

// 判別データとなるjsonをダウンロードする
const downloadJSON = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let array_datum = Array.from(data);
            let domains = new Set();
            for (let i = 0; i < array_datum.length; i++) {
                // domains.add(domainParser(array_datum[i].url));
                domains.add(array_datum[i].url);
            }

            chrome.storage.local.set({'urls': [...domains], 'date': Date.now});
            console.log("保存完了");
        });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.name) {
        case "checkURL":
            chrome.storage.local.get('urls', (invalid_url) => {
                // let parsed_url = domainParser(msg.url);
                for (let i = 0; i < invalid_url.urls.length; i++) {
                    if(invalid_url.urls[i] === msg.url){
                        sendResponse('detected')
                        break
                    }
                }
            });
            break

        case "downloadInvalidURL":
            downloadJSON(url)
            break
    }
    return true
})