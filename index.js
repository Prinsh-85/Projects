let navbar = document.querySelector('.navbar');
document.querySelector('#menu-bar').onclick=() =>{
    navbar.classList.toggle('active');
}

let search = document.querySelector('.search');
document.querySelector('#search').onclick=() =>{
    search.classList.toggle('active');
}

var swiper = new Swiper(".product-row", {
    spaceBetween: 30,
    loop:true,
    centeredSlides:true,
    autoplay:{
        delay:9500,
        disableOnInteraction:false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
var swiper = new Swiper(".blogs-row", {
    spaceBetween: 30,
    loop:true,
    centeredSlides:true,
    autoplay:{
        delay:9500,
        disableOnInteraction:false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation:{
        nextE1 :".swiper-button-next",
        prevE1 :".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
  });

  var swiper = new Swiper(".review-row", {
    spaceBetween: 30,
    loop:true,
    centeredSlides:true,
    autoplay:{
        delay:9500,
        disableOnInteraction:false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    } else {
        alert('Please enter a valid email address.');
    }
});
  
  document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const priceValue = document.getElementById('priceRange').value;
    const flavourValue = document.getElementById('flavour').value;
    const sizeValue = document.getElementById('size').value;

    const cakes = document.querySelectorAll('.cake-item');

    cakes.forEach(cake => {
      const price = parseInt(cake.getAttribute('data-price'));
      const flavour = cake.getAttribute('data-flavour');
      const size = cake.getAttribute('data-size');

      let show = true;

      if (priceValue !== 'all') {
        const [min, max] = priceValue.split('-').map(Number);
        if (price < min || price > max) show = false;
      }

      if (flavourValue !== 'all' && flavour !== flavourValue) {
        show = false;
      }

      if (sizeValue !== 'all' && size !== sizeValue) {
        show = false;
      }

      cake.style.display = show ? 'block' : 'none';
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fa);
});
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = this.querySelector('input').value;
  
  // Show the popup with the email
  document.getElementById('subscribedEmail').textContent = email;
  document.getElementById('subscribePopup').style.display = 'flex';
  
  // Here you would typically send the email to your server
  console.log('Subscribed email:', email);
  
  // Reset the form
  this.reset();
});

// Close popup handlers
document.querySelector('.popup-close').addEventListener('click', closePopup);
document.querySelector('.popup-button').addEventListener('click', closePopup);

// Close popup when clicking outside
document.getElementById('subscribePopup').addEventListener('click', function(e) {
  if (e.target === this) {
      closePopup();
  }
});

function closePopup() {
  document.getElementById('subscribePopup').style.display = 'none';
}


// WhatsApp Notification Function
function sendWhatsAppNotification(phoneNumber, message) {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Format with country code (India: 91)
    const formattedPhone = '91' + digitsOnly.slice(-10);
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappLink, '_blank');
}

// Form Submission Handler
document.getElementById('cakeOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        cake: this.elements.cake.value,
        quantity: this.elements.quantity.value,
        customer: this.elements.customer.value,
        phone: this.elements.phone.value,
        instructions: this.elements.instructions.value
    };
    
    // Validate phone number
    if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }
    
    // Prepare order details for display
    document.getElementById('orderDetails').innerHTML = `
        <p><strong>Cake:</strong> ${formData.cake}</p>
        <p><strong>Quantity:</strong> ${formData.quantity}</p>
        <p><strong>Customer:</strong> ${formData.customer}</p>
    `;
    
    // Show popup
    document.getElementById('orderConfirmation').style.display = 'block';
    
    // Create WhatsApp message
    const whatsappMessage = `*New Cake Order* 🎂\n\n` +
                           `*Customer:* ${formData.customer}\n` +
                           `*Cake:* ${formData.cake}\n` +
                           `*Quantity:* ${formData.quantity}\n` +
                           `*Special Instructions:* ${formData.instructions || 'None'}\n\n` +
                           `Thank you for your order! We'll contact you shortly.`;
    
    // Send WhatsApp notification
    setTimeout(() => {
        sendWhatsAppNotification(formData.phone, whatsappMessage);
    }, 1000);
    
    // Optional: Submit form data to your webhook
    fetch('https://hook.us2.make.com/m79gps59qlyrpwfovhdq6xmglvlmo0qu', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});

// Close modal when clicking X or OK button
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('orderConfirmation').style.display = 'none';
});

document.querySelector('.confirm-button').addEventListener('click', function() {
    document.getElementById('orderConfirmation').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('orderConfirmation')) {
        document.getElementById('orderConfirmation').style.display = 'none';
    }
});

// Close modal when clicking X or OK button
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('orderConfirmation').style.display = 'none';
});

document.querySelector('.confirm-button').addEventListener('click', function() {
    document.getElementById('orderConfirmation').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('orderConfirmation')) {
        document.getElementById('orderConfirmation').style.display = 'none';
    }
});
document.getElementById('filterToggle').addEventListener('click', function() {
  const popup = document.getElementById('filterPopup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
});

// Close popup when clicking X
document.querySelector('.close-popup').addEventListener('click', function() {
  document.getElementById('filterPopup').style.display = 'none';
});

// Close popup when clicking outside
document.addEventListener('click', function(event) {
  const popup = document.getElementById('filterPopup');
  const toggleBtn = document.getElementById('filterToggle');
  
  if (!popup.contains(event.target) && event.target !== toggleBtn) {
      popup.style.display = 'none';
  }
});

// Form submission
document.getElementById('filterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get filter values
  const priceRange = document.getElementById('priceRange').value;
  const flavour = document.getElementById('flavour').value;
  const size = document.getElementById('size').value;
  
  // Here you would typically filter your cake list
  console.log('Filters applied:', { priceRange, flavour, size });
  
  // Close popup after applying filters
  document.getElementById('filterPopup').style.display = 'none';
  
  // Show a brief notification
  showNotification('Filters applied successfully!');
});

// Reset form
document.getElementById('filterForm').addEventListener('reset', function() {
  // Here you would typically reset your cake list
  console.log('Filters reset');
  
  // Show a brief notification
  showNotification('Filters reset');
});

// Helper function to show notifications
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'filter-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
  }, 2000);
}

  const express = require('express');
  const mysql = require('mysql2');
  const cors = require('cors');
  
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // DB Connection
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'BaadShahDanger',
    password: 'Prinsh@854200',
    database: 'cake_shop'
  });
  
  db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
  });
  
  // Route to get cakes
  app.get('/cakes', (req, res) => {
    db.query('SELECT * FROM cakes', (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  
// index.js (frontend folder ka, jahan index.html hai)
fetch('http://localhost:3000/cakes')
  .then(response => response.json())
  .then(data => {
    console.log('🎂 Cakes:', data);

    // Example: DOM me show karna
    const cakeList = document.getElementById('cake-list');
    data.forEach(cake => {
      const li = document.createElement('li');
      li.textContent = `${cake.name} - ₹${cake.price}`;
      cakeList.appendChild(li);
    });
  })
  .catch(error => {
    console.error('❌ Error fetching cakes:', error);
  });
fetch('http://localhost:3000/cakes')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Data dekhne ke liye
    // HTML me show karne ka code yaha likhna hai
  })
  .catch(error => console.error('Error:', error));
