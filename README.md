# Smart Kitchen API 🍳

**Smart Kitchen API** là hệ thống backend cốt lõi cho ứng dụng trợ lý nấu ăn thông minh. Dự án này được xây dựng nhằm giúp người dùng quản lý nhà bếp, tìm kiếm công thức nấu ăn và tối ưu hóa trải nghiệm nấu nướng hàng ngày thông qua các tính năng hiện đại.

## 📝 Giới thiệu đề tài

Trong thời đại công nghệ số, việc quản lý thực phẩm và lựa chọn thực đơn hàng ngày trở nên quan trọng hơn bao giờ hết. Đề tài **Smart Kitchen** được thực hiện với mục tiêu:
* **Hỗ trợ người dùng:** Cung cấp các gợi ý công thức nấu ăn dựa trên nguyên liệu sẵn có.
* **Quản lý thông minh:** Theo dõi kho thực phẩm trong bếp, hạn sử dụng và danh sách mua sắm.
* **Tối ưu hóa thời gian:** Giúp việc lên kế hoạch bữa ăn trở nên nhanh chóng và khoa học.

Hệ thống API này đóng vai trò trung tâm xử lý dữ liệu, cung cấp các endpoint cho ứng dụng mobile, đảm bảo tính bảo mật và hiệu suất xử lý vượt trội.

---

## 🚀 Công nghệ sử dụng

* **Runtime & Framework:** Bun (Runtime) + ElysiaJS (Backend Framework) – Ưu điểm: Tốc độ xử lý cực nhanh, hỗ trợ TypeScript tối đa.
* **Mobile App:** React Native (Expo).
* **Database (Mô hình lai):**
  * **PostgreSQL:** Lưu trữ dữ liệu có cấu trúc quan trọng (Thông tin chi tiết User, Lịch sử quét, Danh sách Yêu thích, Cache công thức).
  * **Firebase:** Sử dụng cho Authentication (Đăng nhập Google/Facebook dễ dàng) và Cloud Storage (Lưu ảnh chụp từ camera).
* **AI & 3rd Party APIs:**
  * **Nhận diện:** Google Cloud Vision API (Label Detection).
  * **Nguồn dữ liệu:** TheMealDB API (Lấy công thức chuẩn quốc tế).
  * **Xử lý ngôn ngữ:** Claude API (Dịch công thức từ TheMealDB sang tiếng Việt, hoặc biến tấu công thức nếu thiếu nguyên liệu).

---

## ⚙️ Hướng dẫn cài đặt

Dự án này sử dụng môi trường **Bun**, framework **ElysiaJS** và ORM **Prisma**. Dưới đây là các bước thiết lập:

### 1. Cài đặt Bun (Runtime)
Bun là một runtime siêu tốc, đóng vai trò thay thế Node.js và npm.
* **Trên Linux / macOS / WSL:** Mở terminal và chạy lệnh sau:
  ```bash
  curl -fsSL [https://bun.sh/install](https://bun.sh/install) | bash
  
* **Khởi động lại terminal và kiểm tra phiên bản để chắc chắn Bun đã được cài:
  ```bash
  bun --version
### 2.Tải dự án & Cài đặt ElysiaJS (Framework)
ElysiaJS là backend framework chạy trên Bun
* **Clone mã nguồn và cài đặt thư viện:**
 ```bash
  git clone [https://github.com/dobason/smart-kitchen-api.git](https://github.com/dobason/smart-kitchen-api.git)
  cd smart-kitchen-api
  bun install
```
(Ghi chú: Khi chạy bun install, ElysiaJS và các dependencies khác trong dự án sẽ tự động được cài đặt. Nếu muốn tự khởi tạo một dự án Elysia hoàn toàn mới từ đầu, bạn có thể dùng lệnh: bun create elysia ten-du-an)
### 3. Cài đặt và cấu hình Prisma (Database ORM)
Prisma giúp thao tác với PostgreSQL an toàn và chặt chẽ hơn qua TypeScript.
* **Cài đặt Prisma vào dự án:**
   ```bash
  bun add -d prisma
  bun add @prisma/client
  ```
* **Khởi tạo Prisma:**
   ```bash
  bunx prisma init
  ```
 * **Cấu hình Database:**
 * 1.Mở file .env vừa được sinh ra, cập nhật biến DATABASE_URL trỏ tới chuỗi kết nối PostgreSQL của bạn.
 * 2.Đồng bộ cấu trúc dữ liệu lên database:
   ```bash
   bunx prisma db push
   ```
  ### 4. Khởi chạy Server
  Mở terminal tại thư mục gốc của dự án và chạy:
  ```bash
   bun run dev
  ```
Server ElysiaJS sẽ được khởi động và sẵn sàng xử lý các request từ ứng dụng React Native!
