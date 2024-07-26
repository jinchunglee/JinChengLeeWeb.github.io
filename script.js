// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 檢查 URL 是否包含錨點
    if (window.location.hash) {
        // 如果有錨點，等待一小段時間後滾動到該位置
        setTimeout(function() {
            var id = window.location.hash.substring(1);
            var element = document.getElementById(id);
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
});