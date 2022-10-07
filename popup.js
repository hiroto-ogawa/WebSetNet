function submit(name) {
    chrome.runtime.sendMessage({name: name}, function(res){
        document.querySelector("#updated_time").innerText = `Last Update Date: ${res.last_update_date || 'none'}`;
    });
}

document.getElementById("btn").addEventListener("click", submit("downloadInvalidURL"));

window.onload = submit("getLastUpdateDate");