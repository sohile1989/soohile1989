document.getElementById('getLocation').addEventListener('click', function() {
    const status = document.getElementById('status');

    // Check if Geolocation is supported
    if (navigator.geolocation) {
        status.textContent = 'در حال دریافت مکان شما...';

        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                status.textContent = `مکان شما دریافت شد: Latitude: ${latitude}, Longitude: ${longitude}`;

                // Send location data to the server
                fetch('https://your-server-endpoint.com/save-location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ latitude, longitude })
                }).then(response => {
                    if (response.ok) {
                        status.textContent += ' (مکان شما ارسال شد)';
                    } else {
                        status.textContent += ' (ارسال مکان به سرور ناموفق بود)';
                    }
                }).catch(error => {
                    status.textContent += ' (خطا در ارتباط با سرور)';
                });
            },
            function(error) {
                status.textContent = 'خطا در دریافت مکان.';
            }
        );
    } else {
        status.textContent = 'مرورگر شما از مکان‌یابی پشتیبانی نمی‌کند.';
    }
});
