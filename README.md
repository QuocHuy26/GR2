Tải và chạy MySQL.

Tạo database tên là booking_hotel.


Mở terminal, chạy:

git clone https://github.com/QuocHuy26/GR2.git

cd booking-hotel-BE

npm install

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all

npm start


Mở terminal khác, chạy:

cd booking-hotel-fe

npm install

npm start
