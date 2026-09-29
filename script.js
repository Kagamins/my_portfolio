
    // Mobile navigation drawer toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      
      // Close mobile menu on clicking any navigation link
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    // Recommendation elements
    const recForm = document.getElementById('recommendation-form');
    const recContainer = document.getElementById('recommendations-container');
    const confirmationModal = document.getElementById('confirmation-modal');
    const modalCard = document.getElementById('modal-card');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    /**
     * Shows confirmation popup modal strictly when recommendation is submitted
     */
    function showPopup() {
      confirmationModal.classList.remove('hidden');
      setTimeout(() => {
        modalCard.classList.remove('scale-95');
        modalCard.classList.add('scale-100');
      }, 10);
    }

    /**
     * Hides confirmation popup modal
     */
    function hidePopup() {
      modalCard.classList.remove('scale-100');
      modalCard.classList.add('scale-95');
      setTimeout(() => {
        confirmationModal.classList.add('hidden');
      }, 150);
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', hidePopup);
    }

    // Close modal if user clicks outside of modal container
    window.addEventListener('click', (e) => {
      if (e.target === confirmationModal) {
        hidePopup();
      }
    });

    // Handle Recommendation Form Submission
    if (recForm) {
      recForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Retrieve and trim form input values
        const nameInput = document.getElementById('rec-name');
        const designationInput = document.getElementById('rec-designation');
        const messageInput = document.getElementById('rec-message');

        const name = nameInput.value.trim();
        const designation = designationInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !designation || !message) {
          return;
        }

        // Create new recommendation card element
        const newCard = document.createElement('div');
        newCard.className = 'recommendation-card card-transition bg-slate-50 border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between shadow-sm animate-fade-in';
        
        // Escape HTML to prevent injection
        const escapeHTML = (str) => {
          return str.replace(/[&<>'"]/g, 
            tag => ({
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&#39;',
              '"': '&quot;'
            }[tag] || tag)
          );
        };

        newCard.innerHTML = `
          <div class="mb-4">
            <i class="fa-solid fa-quote-left text-brand-500 text-2xl mb-3 block opacity-60"></i>
            <p class="text-slate-700 italic text-sm leading-relaxed">
              "${escapeHTML(message)}"
            </p>
          </div>
          <div class="pt-4 border-t border-slate-200/80">
            <h4 class="font-bold text-slate-900 text-base">${escapeHTML(name)}</h4>
            <p class="text-xs text-brand-600 font-medium">${escapeHTML(designation)}</p>
          </div>
        `;

        // Append the new recommendation card to the list
        recContainer.appendChild(newCard);

        // Reset the form fields
        recForm.reset();

        // Show the popup confirmation modal
        showPopup();

        // Smooth scroll to the newly appended recommendation
        newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
   
  