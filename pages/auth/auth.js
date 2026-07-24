const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const guestBtn = document.getElementById('guestBtn');

function completeAuth(name, email, isAdmin = false) {
    const userData = { 
        name: name, 
        email: email,
        isAdmin: isAdmin,
        isGuest: false,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('qarar_user', JSON.stringify(userData));
    
    if (isAdmin) {
        window.location.href = '../../admin.html';
    } else {
        window.location.href = '../home/home.html';
    }
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = document.getElementById('loginIdentifier').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        
        // التحقق من الأدمن
        if (identifier === 'admin@qarar.eg' && password === 'admin123') {
            completeAuth('مدير النظام', identifier, true);
        } else {
            // مستخدم عادي
            const userName = identifier.split('@')[0] || 'مستخدم';
            completeAuth(userName, identifier, false);
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('fullName').value.trim() || 'مستخدم';
        const identifier = document.getElementById('signupIdentifier').value.trim();
        completeAuth(name, identifier, false);
    });
}

if (guestBtn) {
    guestBtn.addEventListener('click', () => {
        localStorage.setItem('qarar_user', JSON.stringify({ 
            name: 'زائر', 
            isGuest: true 
        }));
        window.location.href = '../home/home.html';
    });
}
