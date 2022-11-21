let baseUrl = "https://picsum.photos/v2/list?limit="

function useRequest(url, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open("Get", url, true)

    xhr.onload = function () {
        if (xhr.status !== 200) {
            console.log("Request status:", xhr.status);
        } else {
            const res = JSON.parse(xhr.response)
            console.log(res);
            if (callback) {
                callback(res)
            }
        }
    }
    xhr.onerror = function () {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
}

// Находим кнопку, инпут и место для вывода результата
const button = document.querySelector(".btn");
const input = document.querySelector(".input")
const resultPosition = document.querySelector(".result")

//Создадим функцию по обработке полученного результата
function resultFromDOM(requestData) {
    // создаем пусто результат
    let cards = ""
    // requestData - полученные от сервера данные
    requestData.forEach((item) => {
        const cardBlock = `
          <div class="card">
            <img
              alt="photo by request"
              src="${item.download_url}"
              class="card-image"
            />
          </div>
    `;
        cards = cards + cardBlock;
    })
    console.log('end cards', cards);
    resultPosition.innerHTML = cards;
}

// создадим функцию по модификации url запроса
function changeUrl(url, number) {
    return url + number
}

button.addEventListener("click", (e) => {
    e.preventDefault()
    const userNumber = Number(input.value)
    if (userNumber > 0 && userNumber <= 10) {
        const newUrl = changeUrl(baseUrl, userNumber)
        useRequest(newUrl, resultFromDOM)
    } else {
        alert("Pleas enter number from 1 to 10")
    }
})
