# 📚 Petunjuk Instalasi
Selamat datang! Dokumen ini memandu Anda untuk menjalankan aplikasi web ini di PC lokal masing-masing.

#### Warning: Proyek ini dibangun menggunakan Laravel 12 (versi terbaru), sehingga diperlukan versi PHP dan dependensi yang sesuai.

# ⚙️ Pra-Syarat (Dependencies Wajib)
Pastikan Anda telah menginstal perangkat lunak berikut pada sistem operasi Anda (Windows, macOS, atau Linux):

<table class="tg"><thead>
  <tr>
    <th class="tg-c3ow">Perangkat Lunak</th>
    <th class="tg-c3ow">Versi Minimal</th>
    <th class="tg-c3ow">Kegunaan</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-0pky">PHP</td>
    <td class="tg-0pky">8.2 atau lebih tinggi</td>
    <td class="tg-0pky">Bahasa pemrograman utama yang digunakan oleh Laravel</td>
  </tr>
  <tr>
    <td class="tg-0pky">Node.JS</td>
    <td class="tg-0pky">24.11 atau lebih tinggi</td>
    <td class="tg-0pky">Web server berbasis javascript</td>
  </tr>
  <tr>
    <td class="tg-0pky">Composer</td>
    <td class="tg-0pky">Versi terbaru</td>
    <td class="tg-0pky">Dependency Manager resmi untuk PHP</td>
  </tr>
  <tr>
    <td class="tg-0pky">Git</td>
    <td class="tg-0pky">Versi terbaru</td>
    <td class="tg-0pky">Sistem kontrol versi untuk mengunduh kode dari GitHub</td>
  </tr>
  <tr>
    <td class="tg-0pky">Database</td>
    <td class="tg-0pky">MySQL/MariaDB atau SQLite</td>
    <td class="tg-0pky">Untuk menyimpan data aplikasi (XAMPP/Laragon/Valet)</td>
  </tr>
  <tr>
    <td class="tg-0pky">Terminal</td>
    <td class="tg-0pky">Git Bash / Windows Terminal / Terminal bawaan OS</td>
    <td class="tg-0pky">Untuk menjalankan perintah instalasi</td>
  </tr>
</tbody></table>




# 🚀 Instalasi Cepat
## 1. Instalasi Perangkat Lunak
### Untuk Windows:
#### Instal Laragon atau XAMPP → Ini akan menginstal PHP, MySQL, dan Apache/Nginx sekaligus.<br/>
Kunjungi <a href="https://www.apachefriends.org/download.html">XAMPP</a> untuk menginstal Node.<br/>
Kunjungi <a href="https://nodejs.org/">nodejs.org</a> untuk menginstal Node.<br/>
Kunjungi <a href="https://getcomposer.org">getcomposer.org</a> untuk menginstal Composer.<br/>
Kunjungi <a href="https://git-scm.com">git-scm.com</a> untuk menginstal Git.

### Untuk MAC:
#### Gunakan Homebrew atau instal Herd untuk setup lingkungan pengembangan modern.<br/>
Kunjungi <a href="https://www.apachefriends.org/download.html">XAMPP</a> untuk menginstal Node.<br/>
Kunjungi <a href="https://nodejs.org/">nodejs.org</a> untuk menginstal Node.<br/>
Kunjungi <a href="https://getcomposer.org">getcomposer.org</a> untuk menginstal Composer.<br/>
Kunjungi <a href="https://git-scm.com">git-scm.com</a> untuk menginstal Git.

### Untuk Linux:
#### Gunakan APT atau package manager Anda.<br/>
Kunjungi <a href="https://www.apachefriends.org/download.html">XAMPP</a> untuk menginstal Node.<br/>
Kunjungi <a href="https://nodejs.org/">nodejs.org</a> untuk menginstal Node.<br/>
Kunjungi <a href="https://getcomposer.org">getcomposer.org</a> untuk menginstal Composer.<br/>
Kunjungi <a href="https://git-scm.com">git-scm.com</a> untuk menginstal Git.

## 2. Clone Repository
#### Buka Terminal
### Clone repositori
```typescript
git clone https://github.com/namauser/nama-proyek-pemakaman.git
```
### Masuk ke folder proyek
```typescript 
cd nama-proyek-pemakaman
```
## 3. Setup Proyek Laravel
### A. Instalasi Dependensi PHP
```typescript 
composer install
```
### B. Instalasi Dependensi NPM
```typescript 
npm install
```

### C. Konfigurasi Environment File
```typescript 
cp .env.example .env
```
### D. Generate Application Key
```typescript 
php artisan key:generate
```
### D. Konfigurasi Database di .env
#### (opsional karena default pakai SQLite)
Buka file .env dan ubah konfigurasi database:
```typescript 
env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database_anda
DB_USERNAME=root
DB_PASSWORD=
```
⚠️ Penting: Pastikan Anda sudah membuat database kosong dengan nama yang sesuai di PHPMyAdmin atau tool database Anda.

## 4. Menjalankan Aplikasi
### Jalankan Migrasi Database
```typescript
php artisan migrate --seed
```

### Jalankan Server Lokal Node
```typescript
npm run dev
```
### Jalankan Server Lokal Laravel
```typescript
php artisan serve
```
## 5. Akses Aplikasi
### Buka browser Anda dan kunjungi:

### <a href="http://127.0.0.1:8000">http://127.0.0.1:8000</a>

## ✅ Selesai!
Aplikasi Laravel Anda sekarang berjalan. Jika ada masalah, pastikan versi PHP dan dependensi lainnya sesuai dengan persyaratan Laravel 12.

## 💬 Pertanyaan atau Masalah?
Jika mengalami kesulitan, hubungi saya!.

# Happy Coding! 🎉

