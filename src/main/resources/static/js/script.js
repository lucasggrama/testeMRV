document.addEventListener('DOMContentLoaded', function () {
    initIcons();
    
    filterLeads('INVITED');
    
    setupFilterButtons();
});

function initIcons() {
    const letraElements = document.querySelectorAll('#letra');
    letraElements.forEach(function (element) {
        const nomeElement = element.nextElementSibling;
        if (nomeElement && nomeElement.id === 'nome') {
            const firstName = nomeElement.textContent.trim();
            if (firstName.length > 0) {
                const primeiraLetra = firstName.charAt(0).toLowerCase();
                element.classList.add('fa-' + primeiraLetra);
            }
        }
    });
}

function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

function atualizarListaLeads() {
    fetch('/listLeads')
        .then(response => response.json())
        .then(leads => {
            const leadsContainer = document.getElementById('leadsContainer');
            leadsContainer.innerHTML = '';

            leads.forEach(lead => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';

                const card = document.createElement('div');
                card.className = 'card lead-card h-100';
                card.setAttribute('data-status', lead.status);

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const title = document.createElement('h5');
                title.className = 'card-title';
                
                const icon = document.createElement('i');
                icon.id = 'letra';
                icon.className = 'fa-solid';
                if (lead.firstName && lead.firstName.length > 0) {
                    icon.classList.add('fa-' + lead.firstName.charAt(0).toLowerCase());
                }
                title.appendChild(icon);
                
                const firstNameSpan = document.createElement('span');
                firstNameSpan.id = 'nome';
                firstNameSpan.textContent = lead.firstName;
                title.appendChild(firstNameSpan);
                
                title.appendChild(document.createTextNode(' '));
                
                const lastNameSpan = document.createElement('span');
                lastNameSpan.className = 'accepted';
                lastNameSpan.textContent = lead.lastName;
                title.appendChild(lastNameSpan);

                const ul = document.createElement('ul');
                ul.className = 'list-unstyled';
                ul.id = 'listaLeads';

                const addListItem = (text, className = '') => {
                    const li = document.createElement('li');
                    if (className) li.className = className;
                    li.textContent = text;
                    ul.appendChild(li);
                    return li;
                };
                const dateLi = document.createElement('li');
                dateLi.textContent = 'Data: ';
                const dateSpan = document.createElement('span');
                dateSpan.textContent = new Date(lead.dateCreated).toLocaleDateString('pt-BR');
                dateLi.appendChild(dateSpan);
                ul.appendChild(dateLi);
                addListItem(`Email: ${lead.email}`, 'accepted');
                addListItem(`Telefone: ${lead.phone}`, 'accepted');
                const listMiddle = document.createElement('div');
                listMiddle.className = 'list-middle';
                const locationLi = document.createElement('li');
                const locationIcon = document.createElement('i');
                locationIcon.className = 'fa-solid fa-location-dot';
                locationLi.appendChild(locationIcon);
                locationLi.appendChild(document.createTextNode(' ' + lead.suburb));
                listMiddle.appendChild(locationLi);
                const categoryLi = document.createElement('li');
                const categoryIcon = document.createElement('i');
                categoryIcon.className = 'fa-solid fa-briefcase';
                categoryLi.appendChild(categoryIcon);
                categoryLi.appendChild(document.createTextNode(' ' + lead.category));
                listMiddle.appendChild(categoryLi);
                const idLi = document.createElement('li');
                idLi.innerHTML = `ID: <span>${lead.id}</span>`;
                listMiddle.appendChild(idLi);
                ul.appendChild(listMiddle);
                addListItem(`Descrição: ${lead.description}`);
                const priceLi = document.createElement('li');
                priceLi.id = 'preco';
                priceLi.innerHTML = `Preço: <span data-original-price="${lead.price}">${lead.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>`;
                ul.appendChild(priceLi);
                const buttonsDiv = document.createElement('div');
                buttonsDiv.id = 'btns';

                if (lead.status === 'INVITED') {
                    const acceptBtn = document.createElement('button');
                    acceptBtn.className = 'btn btn-success invited';
                    acceptBtn.textContent = 'Accept';
                    acceptBtn.onclick = function() { acceptLead(this, lead.id); };

                    const declineBtn = document.createElement('button');
                    declineBtn.className = 'btn btn-danger invited';
                    declineBtn.textContent = 'Decline';
                    declineBtn.onclick = function() { declineLead(this, lead.id); };

                    buttonsDiv.appendChild(acceptBtn);
                    buttonsDiv.appendChild(declineBtn);
                }

                ul.appendChild(buttonsDiv);

                cardBody.appendChild(title);
                cardBody.appendChild(ul);
                card.appendChild(cardBody);
                col.appendChild(card);

                leadsContainer.appendChild(col);
            });

            const activeFilter = document.querySelector('.filter-btn.selected')?.getAttribute('onclick')?.match(/filterLeads\('(.+)'\)/)?.[1] || 'INVITED';
            filterLeads(activeFilter);
            
            initIcons();
        })
        .catch(error => console.error('Erro ao atualizar a lista de leads:', error));
}

