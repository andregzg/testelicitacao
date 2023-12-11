const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let items;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnNew").addEventListener("click", function () {
        // Recuperar valores do formulário
        var descricao = document.getElementById("desc").value;
        var valor = document.getElementById("amount").value;
        var tipo = document.getElementById("type").value;

        // Enviar dados para o PHP usando AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "licitacoes.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Exibir mensagem ou realizar outras ações após a inserção
                alert(xhr.responseText);
            }
        };

        // Enviar os dados como parâmetros POST
        xhr.send("desc=" + descricao + "&amount=" + valor + "&type=" + tipo);
    });
});


btnNew.onclick = () => {
    if (descItem.value === "" || amount.value === "" || type.value === "") {
        return alert("Preencha todos os campos!");
    }
    items.push({
        desc: descItem.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value,
        status: "Aberto",
    });

    setItensBD();

    loadItens();

    descItem.value = "";
    amount.value = "";
};

function editItem(licitacao) {
    const itemToEdit = items[licitacao];
    descItem.value = itemToEdit.desc;
    amount.value = itemToEdit.amount;
    type.value = itemToEdit.type;

    items.splice(licitacao, 1);
    setItensBD();
    loadItens();
}

function editStatus(licitacao) {
    const itemToEdit = items[licitacao];

    const newStatus = prompt("Digite o novo status (Aberto, Correndo, Finalizado):");

    if (newStatus && ["Aberto", "Correndo", "Finalizado"].includes(newStatus)) {
        itemToEdit.status = newStatus;
        setItensBD();
        loadItens();
    } else {
        alert("Status inválido. O status deve ser Aberto, Correndo ou Finalizado.");
    }
}

function deleteItem(licitacao) {
    swal({
        title: "Você tem certeza?",
        text: "Ao deletar não será possível recuperar!",
        icon: "",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            items.splice(licitacao, 1);
            setItensBD();
            loadItens();
            swal("Poof! " + desc + " foi apagado!", {
                icon: "success",
            });
        } else {
            swal(desc + " Não foi apagado!", {
                icon: "Error",
            });
        }
    });
}

function insertItem(item, licitacao) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${item.desc}</td>
        <td>R$ ${item.amount}</td>
        <td class="columnType">${
            item.type === "Entrada"
                ? '<i class="bx bxs-chevron-up-circle"></i>'
                : '<i class="bx bxs-chevron-down-circle"></i>'
        }</td>
        <td class="columnAction1">
            <button onclick="deleteItem(${licitacao})"><i class='bx bx-trash'></i></button>
        </td>
        <td class="columnAction2">
            <button onclick="editItem(${licitacao})"><i class='bx bx-edit-alt'></i></button>
        </td>
        <td class="">${item.status}</td>
        <td class="columnStatus">
            ${item.status === 'Correndo'
                ? `<button onclick="finalizarItem(${licitacao})">Finalizar</button>`
                : (item.status === 'Aberto'
                    ? `<button onclick="comecarItem(${licitacao})">Começar</button>`
                    : '')}
        </td>
    `;
    tbody.appendChild(tr);
}

function finalizarItem(licitacao) {
    const itemToEdit = items[licitacao];
    itemToEdit.status = 'Finalizado';
    setItensBD();
    loadItens();
}

function comecarItem(licitacao) {
    const itemToEdit = items[licitacao];
    itemToEdit.status = 'Correndo';
    setItensBD();
    loadItens();
}



function loadItens() {
    items = getItensBD();
    tbody.innerHTML = "";
    items.forEach((item, licitacao) => {
        insertItem(item, licitacao);
    });

    getTotals();
}

function getTotals() {
    const amountIncomes = items
        .filter((item) => item.type === "Entrada")
        .map((transaction) => Number(transaction.amount));

    const amountExpenses = items
        .filter((item) => item.type === "Saída")
        .map((transaction) => Number(transaction.amount));

    const totalIncomes = amountIncomes
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2);

    const totalExpenses = Math.abs(
        amountExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);

    const totalItems = (totalIncomes - totalExpenses).toFixed(2);

    incomes.innerHTML = totalIncomes;
    expenses.innerHTML = totalExpenses;
    total.innerHTML = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () =>
    localStorage.setItem("db_items", JSON.stringify(items));

loadItens();

function checkAuthentication() {

    loadItens();
}

document.addEventListener("DOMContentLoaded", checkAuthentication);
