(function () {
    const matomoUrl = '//matomo.360demo.cloud/';
    console.log("INIT MATOMO");
    console.log("URL MATOMO", matomoUrl);
    // Fungsi untuk menghasilkan ID unik
    function generateUniqueId(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let result = '';

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    }

    // Inisialisasi Matomo tracker
    var _paq = (window._paq = window._paq || []);

    // Ambil atau buat user_id unik
    let userId = localStorage.getItem('user_id');
    if (!userId) {
      userId = generateUniqueId(15);
      localStorage.setItem('user_id', userId);
    }

    // Tetapkan user_id di Matomo
    _paq.push(['setUserId', userId]);

    // Metode tracker
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);

    // Konfigurasi Matomo tracker
    _paq.push(['setTrackerUrl', matomoUrl + 'matomo.php']);
    _paq.push(['setSiteId', '1']);

    // Tambahkan script Matomo secara dinamis ke halaman
    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = matomoUrl + 'matomo.js';

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(scriptElement, firstScript);
    console.log("DONE INIT MATOMO");
  })();