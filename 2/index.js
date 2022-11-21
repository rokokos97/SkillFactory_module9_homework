// Сохраним джейсон который мы будем парсить в переменную
const jsonString = `{
    "list": [
    {
        "name": "Petr",
        "age": "20",
        "prof": "mechanic"
    },
    {
        "name": "Vova",
        "age": "60",
        "prof": "pilot"
    }
]
}`;
console.log("jsonString", jsonString);
// Получим данные
const obj = JSON.parse(jsonString);
console.log("obj", obj);
