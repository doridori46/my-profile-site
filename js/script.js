// 타이핑 효과
const typingElement = document.getElementById('typing');
const roles = ['학생', '예비 개발자', '웹 탐험가'];
let currentRoleIndex = 0;
let isDeleting = false;
let currentText = '';
let charIndex = 0;

function typeEffect() {
    const currentRole = roles[currentRoleIndex];

    if (!isDeleting) {
        // 타이핑 중
        if (charIndex < currentRole.length) {
            currentText += currentRole[charIndex];
            typingElement.textContent = currentText;
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            // 현재 단어 타이핑 완료, 잠시 대기
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        }
    } else {
        // 지우는 중
        if (charIndex > 0) {
            currentText = currentRole.substring(0, charIndex - 1);
            typingElement.textContent = currentText;
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            // 현재 단어 완전히 삭제, 다음 단어로
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            currentText = '';
            charIndex = 0;
            setTimeout(typeEffect, 500);
        }
    }
}

// 페이지 로드 시 타이핑 효과 시작
window.addEventListener('load', () => {
    typeEffect();
});

// Navbar 스크롤 효과
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;

    if (lastScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer를 사용한 섹션 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// 모든 섹션에 옵저버 적용
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// 네비게이션 링크 활성화 효과
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // 외부 링크가 아니면 기본 동작 방지
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// 기기 감지 및 최적화
const isMobile = window.innerWidth <= 640;

// 모바일에서 성능 최적화
if (isMobile) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// 창 크기 변경 감시
window.addEventListener('resize', () => {
    // 반응형 조정 필요시 코드 추가
});

// 페이지 로드 완료 시
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 스로틀 함수 (스크롤 성능 개선)
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 이벤트 최적화
const optimizedScroll = throttle(() => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
}, 100);

window.addEventListener('scroll', optimizedScroll);

// 접근성 개선: 포커스 관리
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // ESC 키 처리 (필요시)
    }
});
