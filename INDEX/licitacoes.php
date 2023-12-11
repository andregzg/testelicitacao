<?php
// Inicie a sessão
session_start();


// Resto do código para conexão com o banco de dados e processamento do formulário
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "licitacao";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recuperar dados do formulário
    $nomeDescricao = isset($_POST['desc']) ? $_POST['desc'] : '';
    $valor = isset($_POST['amount']) ? $_POST['amount'] : '';
    $tipo = isset($_POST['type']) ? $_POST['type'] : '';

    // Usar declaração preparada para evitar injeção de SQL
    $sqlInserir = $conn->prepare("INSERT INTO `licitacoes` (`nomeDescricao`, `valor`, `tipo`) VALUES (?, ?, ?)");

    // Vincular parâmetros
    $sqlInserir->bind_param("sds", $nomeDescricao, $valor, $tipo);

    // Fechar a declaração
    $sqlInserir->close();
}

// Fechar a conexão com o banco de dados
$conn->close();
?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de licitacao</title>

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <link rel="stylesheet" href="licitacao.css">
</head>
<body>
    <main>
        <div class="resume">
            <div>
                Entradas: R$
                <span class="incomes">0.00</span>
            </div>
            <div>
                Saídas: R$
                <span class="expenses">0.00</span>
            </div>
            <div>
                Total: R$
                <span class="total">0.00</span>
            </div>
        </div>
        <div class="newItem">
            <div class="divDasc">
                <label for="desc">Nome ou Descrição</label>
                <input type="text" id="desc"/>
            </div>
            <div class="divAmount">
                <label for="amount">Valor</label>
                <input type="number" id="amount"/>
            </div>
            <div class="divType">
                <label for="type">Tipo</label>
                <select id="type">
                    <option>Entrada</option>
                    <option>Saída</option>
                </select>
            </div>
            <div class="divStatus"></div>
            <button id="btnNew">Incluir</button>
        </div>
        <div class="divTable">
            <table> 
                <thead>
                    <tr>
                        <th>Nome ou Descrição</th>
                        <th class="columnAmount">Valor</th>
                        <th class="columnType">Tipo</th>
                        <th class="columnAction1">Excluir</th>
                        <th class="columnAction2">Editar</th>
                        <th class="">Status</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </main>
    
    <script src="script.js"></script>
</body>
</html>
