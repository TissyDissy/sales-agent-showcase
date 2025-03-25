// 頁面加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 添加導航欄滾動效果
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled', 'shadow-sm');
            } else {
                navbar.classList.remove('navbar-scrolled', 'shadow-sm');
            }
        });
    }
    
    // 添加滾動監聽，為進入視口的元素添加動畫
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .feature-icon, .display-5, .lead');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // 初始加載時執行一次
    animateOnScroll();
    
    // 滾動時執行
    window.addEventListener('scroll', animateOnScroll);
    
    // 導航欄點擊滾動
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 若鏈接指向頁面內部錨點
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 計算滾動位置，考慮導航欄高度
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 更新活動鏈接
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // 捲動時更新活動鏈接
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 10;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 模擬demo加載
    const demoVideo = document.querySelector('#demo iframe');
    if (demoVideo) {
        // 假設我們有一個加載指示器
        const loadingIndicator = document.createElement('div');
        loadingIndicator.classList.add('loading-indicator');
        loadingIndicator.innerText = '影片載入中...';
        demoVideo.parentNode.appendChild(loadingIndicator);
        
        // 模擬加載完成
        setTimeout(() => {
            loadingIndicator.remove();
        }, 1500);
    }
});