function filterLeads(status) {
    const cards = document.querySelectorAll('.lead-card');
    cards.forEach(card => {
        const leadStatus = card.getAttribute('data-status');
        const invitedElements = card.querySelectorAll('.invited');
        const acceptedElements = card.querySelectorAll('.accepted');

        if (status === 'ALL') {
            card.style.display = '';
            invitedElements.forEach(el => el.style.display = '');
            acceptedElements.forEach(el => el.style.display = '');
        } else if (status === 'INVITED') {
            card.style.display = leadStatus === 'INVITED' ? '' : 'none';
            invitedElements.forEach(el => el.style.display = '');
            acceptedElements.forEach(el => el.style.display = 'none');
        } else if (status === 'ACCEPTED') {
            if (leadStatus === 'ACCEPTED') {
                card.style.display = '';
                invitedElements.forEach(el => el.style.display = 'none');
                acceptedElements.forEach(el => el.style.display = '');
                
                const priceElement = card.querySelector('#preco span');
                if (priceElement) {
                    const originalPrice = parseFloat(priceElement.getAttribute('data-original-price'));
                    if (!isNaN(originalPrice)) {
                        priceElement.textContent = originalPrice.toLocaleString('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                        });
                    }
                }
            } else {
                card.style.display = 'none';
            }
        } else {
            card.style.display = 'none';
        }
    });
}

function acceptLead(button, leadId) {
    fetch(`/leads/accept/${leadId}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao aceitar o lead.');
        return response.json();
    })
    .then(updatedLead => {
        const card = button.closest('.lead-card');
        card.setAttribute('data-status', 'ACCEPTED');
        
        const priceElement = card.querySelector('#preco span');
        if (priceElement) {
            priceElement.textContent = updatedLead.price.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            });
            priceElement.setAttribute('data-original-price', updatedLead.price);
        }
        
        card.querySelectorAll('.invited').forEach(el => el.style.display = 'none');
        card.querySelectorAll('.accepted').forEach(el => el.style.display = '');
        
        const buttonsDiv = card.querySelector('#btns');
        if (buttonsDiv) buttonsDiv.remove();
        
        const activeFilter = document.querySelector('.filter-btn.selected')?.getAttribute('onclick')?.match(/filterLeads\('(.+)'\)/)?.[1] || 'INVITED';
        filterLeads(activeFilter);
    })
    .catch(error => {
        console.error('Erro ao aceitar lead:', error);
        alert('Não foi possível aceitar o lead. Tente novamente.');
    });
}

function declineLead(button, leadId) {
    fetch(`/leads/decline/${leadId}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao recusar o lead.');
        return response.json();
    })
    .then(() => {
        button.closest('.col-md-4').remove();
    })
    .catch(error => {
        console.error('Erro ao recusar lead:', error);
        alert('Não foi possível recusar o lead. Tente novamente.');
    });
}