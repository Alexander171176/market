<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('l5-swagger.documentations.default.api.title') }}</title>
    <link rel="stylesheet" type="text/css" href="{{ url('vendor/swagger-api/swagger-ui/dist/swagger-ui.css') }}">
    <link rel="icon" type="image/png" href="{{ url('vendor/swagger-api/swagger-ui/dist/favicon-32x32.png') }}" sizes="32x32"/>
    <link rel="icon" type="image/png" href="{{ url('vendor/swagger-api/swagger-ui/dist/favicon-16x16.png') }}" sizes="16x16"/>
    <style>
        html {
            box-sizing: border-box;
            overflow-y: scroll;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
            margin:0;
            background: #fafafa;
        }
    </style>
</head>
<body>
<div id="swagger-ui"></div>
<script src="{{ url('vendor/swagger-api/swagger-ui/dist/swagger-ui-bundle.js') }}"></script>
<script src="{{ url('vendor/swagger-api/swagger-ui/dist/swagger-ui-standalone-preset.js') }}"></script>
<script>
    window.onload = function() {
        const ui = SwaggerUIBundle({
            dom_id: '#swagger-ui',
            url: "{{ url('storage/api-docs/api-docs.json') }}",
            operationsSorter: null,
            configUrl: null,
            validatorUrl: null,
            oauth2RedirectUrl: null,

            requestInterceptor: function(request) {
                request.headers['X-CSRF-TOKEN'] = '{{ csrf_token() }}';
                return request;
            },

            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],

            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],

            layout: "StandaloneLayout",
            docExpansion: "{{ config('l5-swagger.defaults.ui.display.doc_expansion', 'none') }}",
            deepLinking: true,
            filter: {{ config('l5-swagger.defaults.ui.display.filter') ? 'true' : 'false' }},
            persistAuthorization: "{{ config('l5-swagger.defaults.ui.authorization.persist_authorization') ? 'true' : 'false' }}"
        });

        window.ui = ui;

        @if(in_array('oauth2', array_column(config('l5-swagger.defaults.securityDefinitions.securitySchemes'), 'type')))
        ui.initOAuth({
            usePkceWithAuthorizationCodeGrant: "{{ (bool)config('l5-swagger.defaults.ui.authorization.oauth2.use_pkce_with_authorization_code_grant') }}"
        });
        @endif
    }
</script>
</body>
</html>
