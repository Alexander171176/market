@php
    use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
@endphp
<!DOCTYPE html>
{{-- Отладка локали --}}
{{-- dd@(LaravelLocalization::getCurrentLocale(), app()->getLocale()) --}}
<html lang="{{ LaravelLocalization::getCurrentLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- 🛡 Запрет Google Translate --}}
        <meta name="google" content="notranslate">
        <meta http-equiv="Content-Language" content="{{ LaravelLocalization::getCurrentLocale() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- public/tinymce/tinymce.min.js -->
        <script src="/tinymce/tinymce.min.js"></script>

        <!-- public/tinymce/skins/ui/oxide/skin.min.css -->
        <link rel="stylesheet" href="/tinymce/skins/ui/oxide/skin.min.css">

        <!-- public/tinymce/skins/content/default/content.min.css -->
        <link rel="stylesheet" href="/tinymce/skins/content/default/content.min.css">


        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
