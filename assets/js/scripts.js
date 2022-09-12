      function entering(nick) {
        const nickRequest = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nick);

        nickRequest.then((res) => {
            if (res.status === 400) {
                alert('Name already in use, please choose a new one.')
                return;
            }
            else if (res.status === 200) {
                () => document.getElementById("pageContent").innerHTML = "";                ;
                chatRoom(nick);
                return;
            }
            else {
                alert('Unknown error');
                return;
            }
            console.log(res.status)
        }).catch((error) => {

        });
    }

    function getName() {
        const nickname = document.getElementById("nickname");
        entering(nickname);
    }

    function chatRoom(nickname) {
        setTimeout(() => {
            const online = axios.post(
                "https://mock-api.driven.com.br/api/v4/uol/status",
            {
                nickname: nickname
            });
        }, 5000, nickname);

        
    }