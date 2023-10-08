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
        <h1>My new <i>page</i></h1>
    </div>

    <div class="rightSidebar">
        <div class="window dom">
            <h2>DOM</h2>
            <div class="elementsList"></div>
        </div>

        <div class="window">
            <h2>Properties</h2>

            <table class="tableProperties">
                <tbody>
                <tr>
                    <td>
                        <div class="caption">class</div>
                    </td>
                    <td><input type="text"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
</html>