let baseUrl = "https://picsum.photos/"
// Записываем в переменную значения из input
const input1 = document.querySelector(".input1")
const input2 = document.querySelector(".input2")
// Находим кнопку SUBMIT
const buttonSubmit = document.querySelector(".btn")
const resultPosition = document.querySelector(".result")

function useRequest(url, callback) {
    fetch(url)
        .then((response) => {
            console.log("response", response)
            const result = response
            console.log('result', result);
            return result;
        })
        .then((data) => {
            // Объект результата в формате JSON
            console.log("data", data)
            callback(data)
        })
        .catch(() => {
            console.log('error')
        })
}

//Создадим функцию по обработке полученного результата
function resultFromDOM(requestData) {
    // создаем пусто результат
    const cardBlock = `
          <div class="card">
            <img
              alt="photo by request"
              src="${requestData.url}"
              class="card-image"
            />
          </div>
    `
    console.log('cardBlock', cardBlock);
    resultPosition.innerHTML = cardBlock;
}


// Вешаем на кнопку обработчик событий
buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    let input1Number = input1.value
    let input2Number = input2.value
    console.log(input1Number);
    if (input1Number > 100 && input1Number <= 300) {
        if (input2Number > 100 && input2Number <= 300) {
            // Формируем новую ссылку для запроса
            const newUrl = baseUrl + input1Number + "/" + input2Number
            // console.log("newUrl", newUrl);
            useRequest(newUrl, resultFromDOM)
        } else {
            alert("One of the numbers out of diapason 100-300")
        }
    } else {
        alert("One of the numbers out of diapason 100-300")
    }
})

