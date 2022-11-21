// Запишим данные XML в переменную при помощи щаблонной строки
const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;
console.log("xmlString", xmlString);

// создадим экземпляр класса DOMРarser и запишим его в переменную

const parse = new DOMParser();

// теперь парсим XML
const xml = parse.parseFromString(xmlString, "text/xml");
// console.log(xml);

// Получим все DOM-нод
const students = Array.from(xml.querySelectorAll("student"));
const newStudents = students.map((student) => {
  const name = student.querySelector("name");
  const firstName = name.querySelector("first").innerHTML;
  const lastName = name.querySelector("second").innerHTML;
  const age = student.querySelector("age").innerHTML;
  const prof = student.querySelector("prof").innerHTML;
  return {
    name: `${firstName} ${lastName}`,
    age: age,
    prof: `${prof}`,
  };
});
const result = {
  list: newStudents,
};
console.log("result", result);
