# Backend Laravel 13
FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    git curl zip unzip libpng-dev libjpeg-turbo-dev freetype-dev oniguruma-dev libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif gd bcmath pcntl \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY . .
RUN composer dump-autoload --optimize && \
    php artisan storage:link || true && \
    chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
