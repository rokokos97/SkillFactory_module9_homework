function pageLoaded() {
    // Найдем инпут1 и инпут2
    const previusUrl = localStorage.getItem("url")
    if (previusUrl) {
        useRequest(previusUrl, resultFromDOM)
    }

    const form = document.querySelector(".request")
    const input1 = form.querySelector(".input1")
    const input2 = form.querySelector(".input2")
    const buttonRequest = form.querySelector(".btn")
    const resultPosition = document.querySelector(".result")


    //Создадим функцию по обработке полученного результата
    function resultFromDOM(requestData) {
        // создаем пусто результат
        let cards = ""
        requestData.forEach((card) => {
            const cardBlock = `
                  <div class="card">
                    <img
                      alt="photo by request"
                      src="${card.download_url}"
                      class="card-image"
                    />
                  </div>
            `
            cards += cardBlock
        })
        resultPosition.innerHTML = cards;
    }

    function useRequest(url, callback) {
        let xhr = new XMLHttpRequest()
        xhr.open("Get", url, true)

        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log("Request status:", xhr.status);
            } else {
                const res = JSON.parse(xhr.response)
                console.log("res", res);
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

    const inDiapason = (input) => {
        return input.value > 0 && input.value <= 10;
    }
    // Вешаем на кнопку обработчик событий
    buttonRequest.addEventListener("click", (e) => {
        e.preventDefault()
        let newUrl
        if (inDiapason(input1)) {
            if (inDiapason(input2)) {
                newUrl = `https://picsum.photos/v2/list?page=${input1.value}&limit=${input2.value}`
                localStorage.setItem("url", newUrl)
            } else {
                alert("Limit is out of diapason")
            }
        } else {
            if (inDiapason(input2)) {
                alert("Number of page is out of diapason")
            } else {
                alert("Number and Limit are out of diapason")
            }
        }
        console.log(newUrl)
        useRequest(newUrl, resultFromDOM)
    })
}

document.addEventListener("DOMContentLoaded", pageLoaded);