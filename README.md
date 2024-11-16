# WA-Invoice-Sender
Sistem Notifikasi WhatsApp Otomatis untuk Invoice menggunakan Google Apps Script

## 📋 Deskripsi
Sistem automasi pengiriman notifikasi invoice melalui WhatsApp yang terintegrasi dengan Google Forms dan Google Sheets. Ideal untuk UMKM, startup, atau bisnis yang ingin mengotomatisasi proses konfirmasi pembayaran mereka.

## 🌟 Fitur Utama
- Pengiriman notifikasi WhatsApp otomatis
- Nomor invoice berurutan otomatis
- Format pesan yang profesional dan informatif
- Integrasi dengan Google Forms
- Pencatatan transaksi di Google Sheets
- Pesan konfirmasi yang customizable
- Penanganan error yang baik

## 🚀 Cara Penggunaan

### Prasyarat
1. Akun Google Workspace
2. Akses ke Google Forms dan Google Sheets
3. API WhatsApp (dalam contoh ini menggunakan kirimwa.id)

### Langkah Instalasi
1. Buat Google Form baru dengan field berikut:
   - Nama Pelanggan
   - Jenis Pembayaran
   - Nominal Pembayaran
   - Bulan Pembayaran
   - Nomor WhatsApp

2. Hubungkan form dengan Google Sheets

3. Di Google Sheets, buka Script Editor:
   - Klik Tools > Script Editor
   - Copy-paste kode dari file `kirimwa.gs`
   - Sesuaikan konfigurasi API KEY dan nomor sender

4. Atur trigger:
   - Klik Triggers di sidebar
   - Buat trigger baru untuk fungsi kirimwa
   - Pilih event source "From form" dan event type "On form submit"

### Konfigurasi
```javascript
const CONFIG = {
  API_URL: "https://kirimwa.apps.classy.id/send-message",
  API_KEY: "YOUR_API_KEY",
  SENDER_NUMBER: "YOUR_SENDER_NUMBER",
  TIMEZONE: "Asia/Jakarta"
};
```

## 📝 Format Pesan
```
*KONFIRMASI PEMBAYARAN*
No. Invoice: INV/2024/001

📅 Waktu: 12 November 2024, 01:30 WIB
👤 Nama: [Nama Pelanggan]

*Detail Pembayaran*
📝 Jenis: [Jenis Pembayaran]
💰 Nominal: Rp [Nominal]
📅 Periode: [Bulan]

Status: ✅ BERHASIL DITERIMA
```

## 🤝 Kontribusi
Silakan berkontribusi dengan membuat pull request atau melaporkan issue.

## 📜 Lisensi
MIT License

## 🙏 Credit
Dikembangkan untuk membantu UMKM Indonesia dalam mengotomatisasi proses pembayaran mereka.
