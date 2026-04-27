# Pratech İzin Yönetim Sistemi 🚀

Bu proje, **Pratech** staj başvuru süreci kapsamında geliştirilmiş, 3 farklı kullanıcı deneyimi sunan (Giriş, Personel, Yönetici) bir **Fullstack İzin Yönetim Sistemi** prototipidir.

## 📋 Proje Özellikleri

- **Personel Paneli:** İzin türü seçimi, açıklama alanı ve tarih kısıtlamalarıyla (geçmiş tarih engeli) talep oluşturma.
- **Yönetici Paneli:** Şifreli giriş, bekleyen talepleri görüntüleme, onaylama veya reddetme fonksiyonları.
- **Veri Kalıcılığı:** Veriler RAM üzerinde değil, `veritabani.json` dosyası üzerinde kalıcı olarak saklanır.
- **Modern Arayüz:** Tailwind CSS ile tasarlanmış, duyarlı (responsive) ve kullanıcı dostu arayüz.
- **Güvenlik:** API seviyesinde admin anahtarı (Secret Key) kontrolü ve `localStorage` tabanlı oturum yönetimi.

## 🛠️ Kullanılan Teknolojiler

- **Backend:** Python, FastAPI, Pydantic
- **Frontend:** HTML5, JavaScript (ES6+), Tailwind CSS
- **Veri Saklama:** JSON (File System)
- **Sunucu:** Uvicorn

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. **Depoyu klonlayın:**
   ```bash
   git clone [https://github.com/kullanici-adiniz/pratech-izin-sistemi.git](https://github.com/kullanici-adiniz/pratech-izin-sistemi.git)
   cd pratech-izin-sistemi
