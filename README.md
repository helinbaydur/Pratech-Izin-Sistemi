# Pratech İzin Yönetim Sistemi 

Bu proje, **Pratech** staj başvuru süreci kapsamında geliştirilmiş; Personel ve Yönetici rollerini ayıran, veri kalıcılığına ve kullanıcı deneyimine (UX) odaklanan **Fullstack** bir izin yönetim uygulamasıdır.

## Proje Özellikleri

- **Çift Panelli Yapı:** Personel için talep oluşturma, Yönetici için onay/red mekanizması.
- **Veri Kalıcılığı (Persistence):** Veriler `veritabani.json` dosyası üzerinde saklanır; sunucu kapansa dahi veriler kaybolmaz.
- **Akıllı Oturum Yönetimi:** `localStorage` kullanımı sayesinde sayfa yenilense bile kullanıcı bulunduğu panelden atılmaz.
- **İş Kuralları (Business Logic):** - Geçmiş tarihlere izin girişi engellenmiştir.
  - Başlangıç ve bitiş tarihlerinin aynı olması engellenmiştir.
  - İzin gün sayısı tarih seçimine göre anlık hesaplanır.
- **Modern UI:** Tailwind CSS ile tasarlanmış, temiz ve kurumsal arayüz.

## Teknik Yığın (Tech Stack)

- **Backend:** Python, FastAPI
- **Frontend:** HTML5, JavaScript (Vanilla JS), Tailwind CSS
- **Veri Yapısı:** JSON
- **Sunucu:** Uvicorn

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda ayağa kaldırmak için şu adımları izleyebilirsiniz:

1. **Gerekli Kütüphaneleri Yükleyin:**
   ```bash
   pip install -r requirements.txt

2. **Backend Sunucusunu Başlatın:**
    ```bash
   uvicorn main:app --reload
3. **Uygulamayı Açın:**
   index.html dosyasını tarayıcınızda açarak kullanmaya başlayabilirsiniz.

**Kullanım Bilgileri**
  - Yönetici Giriş Parolası: admin123
  - Backend Adresi: http://127.0.0.1:8000


**Proje Yapısı**
  - main.py: FastAPI API Endpointleri ve İş Mantığı
  - index.html: Uygulamanın HTML İskeleti
  - style.css: Tailwind Custom Sınıfları ve Tasarım
  - script.js: API Haberleşmesi ve DOM Yönetimi
  - requirements.txt: Bağımlılık Listesi
  - veritabani.json: Kalıcı Veri Saklama Dosyası
