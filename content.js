window.addEventListener("load", () => {
    chrome.runtime.sendMessage({ name: "checkURL", url: location.href }, function(res){
        if(res === 'detected'){
            alert("Accessing WEB site is likely a phishing site.") // alert 表示
        }
    })
});