document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for sidebar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Support Form Handler
    const docForm = document.getElementById('docSupportForm');
    if (docForm) {
        docForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const topic = document.getElementById('topic').value;
            const topicText = document.getElementById('topic').options[document.getElementById('topic').selectedIndex].text;

            const btn = docForm.querySelector('button');
            const originalText = btn.innerHTML;

            if (!name) return;

            // Seller Phone Number
            const phoneNumber = '905555555555';

            // Construct Message
            let message = `Merhaba, ELM327 Dokümantasyon sayfasından ulaşıyorum.\n`;
            message += `İsim: ${name}\n`;
            message += `Konu: ${topicText}`;

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            // Loading interaction
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yönlendiriliyor...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                docForm.reset();
            }, 1000);
        });
    }
});
