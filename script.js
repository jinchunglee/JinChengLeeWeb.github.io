// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 檢查 URL 是否包含錨點並平滑滾動
    if (window.location.hash) {
        setTimeout(function() {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({behavior: 'smooth'});
            }
        }, 0);
    }

    // 為所有內部鏈接添加平滑滾動效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 主題切換功能
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('class', currentTheme);
        if (currentTheme === 'dark-theme') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('class', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.documentElement.setAttribute('class', '');
            localStorage.setItem('theme', 'light-theme');
        }    
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    // 添加頁面載入動畫效果
    document.body.classList.add('fade-in');

    // 添加滾動監聽器實現導航欄固定效果
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        if (scrollTop === 0) {
            header.classList.remove('shadow');
        } else {
            header.classList.add('shadow');
        }
        
        lastScrollTop = scrollTop;
    });

    // 添加滾動進度條
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // 添加頁面載入時的元素動畫
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });
});