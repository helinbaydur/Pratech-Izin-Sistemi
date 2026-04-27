const API = "http://127.0.0.1:8000";

// SAYFA YÜKLENDİĞİNDE OTURUMU KONTROL ET
window.onload = () => {
    const savedScreen = localStorage.getItem('currentScreen');
    if (savedScreen) {
        switchScreen(savedScreen, true);
    }
};

// EKRAN DEĞİŞTİRME FONKSİYONU
function switchScreen(s, isAuto = false) {
    document.querySelectorAll('body > div').forEach(div => div.classList.add('hidden'));
    
    if (s === 'yonetici' && !isAuto) {
        const pass = prompt("Yönetici Parolası:");
        if (pass === "admin123") {
            localStorage.setItem('admin_token', "pratech_admin_2026");
            localStorage.setItem('currentScreen', 'yonetici');
            document.getElementById('screenYonetici').classList.remove('hidden');
            load();
        } else { 
            alert("Yetkisiz!"); 
            switchScreen('login');
        }
    } else {
        localStorage.setItem('currentScreen', s);
        const targetId = 'screen' + s.charAt(0).toUpperCase() + s.slice(1);
        const element = document.getElementById(targetId);
        if (element) {
            element.classList.remove('hidden');
        }
        if(s === 'yonetici') load();
    }
}

// ÇIKIŞ YAPMA
function logout() {
    localStorage.clear();
    location.reload();
}

// GÜN SAYISI HESAPLAMA
function calc() {
    const b = document.getElementById('baslangic').value;
    const s = document.getElementById('bitis').value;
    if(b && s) { 
        const g = (new Date(s) - new Date(b)) / 86400000;
        document.getElementById('gun').innerText = g > 0 ? g + " GÜN" : "HATA";
    }
}

// FORM GÖNDERME (İZİN TALEBİ)
document.getElementById('izinForm').onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/izin-talep`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ad_soyad: document.getElementById('ad_soyad').value,
            izin_turu: document.getElementById('izin_turu').value,
            baslangic_tarihi: document.getElementById('baslangic').value,
            bitis_tarihi: document.getElementById('bitis').value,
            aciklama: document.getElementById('aciklama').value
        })
    });
    
    if (res.ok) { 
        alert("Başarılı!"); 
        e.target.reset(); 
        document.getElementById('gun').innerText = "0 GÜN"; 
    }
};

// VERİLERİ LİSTELEME (YÖNETİCİ)
async function load() {
    try {
        const res = await fetch(`${API}/izinler`);
        const data = await res.json();
        document.getElementById('cnt').innerText = data.length + " TALEP";
        const list = document.getElementById('list');
        
        list.innerHTML = data.reverse().map(i => `
            <tr class="hover:bg-slate-50 transition-all group">
                <td class="p-6 font-medium">
                    <div class="font-black text-slate-800 text-sm">${i.ad_soyad}</div>
                    <div class="text-[10px] text-slate-400 mt-1">"${i.aciklama}"</div>
                </td>
                <td class="p-6 text-[11px] font-bold text-slate-600 uppercase">
                    ${i.izin_turu}<br>
                    <span class="text-blue-600 font-black">${i.gun_sayisi} GÜN</span>
                </td>
                <td class="p-6 text-center">
                    <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${
                        i.durum === 'Onaylandı' ? 'bg-emerald-100 text-emerald-700' : 
                        i.durum === 'Reddedildi' ? 'bg-rose-100 text-rose-700' : 
                        'bg-amber-100 text-amber-700'
                    }">${i.durum}</span>
                </td>
                <td class="p-6 text-right space-x-3">
                    <button type="button" onclick="upd(event, '${i.id}', 'Onaylandı')" class="text-emerald-500 font-black text-[10px] uppercase opacity-0 group-hover:opacity-100">ONAYLA</button>
                    <button type="button" onclick="upd(event, '${i.id}', 'Reddedildi')" class="text-rose-400 font-black text-[10px] uppercase opacity-0 group-hover:opacity-100">REDDET</button>
                </td>
            </tr>`).join('');
    } catch (err) { 
        console.error("Veri yüklenirken hata:", err); 
    }
}

// DURUM GÜNCELLEME (ONAY/RET)
async function upd(e, id, status) {
    if(e) e.preventDefault();
    const token = localStorage.getItem('admin_token');
    await fetch(`${API}/izin-durum/${id}?yeni_durum=${status}&key=${token}`, {
        method: 'PUT'
    });
    await load();
}