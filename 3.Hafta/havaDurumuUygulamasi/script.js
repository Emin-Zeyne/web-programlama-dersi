const apikey = "4efa9a0570bb6b6425646721a897789d";
const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}`;

async function lokasyonBilgisi(city) {
  try {
    const resp = await fetch(url(city));
    if (!resp.ok) {
      console.error("HTTP error:", resp.status, resp.statusText);
      return uyariMesaji(`${city} için veri bulunamadı (HTTP ${resp.status})`);
    }
    const data = await resp.json();
    if (Number(data.cod) !== 200) {
      console.error("API hata:", data);
      return uyariMesaji(data.message || "Veri alınamadı.");
    }
    havaDurumuBilgisi(data);
  } catch (err) {
    console.error("Fetch hatası:", err);
    uyariMesaji("Ağ hatası. Konsolu kontrol et.");
  }
}

function havaDurumuBilgisi(data) {
  const temp = dereceCevirme(data.main.temp);
  const weather = document.createElement("div");
  weather.className = "weather";
  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="ikon" />
      ${temp}°C
    </h2>
    <div><small>${data.weather[0].main} - ${data.weather[0].description}</small></div>
    <p><strong>${data.name}, ${data.sys.country}</strong></p>
  `;
  main.innerHTML = "";
  main.appendChild(weather);
}

function dereceCevirme(K) {
  return Math.round(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value.trim();
  if (!city) return uyariMesaji("Lütfen bir konum girin.");
  lokasyonBilgisi(city);
});

function uyariMesaji(msg = "Konum bilgisi bulunmamaktadır !!!") {
  const notif = document.createElement("div");
  notif.className = "mesaj";
  notif.innerText = msg;
  container.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
  main.innerHTML = "";
}
