<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Просмотр кода компонента</title>
    <style>
        textarea {
            width: 100%;
            height: 90vh;
            font-family: monospace;
            font-size: 14px;
            background-color: #f8f8f8;
            padding: 10px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
<h1>Просмотр кода компонента</h1>
<textarea readonly>{{ $content }}</textarea>
</body>
</html>
