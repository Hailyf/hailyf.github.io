// Inicializar EmailJS
emailjs.init('00YDcnjPK0YXU0SgW');

// Variables globales
let cart = [];
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Manejar el envío del formulario de citas
document.getElementById('cita-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.querySelector('#cita-form button');
    btn.textContent = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_um9mepa'; // Reemplaza con el ID correcto de la plantilla para citas

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.textContent = 'Agendar Cita';
            alert('¡Cita agendada!');
            document.getElementById('cita-form').reset(); // Limpiar el formulario
        }, (err) => {
            btn.textContent = 'Agendar Cita';
            alert('Error: ' + JSON.stringify(err));
        });
});

// Manejar clic en agregar al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        // Agregar producto al carrito
        cart.push({ name: productName, price: productPrice });
        updateCart();
    });
});

// Actualizar el carrito
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="remove-from-cart" data-index="${index}">Eliminar</button>
        `;
        cartItems.appendChild(itemElement);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

// Mostrar el modal del carrito
document.getElementById('cart-icon').addEventListener('click', function() {
    cartModal.classList.remove('hidden');
});

// Cerrar el modal del carrito
document.getElementById('close-cart').addEventListener('click', function() {
    cartModal.classList.add('hidden');
});

// Manejar la eliminación de productos del carrito
cartItems.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-from-cart')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        cart.splice(index, 1);
        updateCart();
    }
});

// Proceder al pago
document.getElementById('checkout-button').addEventListener('click', function() {
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('total').value = cartTotal.textContent;
    document.getElementById('productos').value = JSON.stringify(cart);

    checkoutModal.classList.remove('hidden');
});

// Cerrar el modal de checkout
document.getElementById('close-checkout').addEventListener('click', function() {
    checkoutModal.classList.add('hidden');
});

// Manejar el envío del formulario de checkout
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.querySelector('#checkout-form button');
    btn.textContent = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_4robdkr'; 
    
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.textContent = 'Confirmar Compra';
            alert('¡Compra confirmada!');
            checkoutModal.classList.add('hidden');
            cart = [];
            updateCart();
        }, (err) => {
            btn.textContent = 'Confirmar Compra';
            alert('Error: ' + JSON.stringify(err));
        });
});



// Mostrar y ocultar secciones de navegación
document.getElementById('nav-citas').addEventListener('click', function() {
    document.getElementById('section-citas').classList.remove('hidden');
    document.getElementById('section-tienda').classList.add('hidden');
});

document.getElementById('nav-tienda').addEventListener('click', function() {
    document.getElementById('section-citas').classList.add('hidden');
    document.getElementById('section-tienda').classList.remove('hidden');
});

document.querySelector('#nav-citas').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('hidden');
}


// Función para alternar la visibilidad del menú móvil
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Función para mostrar un modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
}

// Función para ocultar un modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
}

// Añade eventos a los botones de cierre de los modales
document.getElementById('close-cart').addEventListener('click', function() {
    hideModal('cart-modal');
});

document.getElementById('close-checkout').addEventListener('click', function() {
    hideModal('checkout-modal');
});

// Manejo de eventos para el carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        addItemToCart(name, price);
    });
});



// JavaScript para manejar el menú móvil
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Cierra el menú al hacer clic en un enlace
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.remove('active');
    });
});




