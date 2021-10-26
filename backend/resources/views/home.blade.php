<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    @foreach ($list as $item)
        <h1>Ten khoa hoc: {{$item->course_title}}</h1>
        <h1>Ten giao vien: {{$item->course_title}}</h1>
        <h1>So luong Ass{$item->course_title}}</h1>
        <h1>So luong hoc sinh{$item->course_title}}</h1>
        <h1>So luong hoc tai lieu{$item->course_title}}</h1>
    @endforeach
</body>

</html>
