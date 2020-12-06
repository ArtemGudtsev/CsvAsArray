function bodyLoad() {
    // 1) Загружаем файл, файл будет представлен как сплошной текст.
    const ajax = new XMLHttpRequest();

    ajax.open("GET", "birthdays.csv", false);
    ajax.send();

    const data = ajax.responseText;

    // 2) Теперь нужно разбить сплошной текст на строки из файла.
    const lines = data.split('\n');

    // 3) Имея строки разбиваем каждую строку на два поля - ФИО и ДР - заливаем это в массив данных.
    let bdays = [];
    const currentDate = new Date (Date.now());

    for (let i = 1; i < lines.length; ++i) {// Начинаем с 1 что бы пропустить первую строку с заголовками.
        const line = lines[i];
        const fields = line.split(',');

        if (fields.length < 2) continue;

        const bday = new Date(Date.parse(fields[1]));

        if (bday.getMonth() === currentDate.getMonth()
            && bday.getDate() === currentDate.getDate()) {
            bdays.push(fields[0]);
        }
    }

    // 4) Остаётся выложить массив с отобранными фио и др в таблицу на странице.
    for (let i = 0; i < bdays.length; ++i) {
        addPersonToBdaysTable(bdays[i]);
    }
}

function addPersonToBdaysTable(fio) {
    const table = document.getElementById('birthdays-table');
    const row = table.insertRow(0);
    const fioCell = row.insertCell(0);

    fioCell.innerText = fio;
}