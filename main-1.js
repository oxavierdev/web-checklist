/* ===================================
   AutoCheck Pro - JavaScript
   Sistema de Gestão para Oficinas
   =================================== */

// ==========================================
// FUNÇÕES DE MODAL
// ==========================================

/**
 * Abre o modal de login
 */
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

/**
 * Fecha o modal de login
 */
function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

/**
 * Abre o modal de nova ordem de serviço
 */
function openNewOrderModal() {
    document.getElementById('newOrderModal').classList.add('active');
}

/**
 * Fecha o modal de nova ordem de serviço
 */
function closeNewOrderModal() {
    document.getElementById('newOrderModal').classList.remove('active');
}

// ==========================================
// FUNÇÕES DE AUTENTICAÇÃO
// ==========================================

/**
 * Processa o login do usuário
 * @param {Event} event - Evento do formulário
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validação básica
    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Simulação de login (em produção, fazer requisição real para API)
    // TODO: Implementar autenticação real com backend
    if (email && password) {
        // Fecha o modal de login
        closeLoginModal();
        
        // Esconde a landing page
        document.getElementById('landingPage').classList.add('hidden');
        
        // Mostra o dashboard
        document.getElementById('dashboard').classList.add('active');
        
        // Armazena sessão (simulado)
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
    }
}

/**
 * Processa o logout do usuário
 */
function handleLogout() {
    // Confirmação de logout
    if (confirm('Deseja realmente sair do sistema?')) {
        // Remove o dashboard
        document.getElementById('dashboard').classList.remove('active');
        
        // Mostra a landing page
        document.getElementById('landingPage').classList.remove('hidden');
        
        // Limpa a sessão
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail');
    }
}

// ==========================================
// FUNÇÕES DE ORDEM DE SERVIÇO
// ==========================================

/**
 * Cria uma nova ordem de serviço
 * @param {Event} event - Evento do formulário
 */
function handleNewOrder(event) {
    event.preventDefault();
    
    // Coleta os dados do formulário
    const formData = new FormData(event.target);
    const orderData = {
        placa: formData.get('placa'),
        modelo: formData.get('modelo'),
        cliente: formData.get('cliente'),
        telefone: formData.get('telefone'),
        descricao: formData.get('descricao'),
        valor: formData.get('valor'),
        data: new Date().toISOString()
    };
    
    // TODO: Enviar dados para o backend
    console.log('Nova ordem de serviço:', orderData);
    
    // Feedback para o usuário
    alert('Ordem de serviço criada com sucesso!');
    
    // Fecha o modal
    closeNewOrderModal();
    
    // Limpa o formulário
    event.target.reset();
    
    // TODO: Atualizar a lista de ordens de serviço na tela
}

// ==========================================
// EVENT LISTENERS
// ==========================================

/**
 * Fecha modais ao clicar fora deles
 */
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const newOrderModal = document.getElementById('newOrderModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    
    if (event.target === newOrderModal) {
        closeNewOrderModal();
    }
}

/**
 * Verifica se usuário já está logado ao carregar a página
 */
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        // Usuário já está logado, mostra o dashboard
        document.getElementById('landingPage').classList.add('hidden');
        document.getElementById('dashboard').classList.add('active');
    }
});

/**
 * Previne fechamento acidental da página com dados não salvos
 */
window.addEventListener('beforeunload', function(event) {
    const newOrderModal = document.getElementById('newOrderModal');
    
    if (newOrderModal.classList.contains('active')) {
        event.preventDefault();
        event.returnValue = '';
    }
});

// ==========================================
// FUNÇÕES UTILITÁRIAS
// ==========================================

/**
 * Formata valor monetário
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formata telefone
 * @param {string} phone - Telefone a ser formatado
 * @returns {string} Telefone formatado
 */
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return phone;
}

/**
 * Formata placa de veículo
 * @param {string} plate - Placa a ser formatada
 * @returns {string} Placa formatada
 */
function formatPlate(plate) {
    const cleaned = plate.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    const match = cleaned.match(/^([A-Z]{3})(\d{1}[A-Z0-9]{1}\d{2})$/);
    
    if (match) {
        return `${match[1]}-${match[2]}`;
    }
    
    return plate.toUpperCase();
}

// ==========================================
// EXPORTAÇÕES (para uso em módulos)
// ==========================================

// Se estiver usando módulos ES6, descomente as linhas abaixo:
// export { openLoginModal, closeLoginModal, handleLogin, handleLogout };
// export { openNewOrderModal, closeNewOrderModal, handleNewOrder };
// export { formatCurrency, formatPhone, formatPlate };
