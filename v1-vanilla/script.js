document.addEventListener('DOMContentLoaded', () => {
    // Current year
    const yr = document.getElementById('current-year');
    if(yr) yr.textContent = new Date().getFullYear();

    // Fetch and Build UI
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateProfile(data.profile);
            populateLinks(data.links);
            
            // Re-initialize VanillaTilt dynamically if needed
            if(window.VanillaTilt) {
                VanillaTilt.init(document.querySelector(".glass-panel"));
            }
            
            // Avatar Modal Logic
            const avatarRing = document.querySelector('.avatar-ring');
            const modalOverlay = document.getElementById('avatar-modal');
            const modalImage = document.getElementById('modal-image');
            
            if (avatarRing && modalOverlay && modalImage) {
                avatarRing.addEventListener('click', () => {
                    const img = document.getElementById('avatar');
                    if(img) {
                        modalImage.src = img.src;
                        modalOverlay.classList.add('active');
                    }
                });
                modalOverlay.addEventListener('click', () => {
                    modalOverlay.classList.remove('active');
                });
            }

            requestAnimationFrame(() => initGSAPIntro());
        })
        .catch(err => console.error("Error loading data:", err));
});

function populateProfile(profile) {
    if (!profile) return;
    if (profile.name) document.getElementById('user-name').textContent = profile.name;
    if (profile.bio) document.getElementById('user-bio').textContent = profile.bio;
    if (profile.avatar) {
        const avatarImg = document.getElementById('avatar');
        avatarImg.src = profile.avatar;
    }
}

function populateLinks(links) {
    if (!links || links.length === 0) return;
    
    const container = document.getElementById('links-container');
    container.innerHTML = '';
    
    links.forEach((link) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'link-wrapper';
        
        const linkEl = document.createElement('a');
        linkEl.href = link.url;
        linkEl.className = 'link-btn';
        linkEl.target = '_blank';
        linkEl.rel = 'noopener noreferrer';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'btn-content';

        const iconEl = document.createElement('i');
        iconEl.className = `${link.icon} link-icon`;
        iconEl.setAttribute('aria-hidden', 'true');
        
        const textNode = document.createTextNode(link.name);
        
        contentDiv.appendChild(iconEl);
        contentDiv.appendChild(textNode);
        
        linkEl.appendChild(contentDiv);
        wrapper.appendChild(linkEl);
        container.appendChild(wrapper);
    });
}

function initGSAPIntro() {
    if(typeof gsap !== 'undefined'){
        const tl = gsap.timeline();
        
        // Neon-styled high-action GSAP reveal
        tl.to('.main-wrapper', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out"
        })
        .from('.avatar-ring', {
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)"
        }, "-=0.6")
        .from('#user-name, #user-bio', {
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4")
        .from('.divider', {
            scaleY: 0,
            opacity: 0,
            duration: 0.8,
            ease: "expo.inOut"
        }, "-=0.6")
        .fromTo('.link-btn', {
            x: 30,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4")
        .from('footer', {
            opacity: 0,
            duration: 0.8
        }, "-=0.2");
    }
}
