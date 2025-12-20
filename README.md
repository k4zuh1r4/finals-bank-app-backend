# final-bank-app

Sử dụng Node.js và TypeScript cùng framework NestJS để tạo ra backend cho ứng dụng web giao dịch ngân hàng cơ bản.

## Prerequisite - Yêu cầu bắt buộc


Cần các ứng dụng sau:
- [Node.js](https://https://nodejs.org/en/download/) (runtime environment cho JavaScript)
- [Docker](https://https://www.docker.com/products/docker-desktop/) (đóng gói ứng dụng)
- [Git](https://git-scm.com/) (version control)
- Ứng dụng truy cập trực tiếp database (`DBeaver`, `HeidiSQL`, etc.)

## Install 

Nếu chưa sử dụng Node.js hay JavaScript bao giờ:

- Sau khi cài đặt xong Node.js thì Node sẽ cài đặt cả npm làm packet manager để cài các module cần thiết.
- Docker dùng để đóng gói database (sử dụng PostgreSQL) thành một container riêng, không cần sử dụng đến pgAdmin để tạo server.

**Tạo một folder riêng sau đấy truy cập bằng terminal hoặc command prompt:**

```
cd <project folder>
git clone https://github.com/k4zuh1r4/finals-bank-app-backend.git
```

**Sau khi clone project về máy sử dụng npm để tự động cài đặt các packet và module cần thiết:**

```
npm install
```

**Sau đó bật Docker Desktop, đăng ký/đăng nhập tài khoản Docker rồi chạy:**
```
docker compose up -d
```
*Lưu ý là tắt pgAdmin, MySQL hoặc các phần mềm tạo server database trước khi chạy bằng Docker.*

Sau khi chạy xong thì có thể kiểm tra xem database có chạy không sử dụng một phần mềm xem database (DBeaver, HeidiSQL, etc.),
Port, tên truy cập và mật khẩu được ghi như trong file `compose.yaml`.

**Tạo một file có tên `.env` trong folder `src` rồi ghi lại config:**

```
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres

HASH_ROUNDS=12

JWT_SECRET=secretbank
JWT_EXPIRES_IN=3600
JWT_COOKIE_EXPIRES_IN=3600

EMAIL_USERNAME=ef9a6978832fb0
EMAIL_PASSWORD=bd2cb50e229696
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_FROM=mailtraptest <mailtraptest@k4.com>
```
Có thể thay đổi tên host, port, username, password và database name tùy theo ý muốn tuy nhiên phải đổi cả trong file `compose.yaml` và sử dụng cùng thông tin đấy để đăng nhập vào database từ phần mềm ngoài.

Phần email sử dụng dịch vụ [mailtrap](http://mailtrap.io/).
Cơ bản là sử dụng một dịch vụ sandbox để gửi email reset password hoặc các thao tác liên quan, có thể tự đăng ký người dùng trên trang rồi điền các thông tin của mình vào thay thế.

**Tiến hành chạy backend:**
```
npm run start:dev
```

## Components - Thành phần:

Project chia file thành các folder chính đại diện cho các chức năng chính của backend:
- `src/auth`: là thành phần chứa các dịch vụ liên quan đến xác thực/xác minh người dùng (Authentication/Authorization) như đăng ký/đăng nhập tài khoản, đặt lại mật khẩu, etc.
- `src/users`: thành phần chứa các dịch vụ liên quan đến tài khoản người dùng (CRUD operations) như chỉnh sửa tài khoản người dùng, xóa/thêm người dùng (hầu hết là các thao tác dành cho tài khoản Admin tương tác với dữ liệu người dùng).
- `src/wallets`: thành phần chứa các dịch vụ liên quan đến ví của người dùng như tạo ví, xóa ví, chỉnh sửa loại ví tiêu dùng của người dùng.
- `src/transactions`: thành phần chứa các dịch vụ liên quan đến thao tác giao dịch người dùng thông qua ví tiêu dùng như nạp/rút tiền khỏi ví, trao đổi tiền với ví khác, etc.

**Các thành phần được xây dựng theo mô hình 3 lớp (3-layer-architecture) để theo chuẩn REST API:**
Cấu trúc của mỗi dạng dịch vụ (auth, user, wallet, transactions) được chia lớp như sau:
- `Controller`: lớp trên cùng định nghĩa địa chỉ route kết nối API, loại tín hiệu HTTP cho mỗi route (GET, POST, PATCH, DELETE).
- `Service`: Lớp giữa sau khi thông tin đi qua lớp controller, dùng để sắp xếp và đưa dữ liệu đến đúng chức năng ở lớp cuối cùng.
- `Repository`: Lớp cuối cùng chứa các function thao tác trực tiếp với database (lấy, chỉnh sửa, thêm, xóa dữ liệu). Đối với project này sẽ chia thành các function nhỏ lẻ trong các folder `use-casses` và được tập hợp lại ở lớp `Service`.

*Ví dụ như trong folder `src/users` sẽ có các folder nhỏ hơn chứa 3 lớp này như `src/users/controller`, `src/users/services`, `src/users/use-cases` và tương tự như các folder khác như `auth`, `wallets`, `transactions`.*

Ngoài ra sẽ có các thành phần khác tham gia vào:

- `Guard`: là thành phần được tạo ra với mục đích kiểm tra thông tin của người đặt request cho route. 
*Ví dụ như `AuthGuard` trong folder `src/auth/guard` sẽ thực thi mỗi khi một request (yêu cầu) được gửi đến một route nhằm kiểm tra xem người dùng đã đăng nhập chưa thông qua việc kiểm tra token, và nếu không có thì sẽ từ chối thực thi yêu cầu trước khi* `Controller` truyền thông tin đi để thực thi.
- `Entity`: Thành phần định nghĩa bảng dữ liệu cho database để thuận tiện cho việc tự động thiết lập database bằng backend mà không cần phải thông qua việc tạo script ở database, và có thể tự động chỉnh sửa cập nhật cấu trúc của database theo backend mà không cần phải can thiệp thủ công bằng database.
- `DTO`: Data Transfer Object (DTO) là một dạng định nghĩa dữ liệu mẫu để khi đưa dữ liệu vào xử lý qua Controller thì `Controller` chỉ nhận dữ liệu của dạng mẫu đó và khi truyền xuống các lớp dưới thì các lớp dưới có thể biết trước trong dữ liệu được gửi có những gì để từ đó thực hiện các thao tác theo đúng yêu cầu, và nếu không đúng theo mẫu DTO thì tự động từ chối.
*Ví dụ khi đăng nhập thì `Controller` chỉ nhận dữ liệu theo một mẫu DTO bao gồm đúng 2 biến là `username` và `password` để các lớp dưới biết được là 2 biến này được truyền xuống thì mới có dữ liệu để xác thực với database.*


***Sơ đồ ERD***:![ERD-Example---ATM-_-Visual-Paradigm-Online---Brave-12_20_2025-9_07_09-PM.png](jb-image:img_1766239829770_5c20620c7062c8)

## Testing - kiểm thử:
Mặc định là sử dụng localhost để chạy backend trên port 3000 (`http://localhost:3000`), nếu có chỉnh sửa thì đổi đường dẫn route theo.
Có thể sử dụng [Postman](https://www.postman.com/) để kiểm thử các route theo các file controller.


   