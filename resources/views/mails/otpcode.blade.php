<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Otpcode</title>
</head>
<body>
    <div>
        <h2>
            Bonjour, {{ $name }}
        </h2>
        Veuliiez utilisez ce code pour confirmer votre E-mail,
        <h1>{{ $code }}</h1> 

        <p>{{ $email }}</p>
    </div>
</body>
</html>