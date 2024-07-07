const table = document.getElementById("user-info");

const today = new Date();
const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
const properties = [
    { title: '申し込み日', feedback: formattedDate},
    { title: 'ご利用環境', feedback: navigator.userAgent},
    { title: '言語', feedback: navigator.language}
]

properties.forEach(prop => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = prop.title;
    cell2.textContent = prop.feedback;
});