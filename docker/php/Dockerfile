FROM php:8.2-fpm

WORKDIR /var/www

# Обновление системы и установка необходимых пакетов
RUN apt-get update && apt-get install -y \
    bash \
    curl \
    wget \
    nano \
    unzip \
    ca-certificates \
    build-essential \
    libxml2-dev \
    libssl-dev \
    libonig-dev \
    libjpeg-dev \
    libpng-dev \
    libwebp-dev \
    libfreetype6-dev \
    imagemagick \
    libmagickwand-dev \
    jpegoptim \
    optipng \
    gifsicle \
    webp \
    pngquant \
    nodejs \
    npm \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Установка SVGO для оптимизации SVG
RUN npm install -g svgo

# Установка PHP-расширений (GD, PDO, PCNTL, EXIF)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install gd pdo_mysql pcntl exif

# Установка и активация Imagick
RUN pecl install imagick && docker-php-ext-enable imagick

# Установка Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Копирование php.ini
COPY ./docker/php/php.ini /usr/local/etc/php/conf.d/php.ini

# Очистка npm кеша
RUN npm cache clean --force && \
    rm -rf /root/.npm /root/.node-gyp
