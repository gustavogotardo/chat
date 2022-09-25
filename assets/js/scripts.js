function entering(nick) {
    console.log('entrou na entering');
    const nickRequest = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', { name: nick });
    console.log('voltou do request');
    nickRequest.then((res) => {
        console.log(res);
        if (res.status === 400) {
            console.log('status 400');
            alert('Name already in use, please choose a new one.')
            return;
        }
        else if (res.status === 200) {
            console.log('status 200');
            document.getElementById("pageContent").innerHTML = `
                <ul id="messageList">
                </ul>
            `;
            chatRoom(nick);
            return;
        }
        else {
            console.log(res.status);
            alert('Unknown error');
            return;
        }
    }).catch((error) => {
        console.log(error.message);
    });
}

function getName(event) {
    event.preventDefault();
    const nickname = document.getElementById("nickname").value;
    entering(nickname);
}

function chatRoom(nickname) {
    console.log('entrou na chatRoom');
    setInterval(() => {
        const online = axios.post(
            "https://mock-api.driven.com.br/api/v4/uol/status",
            {
                name: nickname
            });
    }, 5000, nickname);

    setInterval(getMessages, 3000);
}

function getMessages() {
    const messagesRequest = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    messagesRequest.then((res) => {
        showMessages(res.data);
    }).catch((error) => {
        console.log(error.status);
    });
}

function sendMessage() {
    const message = document.getElementById("writing").value;
    const messageRequest = axios.post(
        "https://mock-api.driven.com.br/api/v4/uol/messages",
        {
            from: nickname,
            to: to,
            text: message,
            type: type
        }
    );
}

function showMessages(messages) {
    const pageContent = document.getElementById("messageList");
    console.log(messages);
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].type === "status") {
            pageContent.innerHTML += `
            <li class="messages status">
                <spam class="time">${messages[i].time}</spam>
                <spam class="from">${messages[i].from}</spam>
                <spam>to</spam>
                <spam class="to">${messages[i].to}</spam>
                ${messages[i].text}
            </li>
            `;
        }
        else if (messages[i].type === "private_message") {
            pageContent.innerHTML += `
            <li class="messages privateMessage">
                <spam class="time">${messages[i].time}</spam>
                <spam class="from">${messages[i].from}</spam>
                <spam>to</spam>
                <spam class="to">${messages[i].to}</spam>
                ${messages[i].text}
            </li>
            `;
        }
        else {
            pageContent.innerHTML += `
            <li class="messages">
                <spam class="time">${messages[i].time} </spam>
                <spam class="from">${messages[i].from} </spam>
                <spam>to </spam>
                <spam class="to">${messages[i].to} </spam>
                <spam class="message">${messages[i].text}</spam>
            </li>
            `;
        }
    }
}