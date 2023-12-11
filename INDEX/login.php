<?php
include_once('envia.php');
$sql = "SELECT * FROM `usuarios`;";
$dbHost = '127.0.0.1';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'licitacao';

$conexao = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conexao, $_POST['email']);
    $password = mysqli_real_escape_string($conexao, $_POST['password']);

    // Consulta SQL para autenticação
    $sqlAutenticacao = "SELECT * FROM `usuarios` WHERE `email` = '$email' AND `senha` = '$password'";
    $resultadoAutenticacao = mysqli_query($conexao, $sqlAutenticacao);

    if ($resultadoAutenticacao) {
        $numLinhas = mysqli_num_rows($resultadoAutenticacao);

        if ($numLinhas == 1) {
            // Se as credenciais são corretas, configure a sessão
            $_SESSION['authenticated'] = true;

            // Redirecionar para a página desejada (por exemplo, licitacoes.php)
            header('Location: licitacoes.php');
            exit();
        } else {
            echo 'Credenciais inválidas. Por favor, tente novamente.';
        }
    } else {
        echo "Erro na consulta: " . mysqli_error($conexao);
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='style.css'>
    <title>Entre</title>
</head>
<body>
    <div class="container">
        <div class="form-image">
            <img src="download (1).jpeg">
        </div>
        <div class="form">
            <form action="login.php" method="post">
                <div class="form-header">
                    <div class="title">
                        <h1>Entre</h1>
                    </div>

                    <div class="input-group">
                        <div class="input-box">
                            <label for="email">E-mail</label>
                            <input id="email" type="email" name="email" placeholder="Digite seu email" required>
                        </div>

                        <div class="input-box">
                            <label for="password">Senha</label>
                            <input id="password" type="password" name="password" placeholder="Digite a Senha" required>
                        </div>
                    </div>

                    <div class="continue-button">
                        <button type="submit">Entrar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</body>
</html>

<script src="script.js"></script>