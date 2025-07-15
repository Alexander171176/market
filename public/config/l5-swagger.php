<?php

return [
    'default' => 'default',
    'documentations' => [
        'default' => [
            'api' => [
                'title' => 'L5 Swagger UI',
            ],

            'routes' => [
                /*
                 * Маршрут доступа к интерфейсу документации api
                */
                'api' => 'api/documentation',
            ],
            'paths' => [
                /*
                 * Отредактируйте, чтобы включить полный URL-адрес в пользовательский интерфейс для ресурсов
                */
                'use_absolute_path' => env('L5_SWAGGER_USE_ABSOLUTE_PATH', false),

                /*
                 * Имя файла сгенерированного файла документации в формате json
                */
                'docs_json' => 'api-docs.json',

                /*
                 * Имя файла сгенерированного файла документации YAML
                */
                'docs_yaml' => 'api-docs.yaml',

                /*
                * Задайте значение `json` или `yaml`, чтобы определить, какой файл документации использовать в пользовательском интерфейсе
                */
                'format_to_use_for_docs' => env('L5_FORMAT_TO_USE_FOR_DOCS', 'json'),

                /*
                 * Сохраняются абсолютные пути к каталогу, содержащему аннотации swagger.
                */
                'annotations' => [
                    base_path('app'),
                ],

            ],
        ],
    ],
    'defaults' => [
        'routes' => [
            /*
             * Маршрут для доступа к проанализированным аннотациям swagger.
            */
            'docs' => 'docs',

            /*
             * Маршрут для обратного вызова аутентификации Oauth2.
            */
            'oauth2_callback' => 'api/oauth2-callback',

            /*
             * Промежуточное программное обеспечение позволяет предотвратить неожиданный доступ к документации API
            */
            'middleware' => [
                'api' => [],
                'asset' => [],
                'docs' => [],
                'oauth2_callback' => [],
            ],

            /*
             * Параметры группы маршрутов
            */
            'group_options' => [],
        ],

        'paths' => [
            /*
             * Абсолютный путь к местоположению, в котором будут храниться проанализированные аннотации
            */
            'docs' => storage_path('api-docs'),

            /*
             * Абсолютный путь к каталогу, в который нужно экспортировать представления
            */
            'views' => base_path('resources/views/vendor/l5-swagger'),

            /*
             * Отредактируйте, чтобы задать базовый путь к api
            */
            'base' => env('L5_SWAGGER_BASE_PATH', null),

            /*
             * Отредактируйте, чтобы указать путь, где должны храниться ресурсы пользовательского интерфейса swagger
            */
            'swagger_ui_assets_path' => env('L5_SWAGGER_UI_ASSETS_PATH', 'vendor/swagger-api/swagger-ui/dist/'),

            /*
             * Абсолютный путь к каталогам, которые должны быть исключены из проверки
             * @deprecated Please use `scanOptions.exclude`
             * `scanOptions.exclude` overwrites this
            */
            'excludes' => [],
        ],

        'scanOptions' => [
            /**
             * analyser: defaults to \OpenApi\StaticAnalyser .
             *
             * @see \OpenApi\scan
             */
            'analyser' => null,

            /**
             * analysis: defaults to a new \OpenApi\Analysis .
             *
             * @see \OpenApi\scan
             */
            'analysis' => null,

            /**
             * Классы обработчиков пользовательских путей запроса.
             *
             * @link https://github.com/zircote/swagger-php/tree/master/Examples/processors/schema-query-parameter
             * @see \OpenApi\scan
             */
            'processors' => [
                // new \App\SwaggerProcessors\SchemaQueryParameter(),
            ],

            /**
             * pattern: string       $pattern File pattern(s) to scan (default: *.php) .
             *
             * @see \OpenApi\scan
             */
            'pattern' => null,

            /*
             * Абсолютный путь к каталогам, которые должны быть исключены из проверки
             * @note This option overwrites `paths.excludes`
             * @see \OpenApi\scan
            */
            'exclude' => [],

            /*
             * Позволяет генерировать спецификации либо для OpenAPI 3.0.0, либо для OpenAPI 3.1.0.
             * По умолчанию спецификация будет находиться в версии 3.0.0
             */
            'open_api_spec_version' => env('L5_SWAGGER_OPEN_API_SPEC_VERSION', \L5Swagger\Generator::OPEN_API_DEFAULT_SPEC_VERSION),
        ],

        /*
         * Определения безопасности API. Будут сгенерированы в файл документации.
        */
        'securityDefinitions' => [
            'securitySchemes' => [
                /*
                 * Примеры схем обеспечения безопасности
                */
                /*
                'api_key_security_example' => [ // Unique name of security
                    'type' => 'apiKey', // The type of the security scheme. Valid values are "basic", "apiKey" or "oauth2".
                    'description' => 'A short description for security scheme',
                    'name' => 'api_key', // The name of the header or query parameter to be used.
                    'in' => 'header', // The location of the API key. Valid values are "query" or "header".
                ],
                'oauth2_security_example' => [ // Unique name of security
                    'type' => 'oauth2', // The type of the security scheme. Valid values are "basic", "apiKey" or "oauth2".
                    'description' => 'A short description for oauth2 security scheme.',
                    'flow' => 'implicit', // The flow used by the OAuth2 security scheme. Valid values are "implicit", "password", "application" or "accessCode".
                    'authorizationUrl' => 'http://example.com/auth', // The authorization URL to be used for (implicit/accessCode)
                    //'tokenUrl' => 'http://example.com/auth' // The authorization URL to be used for (password/application/accessCode)
                    'scopes' => [
                        'read:projects' => 'read your projects',
                        'write:projects' => 'modify projects in your account',
                    ]
                ],
                */

                /* Open API 3.0 support
                'passport' => [ // Unique name of security
                    'type' => 'oauth2', // The type of the security scheme. Valid values are "basic", "apiKey" or "oauth2".
                    'description' => 'Laravel passport oauth2 security.',
                    'in' => 'header',
                    'scheme' => 'https',
                    'flows' => [
                        "password" => [
                            "authorizationUrl" => config('app.url') . '/oauth/authorize',
                            "tokenUrl" => config('app.url') . '/oauth/token',
                            "refreshUrl" => config('app.url') . '/token/refresh',
                            "scopes" => []
                        ],
                    ],
                ],
                'sanctum' => [ // Unique name of security
                    'type' => 'apiKey', // Valid values are "basic", "apiKey" or "oauth2".
                    'description' => 'Enter token in format (Bearer <token>)',
                    'name' => 'Authorization', // The name of the header or query parameter to be used.
                    'in' => 'header', // The location of the API key. Valid values are "query" or "header".
                ],
                */
            ],
            'security' => [
                /*
                 * Examples of Securities
                */
                [
                    /*
                    'oauth2_security_example' => [
                        'read',
                        'write'
                    ],

                    'passport' => []
                    */
                ],
            ],
        ],

        /*
         * Установите для этого параметра значение "true" в режиме разработки, чтобы документы создавались заново при каждом запросе
         * Установите для этого параметра значение "false", чтобы отключить генерацию SWAGGER в рабочей среде
        */
        'generate_always' => env('L5_SWAGGER_GENERATE_ALWAYS', false),

        /*
         * Установите для этого параметра значение "true", чтобы сгенерировать копию документации в формате yaml
        */
        'generate_yaml_copy' => env('L5_SWAGGER_GENERATE_YAML_COPY', false),

        /*
         * Отредактируйте, чтобы доверять ip-адресу прокси-сервера - необходимо для AWS Load Balancer
         * string[]
        */
        'proxy' => false,

        /*
         * Плагин Configs позволяет извлекать внешние конфигурации вместо того, чтобы передавать их в Swagger UI Bundle.
         * See more at: https://github.com/swagger-api/swagger-ui#configs-plugin
        */
        'additional_config_url' => null,

        /*
         * Примените сортировку к списку операций каждого API. Это может быть "альфа" (сортировка по алфавитно-цифровым путям).,
         * "метод" (сортировка по методу HTTP).
         * По умолчанию используется порядок, возвращаемый сервером без изменений.
        */
        'operations_sort' => env('L5_SWAGGER_OPERATIONS_SORT', null),

        /*
         * Передайте параметр Uri validator в Swagger Ui init на стороне JS.
         * Значение null здесь отключает проверку
        */
        'validator_url' => null,

        /*
         * Параметры конфигурации пользовательского интерфейса Swagger
        */
        'ui' => [
            'display' => [
                /*
                 * Управляет настройками расширения по умолчанию для операций и тегов. Это может быть :
                 * 'list' (expands only the tags),
                 * 'full' (expands the tags and operations),
                 * 'none' (expands nothing).
                 */
                'doc_expansion' => env('L5_SWAGGER_UI_DOC_EXPANSION', 'none'),

                /**
                 * Если задано, включается фильтрация. На верхней панели отобразится поле редактирования, которое
                 * можно использовать для фильтрации отображаемых операций с тегами. Может быть
                 * логическим значением для включения или отключения, или строкой, в этом случае фильтрация
                 * будет активирован при использовании этой строки в качестве выражения фильтра. Фильтрация
                 * чувствительна к регистру и соответствует выражению фильтра в любом месте внутри тега
                 *.
                 */
                'filter' => env('L5_SWAGGER_UI_FILTERS', true), // true | false
            ],

            'authorization' => [
                /*
                 * Если установлено значение true, сохраняются данные авторизации, и они не будут потеряны при закрытии/обновлении браузера
                 */
                'persist_authorization' => env('L5_SWAGGER_UI_PERSIST_AUTHORIZATION', false),

                'oauth2' => [
                    /*
                    * Если установлено значение true, добавляет PKCE в поток AuthorizationCodeGrant
                    */
                    'use_pkce_with_authorization_code_grant' => false,
                ],
            ],
        ],
        /*
         * Constants which can be used in annotations
         */
        'constants' => [
            'L5_SWAGGER_CONST_HOST' => env('L5_SWAGGER_CONST_HOST', 'http://localhost:8000'),
        ],
    ],
];
