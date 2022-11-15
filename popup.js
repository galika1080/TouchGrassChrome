var interests = [];

async function fetchUserTags(whenDone) {
    let response = await fetch('https://70d1rcnpgh.execute-api.us-west-2.amazonaws.com/get-user-tags', {
        method: 'POST',
        headers: {
        Accept: '*/*',
        'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
            email: 'agalik2@illinois.edu'
        })
    })

    let result = await response.json();
    
    interests = result.tags;
    chrome.storage.local.set({interests: interests}, whenDone);
}

function drawInterests() {
    document.getElementById('interestText').textContent = "Interests: " + interests.join(", ");

    const interestDiv = document.getElementById('interestList');
    interestDiv.textContent = "";

    for (tag of interests) {
        const btn = document.createElement("BUTTON");
        btn.innerHTML = tag;
        btn.onclick = onRemoveTagClick;
        interestList.appendChild(btn);
    }
}

async function setUserTags(tagsList) {
    let response = await fetch('https://89z7a4oval.execute-api.us-west-2.amazonaws.com/set-user-tags', {
        method: 'POST',
        headers: {
        Accept: '*/*',
        'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
            email: 'agalik2@illinois.edu',
            tags: tagsList
        })
    })
}

async function onRemoveTagClick() {
    tag = this.innerHTML;

    var index = interests.indexOf(tag);
    if (index > -1) {
        interests.splice(index, 1);
    } else {
        alert("err: couldn't find interest");
    }

    setUserTags(interests); // store in cloud (async)
    chrome.storage.local.set({interests: interests}, drawInterests); // store locally (async), then re-draw interests
}

window.onload = function() {
    chrome.storage.local.get(['interests'], function(v) { // pull interests from local storage, then display them when done
        val = v.interests;

        if (val === undefined) {
            val = [];
        }

        interests = val;
        drawInterests();

        fetchUserTags(drawInterests); // pull interests from the cloud (async), then re-draw when done
    });

    submitNewInterest.addEventListener("click", async () => {
        interests.push(document.getElementById('newInterest').value);

        setUserTags(interests); // store in cloud (async)
        chrome.storage.local.set({interests: interests}, drawInterests); // store locally (async), then re-draw interests
    });
}

