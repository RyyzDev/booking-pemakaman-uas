<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/x-icon" href="https://www.shareicon.net/data/128x128/2015/09/12/99727_grave_512x512.png" />
    <style>
        @media print {

  body * {
    visibility: hidden;
  }

  #root, #root * {
    visibility: visible;
  }
  

  nav, .sidebar, .navbar, header {
    display: none !important;
  }

  body, html, #root {
    height: auto !important;
    overflow: visible !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
    </style>
    <title>Eternity Gardens - Cemetery Management</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body>
    <div id="app"></div>
</body>
</html>