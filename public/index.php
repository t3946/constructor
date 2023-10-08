<?php
    $assetsHash = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/dist/hash')
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="/dist/app.css?<?= $assetsHash ?>" rel="stylesheet"/>
    <script src="/dist/app.js?<?= $assetsHash ?>"></script>
</head>
<body>
<div class="app">
    <div class="window tools">
        <h2>Tools</h2>
        <?php
        $elements = [
            'p',
            'div',
            'h1',
            'h2',
            'h3',
            'img',
            'form',
            'button',
        ]
        ?>
        <ul class="list">
            <?php foreach ($elements as $elem): ?>
                <li class="item" data-elem="<?= $elem ?>"><?= '&lt' . strtoupper($elem) . '&gt' ?></li>
            <?php endforeach ?>
        </ul>
    </div>

    <div class="window page">
        <h1>Моя новая <b>страница</b></h1>
    </div>

    <div class="window elements">
        <h2>Elements</h2>
        <div class="elementsList"></div>
    </div>
</div>
</body>
</html>