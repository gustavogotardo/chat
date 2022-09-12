function entering(nick) {
    const nickRequest = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nick);

    nickRequest.then((res) => {
        if (res.status === 400) {
            alert('Name already in use, please choose a new one.')
            return;
        }
        else if (res.status === 200) {
            () => document.getElementById("pageContent").innerHTML = `
                <ul id="messageList">
                </ul>
            `;
            chatRoom(nick);
            return;
        }
        else {
            alert('Unknown error');
            return;
        }
        console.log(res.status)
    }).catch((error) => {
        console.log(res.status);
    });
}

function getName() {
    const nickname = document.getElementById("nickname");
    entering(nickname);
}

function chatRoom(nickname) {
    setInterval(() => {
        const online = axios.post(
            "https://mock-api.driven.com.br/api/v4/uol/status",
            {
                nickname: nickname
            });
    }, 5000, nickname);

    setInterval(getMessages, 3000);
}

function getMessages() {
    const messages = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");

    messages.then((res) => {
        showMessages(messages);
    }).catch((error) => {
        console.log(messages.status);
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

function showMessages() {
    const pageContent = document.getElementById("messageList");

    for (let i = 0; i<messages.lenght; i++) {
        if (messages(i).type === "status") {
            pageContent.innerHTML += `
            <li class="messages status">
                <spam class="time">${message.time}</spam>
                <spam class="from">${message.from}</spam>
                <spam>to</spam>
                <spam class="to">${message.to}</spam>
                ${message.text}
            </li>
            `;
        }
        else if (messages(i).to === "private_message") {
            pageContent.innerHTML += `
            <li class="messages privateMessage">
                <spam class="time">${message.time}</spam>
                <spam class="from">${message.from}</spam>
                <spam>to</spam>
                <spam class="to">${message.to}</spam>
                ${message.text}
            </li>
            `;
        }
        else {
            pageContent.innerHTML += `
            <li class="messages">
                <spam class="time">${message.time} </spam>
                <spam class="from">${message.from} </spam>
                <spam>to </spam>
                <spam class="to">${message.to} </spam>
                <spam class="message">${message.text}</spam>
            </li>
            `;
        }
    }
}