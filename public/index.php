<?php
    $assetsHash = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/dist/hash')
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="/dist/app.css?<?= $assetsHash ?>" rel="stylesheet" />
    <script src="/dist/app.js?<?= $assetsHash ?>"></script>
</head>
<body>
    <div class="app">
        <div class="window tools">
            <h2>Tools</h2>
            <ul>
                <li>&lt;BUTTON&gt;Button</li>
                <li>&lt;P&gt;Paragraph</li>
                <li>&lt;DIV&gt;Div</li>
            </ul>
        </div>

        <div class="workingArea page">
            <h1>Моя новая страница</h1>
        </div>

        <div class="window elements">Elements</div>
    </div>
</body>
</html>