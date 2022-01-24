# WS Aruba WebSocket Lib
How to run IoT Aruba Solution for Demo
Install NodeJS on your machine and run file node server.js

Docker had provided and using cli as below

docker run -d -p 80:80 --name my-apache-php-app -v "$PWD":/var/www/html oluciazo/iot:apache

docker run --name myadmin -d --link mysql-iot:db -p 8081:80 oluciazo/iot:phpmyadmin

docker run --name=mysql-iot -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=iot -p 3306:3306 -d oluciazo/iot:mysql

docker run -d --name=grafana -p 3000:3000 oluciazo/iot:grafana

ALTER USER ‘root’@‘%’ IDENTIFIED WITH mysql_native_password BY ‘password’;
flush privileges;

Import file iot.sql to your mysql server
add macaddress and name for filter devices

Go to open Grafana the dashboard will displaying your IoT devices

![image](https://user-images.githubusercontent.com/18340935/150284700-01b5e4f5-698e-4089-aa53-c336bffba305.png)
