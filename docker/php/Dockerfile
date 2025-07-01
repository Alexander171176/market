FROM php:8.2-fpm-alpine

WORKDIR /var/www

# Обновляем список пакетов и устанавливаем ca-certificates
RUN apk update && \
    apk add --no-cache ca-certificates && \
    update-ca-certificates

# Комментарии к утилитам оптимизации:
# jpegoptim, optipng, gifsicle - стандартные оптимизаторы
# libwebp-tools - предоставляет утилиту cwebp для конвертации в WebP
# pngquant - для оптимизации PNG с потерями
# nodejs, npm, svgo - для оптимизации SVG

# Устанавливаем основные зависимости и утилиты для оптимизации изображений
RUN apk --update add \
    # Основные зависимости
    wget curl build-base libmemcached-dev libxml2-dev pcre-dev \
    zlib-dev autoconf cyrus-sasl-dev libgsasl-dev oniguruma-dev openssl openssl-dev \
    mariadb-dev freetype-dev libjpeg-turbo-dev libpng-dev libwebp-dev \
    imagemagick imagemagick-dev nano unzip \
    # Утилиты оптимизации (без avifenc)
    jpegoptim optipng gifsicle libwebp-tools pngquant

# Устанавливаем Node.js и SVGO
RUN apk add --no-cache nodejs npm && \
    npm install -g svgo

# Устанавливаем расширения PHP, включая поддержку GD и MySQL
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install gd pdo_mysql pcntl exif

# Устанавливаем и активируем Imagick
RUN pecl install imagick && docker-php-ext-enable imagick

# Устанавливаем Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename composer

# Копируем конфигурацию PHP
COPY ./docker/php/php.ini /usr/local/etc/php/conf.d/php.ini

# Очистка кешей
RUN rm -rf /var/cache/apk/* /tmp/* && \
    npm cache clean --force && \
    rm -rf /root/.npm /root/.node-gyp
