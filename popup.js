function submit() {
    chrome.runtime.sendMessage({name: "downloadInvalidURL"});
}

document.getElementById("btn").addEventListener("click", submit);