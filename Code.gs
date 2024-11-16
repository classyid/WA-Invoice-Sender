// Konfigurasi API WhatsApp
const CONFIG = {
  API_URL: "https://m-pedia/send-message",
  API_KEY: "<apikey>",
  SENDER_NUMBER: "<sender>",
  TIMEZONE: "Asia/Jakarta"
};

// Format tanggal ke format Indonesia yang benar
function formatTanggal(tanggal) {
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const d = new Date();
  const hari = d.getDate();
  const bulanIndex = d.getMonth();
  const tahun = d.getFullYear();
  const jam = d.getHours().toString().padStart(2, '0');
  const menit = d.getMinutes().toString().padStart(2, '0');
  
  return `${hari} ${bulan[bulanIndex]} ${tahun}, ${jam}:${menit} WIB`;
}

// Fungsi untuk mendapatkan nomor urut invoice
function getNextInvoiceNumber() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  return lastRow; // Menggunakan nomor baris sebagai nomor urut
}

function kirimwa(event) {
  // Destructuring data dari form
  const {
    'Nama Pelanggan': [nama],
    'Jenis Pembayaran': [jenisPembayaran],
    'Nominal Pembayaran': [nominal],
    'Bulan Pembayaran': [bulan],
    'Nomor Whatsapp': [whatsapp],
    'Timestamp': [timestamp]
  } = event.namedValues;

  // Dapatkan nomor urut invoice
  const nomorUrut = getNextInvoiceNumber().toString().padStart(3, '0');
  
  // Template pesan WhatsApp dengan formatting yang lebih baik
  const pesanTemplate = `
*KONFIRMASI PEMBAYARAN*
No. Invoice: INV/${new Date().getFullYear()}/${nomorUrut}

📅 Waktu: ${formatTanggal(timestamp)}
👤 Nama: ${nama}

*Detail Pembayaran*
📝 Jenis: ${jenisPembayaran}
💰 Nominal: Rp ${nominal}
📅 Periode: ${bulan}

Status: ✅ BERHASIL DITERIMA

===============================
Terimakasih atas pembayaran Anda! 🙏
Semoga sehat selalu dan sukses! 💪

_Pesan ini dikirim otomatis_
  `.trim();

  // Prepare data untuk API
  const data = {
    api_key: CONFIG.API_KEY,
    sender: CONFIG.SENDER_NUMBER,
    number: whatsapp,
    message: pesanTemplate
  };

  // Konfigurasi request
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data)
  };

  try {
    // Kirim request ke API
    const response = UrlFetchApp.fetch(CONFIG.API_URL, options);
    Logger.log(`Pesan berhasil dikirim ke ${whatsapp}`);
    Logger.log(response.getContentText());
    return true;
  } catch (error) {
    Logger.log(`Error saat mengirim pesan: ${error.toString()}`);
    return false;
  }
}
