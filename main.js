document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FAQ Accordion
    document.querySelectorAll('.q button').forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            parent.classList.toggle('open');
        });
    });

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // CRITICAL FIX: Remove transform after animation so it doesn't trap the card in a CSS stacking context
                setTimeout(() => {
                    entry.target.style.transform = 'none';
                }, 850); 

                revealObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

        // 3. Hero Glass Card WhatsApp Integration
    const submitBtn = document.getElementById('whatsappBtn');
    const textArea = document.getElementById('aiPrompt');
    
    if (submitBtn && textArea) {
        submitBtn.addEventListener('click', () => {
            const userThoughts = textArea.value.trim();
            
            if (userThoughts !== "") {
                // Encode the text so it can be safely put in a URL
                const encodedText = encodeURIComponent(`Hi ShopSteward, here are my thoughts for my shop plan:\n\n"${userThoughts}"`);
                const whatsappUrl = `https://wa.me/918637560557?text=${encodedText}`;
                
                // Visual feedback
                submitBtn.innerHTML = '✓';
                submitBtn.style.background = 'var(--green-btn)';
                
                // Redirect to WhatsApp after a tiny delay
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    
                    // Reset button and text area
                    textArea.value = '';
                    submitBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`;
                    submitBtn.style.background = 'rgba(255,255,255,0.15)';
                }, 800);
            } else {
                // Shake the input if empty
                textArea.style.transform = 'translateX(-5px)';
                textArea.style.borderColor = '#ef4444';
                setTimeout(() => textArea.style.transform = 'translateX(5px)', 100);
                setTimeout(() => textArea.style.transform = 'translateX(0)', 200);
                setTimeout(() => textArea.style.borderColor = 'rgba(255,255,255,0.1)', 1000);
            }
        });
    }

    // 4. Number Spinner Animation
    const spinTargets = document.querySelectorAll('.spin-target');
    const spinObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const duration = 1500;
                const stepTime = 30;
                const steps = duration / stepTime;
                const increment = target / steps;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, stepTime);
                
                spinObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    spinTargets.forEach(el => spinObserver.observe(el));
    
    // 5. Copy credentials helper
    window.copyText = async function(id, btn) {
        const text = document.getElementById(id).textContent;
        try {
            await navigator.clipboard.writeText(text);
            const originalText = btn.textContent;
            btn.textContent = 'COPIED ✓';
            setTimeout(() => btn.textContent = originalText, 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };
});

// 6. Modal Logic
window.openModal = function(id) {
    const modalId = id === 'terms' ? 'termsModal' : (id === 'privacy' ? 'privacyModal' : 'refundModal');
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.openDomainModal = function(name, price) {
    const modal = document.getElementById('domainModal');
    document.getElementById('modalDomainName').textContent = name;
    document.getElementById('modalDomainPrice').textContent = price;
    
    const waText = encodeURIComponent(`Hi, I want to order the ${name} for my shop. The price is ${price}. Please assist me with the setup.`);
    document.getElementById('modalWhatsappBtn').href = `https://wa.me/918637560557?text=${waText}`;
    
    const mailSubject = encodeURIComponent(`Domain Order: ${name}`);
    const mailBody = encodeURIComponent(`Hi ShopSteward,\n\nI am interested in ordering the ${name} for my shop.\nDetails: ${price}\n\nPlease share the next steps.`);
    modal.querySelector('.btn-secondary').href = `mailto:shopsteward.in@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});
