# catatan ngoding

## fungsional file

### backend-express

- **configs**: untuk configurasi env
- **controllers**: untuk mengambil request dan memberikan response ke client
- **services**: untuk memanipulasi data dan logika bisnis
- **prisma**: ORM yang digunakan untuk scema db dan client prisma yang digunakan untuk manipulasi data
- **routes**: endpoint API / route API nya
- **Middleware**: untuk autentifikasi dan config multer
- **utils**: untuk utilitas umum seperti ganerate jwt, error handling, response dll
- **jobs**: untuk fungsi cronn dalam sistem ini yakni create data absensi yang alpha
- **folder uploads**: digunakan untuk penyimpanan local (diskstorage) ketika aktivitas prediksi
- **file .env** digunakan untuk environtment / code yang bersifat rahasia

### frontend-react

- **components**: ialah folder yang berisi code yang bisa digunakan secara berulang. misalkan file button maka bisa di panggil difolder pages dengan menggunakan button (acuan button agar konsisen di setiap pages)
- **co**