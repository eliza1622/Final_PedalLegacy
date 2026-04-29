    const cebuCitiesRaw = ["Alcoy","Argao","Balamban","Bantayan","Barili","Carcar","Catmon","Cebu City","Consolacion","Cordova","Dalaguete","Danao City","Lapu-Lapu City","Liloan","Mandaue City","Minglanilla","Moalboal","Naga City","Oslob","Pinamungajan","San Fernando","San Remigio","Samboan","Santa Fe","Santander","Sogod","Talisay City","Toledo City"];
    
    function populateCityDropdowns() {
        const raceCity = document.getElementById('race-city');
        const regCity = document.getElementById('reg-city');
        function buildOptions(selectElement) {
            if(!selectElement) return;
            let html = '<option value="" disabled selected>City / Municipality *</option>';
            let currentLetter = '';
            cebuCitiesRaw.forEach(city => {
                let firstLetter = city.charAt(0).toUpperCase();
                if (firstLetter !== currentLetter) {
                    currentLetter = firstLetter;
                    // Gray, normal weight, normal size for letter headers
                    html += `<option disabled style="background: #1a1a1a; background-color: #1a1a1a; color:#aaaaaa; font-weight:500; font-size:13px;">${currentLetter}</option>`;
                }
                html += `<option value="${city}">${city}</option>`;
            });
            selectElement.innerHTML = html;
        }
        buildOptions(raceCity);
        buildOptions(regCity);
    }
    
    const allRaces = [
        {id:1, name:'Cebu Mountain Challenge', date:'May 10-12, 2026', location:'Busay', price:1500, prizePool:1000, img:'https://i.pinimg.com/736x/a1/bf/f1/a1bff1c89114bcd97f7622d8e91e0741.jpg', category:'All Categories (13–90)', minAge:13, maxAge:90},
        {id:2, name:'Mactan Coastal Classic', date:'June 5-7, 2026', location:'Mactan', price:900, prizePool:500, img:'https://i.pinimg.com/736x/2b/cc/7e/2bcc7e4abe22d81fa773a076c08c8fee.jpg', category:'All Categories (13–90)', minAge:13, maxAge:90},
        {id:3, name:'Danao Extreme Trail', date:'July 18-20, 2026', location:'Danao', price:2000, prizePool:3000, img:'https://i.pinimg.com/1200x/21/f3/6a/21f36aaae4bddc6f5143bbbecfcbb36a.jpg', category:'All Categories (13–90)', minAge:13, maxAge:90},
        {id:4, name:'Manipis Road', date:'Aug 22-24, 2027', location:'Talisay', price:1250, prizePool:2000, img:'https://i.pinimg.com/1200x/c6/50/6d/c6506d43b9eef2c2464c331d1d3aeb26.jpg', category:'All Categories (13–90)', minAge:13, maxAge:90},
        {id:5, name:'Southern Cebu Loop', date:'Sep 12-14, 2027', location:'South Cebu', price:1000, prizePool:200, img:'https://i.pinimg.com/1200x/82/de/8f/82de8f91ac5e4da320d4d59a8187db98.jpg', category:'All Categories (13–90)', minAge:13, maxAge:90},
        {id:6, name:'Spartan Trail', date:'Oct 3-5, 2027', location:'Banawa', price:3500, prizePool:2600, img:'https://i.pinimg.com/1200x/11/19/0a/11190a0d667ef0cf5e5ad79b0d537ff5.jpg', category:'All Categories (13–90)', minAge:13, maxAge:90}
    ];
    
    const cebuLocations = {"Cebu City":[10.3157,123.8854],"Mandaue City":[10.33,123.937],"Lapu-Lapu City":[10.3092,123.9491],"Talisay City":[10.2518,123.8468],"Danao City":[10.5208,123.9819],"Toledo City":[10.3775,123.6425],"Naga City":[10.2094,123.7572],"Consolacion":[10.3808,123.9575],"Liloan":[10.413,123.9746],"Minglanilla":[10.2406,123.7975],"San Fernando":[10.1622,123.7082],"Carcar":[10.1061,123.6407],"Dalaguete":[9.76,123.5349],"Moalboal":[9.947,123.3985],"Bantayan":[11.1685,123.7225],"Balamban":[10.5033,123.7156],"Argao":[9.8797,123.5959],"Oslob":[9.5537,123.4327],"Barili":[10.1172,123.5122],"Santander":[9.4193,123.3351],"Samboan":[9.5275,123.3081],"Catmon":[10.6725,123.96],"Sogod":[10.7508,124],"Cordova":[10.2442,123.9431],"San Remigio":[11.0098,123.9392],"Santa Fe":[11.1672,123.8064],"Pinamungajan":[10.253,123.5861],"Alcoy":[9.6998,123.5053]};
    let mapInitialized = false, currentUser = null, userRegistrations = [], pendingRace = null, paymentConfirmed = false, selectedPaymentMethod = 'Credit-Card';
    
    function initCebuMap() { if(mapInitialized) return; const map = L.map('trail-map',{minZoom:9,maxZoom:14}).setView([10.3157,123.8854],10); L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'&copy; Esri',maxZoom:18}).addTo(map); Object.entries(cebuLocations).forEach(([n,c])=>L.marker(c,{icon:L.divIcon({className:'crisp-label',html:n,iconSize:[null,null]}),interactive:false}).addTo(map)); mapInitialized=true; }
    
    const slideTexts = [
        "The vision pedal legacy is a dedicated cycling platform designed to unite the Cebu cycling community and elevate the local racing experience.",
        "Event discovery the system serves as a central hub where enthusiasts can easily discover premier cycling events and races across the region.",
        "Seamless registration athletes can manage their journey through a secure portal, allowing for quick registration and tracking of personal race records.",
        "Interactive trail maps the platform provides detailed, interactive trail maps and route information to ensure riders are well-prepared for every road and trail ahead.",
        "Essential rider info every race listing includes vital details such as specific categories, clear pricing, and safety guidelines to keep the community informed.",
        "Our commitment whether you are a professional competitor or a passionate hobbyist, Pedal Legacy is built to support your goals and help you leave your mark."
    ];
    let slides = document.querySelectorAll('#aboutus-carousel .carousel-slide'), currentSlide = 0;
    function updateCenterText(idx){ const td=document.getElementById('aboutus-text'); if(td && slideTexts[idx]){ const p=document.createElement('p'); p.textContent=slideTexts[idx]; td.textContent=''; td.appendChild(p); td.style.opacity='0'; setTimeout(()=>td.style.opacity='1',80); } }
    function showSlide(idx){ slides.forEach((s,i)=>s.classList.toggle('active',i===idx)); currentSlide=idx; updateCenterText(currentSlide); }
    function nextSlide(){ showSlide((currentSlide+1)%slides.length); }
    function prevSlide(){ showSlide((currentSlide-1+slides.length)%slides.length); }
    if(slides.length) showSlide(0);
    document.getElementById('carouselArrowLeft')?.addEventListener('click',()=>prevSlide());
    document.getElementById('carouselArrowRight')?.addEventListener('click',()=>nextSlide());
    
    function showSuccessToast(m){ let t=document.createElement('div'); t.className='success-toast'; t.innerHTML=`<i class="fas fa-check-circle"></i> ${m}`; document.body.appendChild(t); setTimeout(()=>t.remove(),3000); }
    function formatPrice(p){ return '₱'+p.toLocaleString(); }
    async function loadUserRegistrations(){
        if(!currentUser) return;
        try {
            const res = await fetch('api/get_registrations.php');
            const data = await res.json();
            if(data.success) userRegistrations = data.registrations;
        } catch(e) { console.error('Failed to load registrations', e); }
    }
    async function saveRegistration(d){
        const res = await fetch('api/save_registration.php', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(d)
        });
        return await res.json();
    }
    function makeRecordField(label, value){ const wrap=document.createElement('div'); wrap.className='record-item-field'; const lbl=document.createElement('span'); lbl.className='record-label'; lbl.textContent=label; const val=document.createElement('span'); val.className='record-value'; val.textContent=value; wrap.append(lbl,val); return wrap; }
    async function showRecordsModal(){
        await loadUserRegistrations();
        const div=document.getElementById('records-list');
        div.textContent='';
        if(!userRegistrations.length){
            const empty=document.createElement('div'); empty.className='no-records'; empty.textContent='No race registrations yet.'; div.appendChild(empty);
        } else {
            userRegistrations.forEach(reg=>{
                const grid=document.createElement('div'); grid.className='record-grid';
                const regDateTime=reg.registrationDateTime||'Unknown';
                [makeRecordField('Race',reg.raceName),makeRecordField('Category',reg.raceCategory||''),makeRecordField('Date',reg.raceDate),makeRecordField('Location',reg.raceLocation),makeRecordField('Reg Fee',formatPrice(reg.racePrice)),makeRecordField('Cash Prize',formatPrice(reg.prizePool||0)),makeRecordField('Payment Status',reg.paymentStatus||'unpaid'),makeRecordField('Payment Method',reg.paymentMethod||'Mock'),makeRecordField('Name',`${reg.firstName} ${reg.lastName}`),makeRecordField('Age/Gender',`${reg.age}/${reg.gender}`),makeRecordField('Contact',reg.phone),makeRecordField('Email',reg.email),makeRecordField('Address',`${reg.address}, ${reg.city}, Cebu`),makeRecordField('Emergency',`${reg.emergencyName} (${reg.emergencyNumber})`),makeRecordField('Bike',reg.bikeCategory),makeRecordField('Medical',reg.medicalConditions||'None'),makeRecordField('Registered On',regDateTime)].forEach(f=>grid.appendChild(f));
                div.appendChild(grid);
            });
        }
        document.getElementById('records-modal').classList.add('active');
    }
    function closeRegSuccessModal(){ document.getElementById('reg-success-modal').classList.remove('active'); }
    function openRegSuccessModal(reg){
        document.getElementById('reg-success-race-name').textContent = reg.raceName + ' — ' + reg.raceDate;
        const grid = document.getElementById('reg-success-grid');
        grid.innerHTML = '';
        const fields = [
            ['Name', reg.firstName + ' ' + reg.lastName],
            ['Category', reg.raceCategory],
            ['Location', reg.raceLocation],
            ['Bike', reg.bikeCategory],
            ['Reg Fee', formatPrice(reg.racePrice)],
            ['Cash Prize', formatPrice(reg.prizePool)],
            ['Payment', reg.paymentMethod],
            ['Status', reg.paymentStatus]
        ];
        fields.forEach(([label, value]) => {
            const field = document.createElement('div');
            field.className = 'reg-success-field';
            const lbl = document.createElement('span');
            lbl.className = 'reg-success-label';
            lbl.textContent = label;
            const val = document.createElement('span');
            if(label === 'Status'){
                val.innerHTML = `<span class="reg-success-badge"><i class="fas fa-check"></i> ${value}</span>`;
            } else {
                val.className = 'reg-success-value';
                val.textContent = value;
            }
            field.append(lbl, val);
            grid.appendChild(field);
        });
        document.getElementById('reg-success-modal').classList.add('active');
    }
    function closeRecordsModal(){ document.getElementById('records-modal').classList.remove('active'); }
    function closePrizeModal(){ document.getElementById('prize-info-modal').classList.remove('active'); }
    function closeRaceRegModal(){ document.getElementById('race-reg-modal').classList.remove('active'); }
    function updateUserDisplay(){ const displaySpan = document.getElementById('user-name-display'); if(currentUser && currentUser.firstname){ displaySpan.innerText = currentUser.firstname; } else { displaySpan.innerText = 'User'; } document.getElementById('note-icon').style.display=currentUser?'flex':'none'; if(currentUser) document.body.classList.add('logged-in'); else document.body.classList.remove('logged-in'); }
    async function logout(){
        await fetch('api/logout.php');
        currentUser = null;
        userRegistrations = [];
        updateUserDisplay();
        location.reload();
    }
    function openLoginModal(){ document.getElementById('login-modal').classList.add('active'); }
    function closeLoginModal(){ document.getElementById('login-modal').classList.remove('active'); }
    function openRegisterModal(){ document.getElementById('register-modal').classList.add('active'); }
    function closeRegisterModal(){ document.getElementById('register-modal').classList.remove('active'); }
    function switchToLoginFromRegister(){ closeRegisterModal(); openLoginModal(); }
    function switchToRegisterFromLogin(){ closeLoginModal(); openRegisterModal(); }
    function openRaceRegistration(race){ pendingRace=race; if(!currentUser){ openLoginModal(); return; } document.getElementById('prize-fee-display').innerHTML=formatPrice(race.price); document.getElementById('prize-pool-display').innerHTML=formatPrice(race.prizePool); document.getElementById('prize-info-modal').classList.add('active'); paymentConfirmed = false; selectedPaymentMethod = 'Credit-Card'; }
    function proceedToRegistrationForm(){ if(!pendingRace) return; document.getElementById('payment-amount-display').innerHTML=formatPrice(pendingRace.price); document.getElementById('payment-modal').classList.add('active'); closePrizeModal(); paymentConfirmed = false; selectedPaymentMethod = 'Credit-Card'; const defaultMethod = document.querySelector('input[name="payment-method"][value="Credit-Card"]'); if(defaultMethod) defaultMethod.checked = true; showPaymentForm('Credit-Card'); document.querySelectorAll('.payment-detail-form input').forEach(i => i.value = ''); }
    function showPaymentForm(method){
        document.querySelectorAll('.payment-detail-form').forEach(f => f.style.display = 'none');
        const target = document.getElementById('form-' + method);
        if(target) target.style.display = 'block';
    }
    function closePaymentModal(){ document.getElementById('payment-modal').classList.remove('active'); }
    function proceedToRaceRegistration(){
        if(!pendingRace) return;
        const selected = document.querySelector('input[name="payment-method"]:checked');
        selectedPaymentMethod = selected ? selected.value : 'Credit-Card';
        // Validate payment fields
        if(selectedPaymentMethod === 'Credit-Card'){
            const name = document.getElementById('cc-name').value.trim();
            const num = document.getElementById('cc-number').value.trim();
            const exp = document.getElementById('cc-expiry').value.trim();
            const cvv = document.getElementById('cc-cvv').value.trim();
            if(!name || !num || !exp || !cvv){ showSuccessToast('Please fill in all card details.'); return; }
            if(!/^\d{13,19}$/.test(num.replace(/\s/g,''))){ showSuccessToast('Invalid card number.'); return; }
            if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)){ showSuccessToast('Invalid expiry. Use MM/YY.'); return; }
            if(!/^\d{3}$/.test(cvv)){ showSuccessToast('Invalid CVV.'); return; }
        } else if(selectedPaymentMethod === 'GCash'){
            const name = document.getElementById('gcash-name').value.trim();
            const num = document.getElementById('gcash-number').value.trim();
            if(!name || !num){ showSuccessToast('Please fill in all GCash details.'); return; }
            if(!/^09\d{9}$/.test(num)){ showSuccessToast('Invalid GCash number. Use 09XXXXXXXXX.'); return; }
        } else if(selectedPaymentMethod === 'PayPal'){
            const email = document.getElementById('paypal-email').value.trim();
            const name = document.getElementById('paypal-name').value.trim();
            if(!email || !name){ showSuccessToast('Please fill in all PayPal details.'); return; }
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showSuccessToast('Invalid PayPal email.'); return; }
        }
        paymentConfirmed = true;
        document.getElementById('race-name-display').innerHTML=`${pendingRace.name} - ${formatPrice(pendingRace.price)} | ${pendingRace.category}`;
        document.getElementById('race-register-form').reset();
        if(currentUser){ document.getElementById('race-email').value=currentUser.email; document.getElementById('race-firstname').value=currentUser.firstname; document.getElementById('race-lastname').value=currentUser.lastname; }
        closePaymentModal();
        document.getElementById('race-reg-modal').classList.add('active');
    }
    function goBackToPayment(){ closeRaceRegModal(); if(pendingRace){ document.getElementById('payment-amount-display').innerHTML=formatPrice(pendingRace.price); document.getElementById('payment-modal').classList.add('active'); } }
    async function handleLogin(email, pwd, remember){
        const res = await fetch('api/login.php', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password: pwd})
        });
        const data = await res.json();
        if(data.success){
            currentUser = data.user;
            if(remember) localStorage.setItem('remembered_email', email);
            else localStorage.removeItem('remembered_email');
            updateUserDisplay();
            closeLoginModal();
            if(pendingRace){
                document.getElementById('prize-fee-display').innerHTML = formatPrice(pendingRace.price);
                document.getElementById('prize-pool-display').innerHTML = formatPrice(pendingRace.prizePool);
                document.getElementById('prize-info-modal').classList.add('active');
            }
            return true;
        }
        return false;
    }
    async function handleRegister(data){
        const res = await fetch('api/register.php', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    }
    
    function getCategoryFromAge(age, gender) {
        if(age >= 13 && age <= 17) return 'Junior Category';
        if(gender === 'Female' && age >= 18) {
            if(age <= 29) return "Women's Category (18–29)";
            if(age <= 39) return "Women's Category (30–39)";
            return "Women's Category (40+)";
        }
        if(age >= 18 && age <= 29) return 'Beginner / Novice';
        if(age >= 18 && age <= 39) return 'Intermediate';
        if(age >= 40 && age <= 49) return 'Masters A';
        if(age >= 50 && age <= 59) return 'Masters B';
        if(age >= 60) return 'Masters C / Veteran';
        return 'Unknown';
    }
    function validateAgeForRace(age, race) {
        return age >= race.minAge && age <= race.maxAge;
    }
    
    function createRaceCard(r, btnClass, cardClass){ const card=document.createElement('div'); card.className=cardClass; const img=document.createElement('img'); img.src=r.img; const imgDiv=document.createElement('div'); imgDiv.className=cardClass==='home-race-card'?'home-race-img':'race-card-img'; imgDiv.appendChild(img); const info=document.createElement('div'); info.className=cardClass==='home-race-card'?'home-race-info':'race-card-info'; const h3=document.createElement('h3'); h3.textContent=r.name; const details=document.createElement('div'); details.className=cardClass==='home-race-card'?'home-race-details':'race-details'; details.textContent=`📅 ${r.date} | 📍 ${r.location}`; const badge=document.createElement('div'); badge.className='race-category-badge'; badge.textContent=r.category; const price=document.createElement('div'); price.className=cardClass==='home-race-card'?'home-race-price':'race-price'; price.textContent=formatPrice(r.price); const btn=document.createElement('button'); btn.className=btnClass; btn.textContent='Register'; btn.dataset.raceId=r.id; btn.addEventListener('click',()=>openRaceRegistration(r)); info.append(h3,details,badge,price,btn); card.append(imgDiv,info); return card; }
    function initHomeRaces(){ const c=document.getElementById('home-race-grid'); if(!c) return; c.innerHTML=''; allRaces.forEach(r=>{ c.appendChild(createRaceCard(r,'home-register-btn','home-race-card')); }); }
    function initRacesPage(){ const c=document.getElementById('race-cards-container'); if(!c) return; c.innerHTML=''; const rows=[[allRaces[0],allRaces[1],allRaces[2]],[allRaces[3],allRaces[4],allRaces[5]]]; rows.forEach(row=>{ const rowDiv=document.createElement('div'); rowDiv.className='race-row'; row.forEach(r=>{ rowDiv.appendChild(createRaceCard(r,'register-race-btn','race-card')); }); c.appendChild(rowDiv); }); }
    function initGuidelines(){ 
        const g=document.getElementById('guidelines-container'); 
        if(!g) return; 
        const updatedGuidelines = [
            {title:'Rider Registration', desc:'Seamless digital check-in and waiver signing.'},
            {title:'Respect Fellow Riders', desc:'Maintain safe distance & signal moves'},
            {title:'Route Analytics', desc:'GPS data mapping and elevation profile management.'},
            {title:'Resource Allocation', desc:'Inventory tracking for medals, kits, and hydration stations.'},
            {title:'Category Eligibility', desc:'Automated validation of age, skill level, and license status.'},
            {title:'Leave No Trace', desc:'Dispose waste properly'}
        ];
        g.innerHTML=updatedGuidelines.map(gd=>`<div class="guideline-card"><h3>${gd.title}</h3><p>${gd.desc}</p></div>`).join(''); 
    }
    function ageValid(age){ let a=Number(age); return Number.isInteger(a) && a>=13 && a<=90; }
    function setupEvents(){
        document.getElementById('continue-to-reg-btn')?.addEventListener('click',proceedToRegistrationForm);
        document.getElementById('confirm-payment-btn')?.addEventListener('click',proceedToRaceRegistration);
        document.getElementById('race-reg-back-btn')?.addEventListener('click',goBackToPayment);
        const loginForm = document.getElementById('login-form-popup');
        const loginEmail = document.getElementById('login-email-popup');
        const loginPassword = document.getElementById('login-password-popup');
        if(loginForm) { loginForm.addEventListener('submit', async (e)=>{ e.preventDefault(); const email = loginEmail.value.trim(); const pwd = loginPassword.value; const rem = document.getElementById('remember-me').checked; let hasError = false; if(!email){ setError(loginEmail); triggerShake(loginEmail); hasError = true; } else removeError(loginEmail); if(!pwd){ setError(loginPassword); triggerShake(loginPassword); hasError = true; } else removeError(loginPassword); if(hasError) return; const ok = await handleLogin(email, pwd, rem); if(!ok){ setError(loginEmail); setError(loginPassword); triggerShake(loginEmail); triggerShake(loginPassword); showSuccessToast('Invalid credentials'); } }); }
        const raceForm = document.getElementById('race-register-form');
        if(raceForm) { raceForm.addEventListener('submit', async (e)=>{ e.preventDefault(); if(!pendingRace||!currentUser) return; let valid=true; function validateField(id, condition){ let el=document.getElementById(id); if(!condition(el)){ setError(el); triggerShake(el); return false; } else { removeError(el); return true; } } function checkNotEmpty(el){ return el && el.value.trim() !== ''; } if(!validateField('race-firstname', checkNotEmpty)) valid=false; if(!validateField('race-lastname', checkNotEmpty)) valid=false; const ageEl=document.getElementById('race-age'); const ageValue=parseInt(ageEl.value); if(!ageEl.value || !ageValid(ageEl.value)){ setError(ageEl); triggerShake(ageEl); setFieldError('race-age-error', 'Age must be a whole number between 13 and 90.'); valid=false; } else if(!validateAgeForRace(ageValue, pendingRace)){ setError(ageEl); triggerShake(ageEl); setFieldError('race-age-error', `Age must be between ${pendingRace.minAge} and ${pendingRace.maxAge} for this race.`); valid=false; } else { removeError(ageEl); clearFieldError('race-age-error'); } const genderEl=document.getElementById('race-gender'); if(!genderEl.value){ setError(genderEl); triggerShake(genderEl); valid=false; } else removeError(genderEl); if(!validateField('race-phone', checkNotEmpty)) valid=false; if(!validateField('race-address', checkNotEmpty)) valid=false; if(!validateField('race-email', checkNotEmpty)) valid=false; const cityEl=document.getElementById('race-city'); if(!cityEl.value){ setError(cityEl); triggerShake(cityEl); valid=false; } else removeError(cityEl); if(!validateField('race-emergency-name', checkNotEmpty)) valid=false; if(!validateField('race-emergency-number', checkNotEmpty)) valid=false; const bikeEl=document.getElementById('race-bike-category'); if(!bikeEl.value){ setError(bikeEl); triggerShake(bikeEl); valid=false; } else removeError(bikeEl); if(!valid) return; const regData={ raceId:pendingRace.id, raceName:pendingRace.name, raceCategory:getCategoryFromAge(ageValue, genderEl.value), raceDate:pendingRace.date, raceLocation:pendingRace.location, racePrice:pendingRace.price, prizePool:pendingRace.prizePool, paymentStatus: paymentConfirmed ? 'paid' : 'unpaid', paymentMethod: selectedPaymentMethod, paymentDateTime: new Date().toISOString(), firstName:document.getElementById('race-firstname').value.trim(), lastName:document.getElementById('race-lastname').value.trim(), age:ageValue, gender:genderEl.value, phone:document.getElementById('race-phone').value.trim(), address:document.getElementById('race-address').value.trim(), email:document.getElementById('race-email').value.trim(), city:cityEl.value, emergencyName:document.getElementById('race-emergency-name').value.trim(), emergencyNumber:document.getElementById('race-emergency-number').value.trim(), bikeCategory:bikeEl.value, medicalConditions:document.getElementById('race-medical-conditions').value.trim() }; const result = await saveRegistration(regData); if(result.success){ closeRaceRegModal(); closePrizeModal(); closePaymentModal(); openRegSuccessModal(regData); } else { showSuccessToast(result.message || 'Registration failed.'); } }); }
        const regForm = document.getElementById('register-form');
        if(regForm) { regForm.addEventListener('submit', async function(e){ e.preventDefault(); let valid=true; function validateField(id, condition){ let el=document.getElementById(id); if(!condition(el)){ setError(el); triggerShake(el); return false; } else { removeError(el); return true; } } function checkNotEmpty(el){ return el && el.value.trim() !== ''; } if(!validateField('reg-firstname', checkNotEmpty)) valid=false; if(!validateField('reg-lastname', checkNotEmpty)) valid=false; const ageEl=document.getElementById('reg-age'); if(!ageEl.value || !ageValid(ageEl.value)){ setError(ageEl); triggerShake(ageEl); setFieldError('reg-age-error', 'Age must be a whole number between 13 and 90.'); valid=false; } else { removeError(ageEl); clearFieldError('reg-age-error'); } const genderEl=document.getElementById('reg-gender'); if(!genderEl.value){ setError(genderEl); triggerShake(genderEl); valid=false; } else removeError(genderEl); if(!validateField('reg-phone', checkNotEmpty)) valid=false; if(!validateField('reg-address', checkNotEmpty)) valid=false; const emailEl=document.getElementById('reg-email'); if(!emailEl.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)){ setError(emailEl); triggerShake(emailEl); valid=false; } else removeError(emailEl); const cityEl=document.getElementById('reg-city'); if(!cityEl.value){ setError(cityEl); triggerShake(cityEl); valid=false; } else removeError(cityEl); const pwdEl=document.getElementById('reg-password'); if(!pwdEl.value || pwdEl.value.length<8){ setError(pwdEl); triggerShake(pwdEl); valid=false; } else removeError(pwdEl); const confirmEl=document.getElementById('reg-confirm-password'); if(confirmEl.value !== pwdEl.value){ setError(confirmEl); triggerShake(confirmEl); valid=false; } else removeError(confirmEl); if(!valid) return; const newUser={firstname:document.getElementById('reg-firstname').value.trim(), lastname:document.getElementById('reg-lastname').value.trim(), age:parseInt(ageEl.value), gender:genderEl.value, phone:document.getElementById('reg-phone').value.trim(), address:document.getElementById('reg-address').value.trim(), city:cityEl.value, email:emailEl.value.trim(), password:pwdEl.value}; const result = await handleRegister(newUser); if(result.success){ closeRegisterModal(); openLoginModal(); regForm.reset(); } else { setError(emailEl); triggerShake(emailEl); showSuccessToast(result.message || 'Registration failed'); } }); }
        const allTextInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="password"], select, textarea');
        allTextInputs.forEach(input => {
            input.addEventListener('input', function() {
                if(this.value.trim()) removeError(this);
                if(this.id === 'race-age') clearFieldError('race-age-error');
                if(this.id === 'reg-age') clearFieldError('reg-age-error');
            });
            input.addEventListener('blur', function() {
                if(!this.value.trim()) setError(this);
            });
        });
        document.getElementById('note-icon')?.addEventListener('click',(e)=>{ e.stopPropagation(); if(currentUser){ loadUserRegistrations(); showRecordsModal(); } });
        document.querySelectorAll('.nav-link').forEach(link=>{ link.addEventListener('click',(e)=>{ e.preventDefault(); document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active')); link.classList.add('active'); const target=link.getAttribute('href').substring(1); document.querySelectorAll('.section').forEach(s=>s.classList.remove('active')); const ts=document.getElementById(target); if(ts) ts.classList.add('active'); if(target==='trailmap') setTimeout(initCebuMap,100); if(target==='races') initRacesPage(); }); });
        document.querySelector('.view-trails-btn')?.addEventListener('click',()=>{ document.querySelector('.nav-link[href="#trailmap"]')?.click(); });
        const userNameClick=document.getElementById('user-name-click'); const userDropdown=document.getElementById('user-dropdown'); if(userNameClick){ userNameClick.addEventListener('click',(e)=>{ e.stopPropagation(); if(currentUser){ userDropdown.innerHTML=`<a onclick="openLoginModal()"><i class="fas fa-user-plus"></i> Add Account</a><a onclick="logout()"><i class="fas fa-sign-out-alt"></i> Log Out</a>`; } else { userDropdown.innerHTML=`<a onclick="openLoginModal()"><i class="fas fa-sign-in-alt"></i> Log In</a><a onclick="openRegisterModal()"><i class="fas fa-user-plus"></i> Sign Up</a>`; } userDropdown.classList.toggle('show'); }); }
        document.addEventListener('click',()=>{ if(userDropdown) userDropdown.classList.remove('show'); });
    }
    function setError(element) { if(!element) return; element.classList.add('error-input'); }
    function removeError(element) { if(!element) return; element.classList.remove('error-input'); element.classList.remove('shake-animation'); }
    function setFieldError(id, message){ const el=document.getElementById(id); if(el) el.textContent = message; }
    function clearFieldError(id){ const el=document.getElementById(id); if(el) el.textContent = ''; }
    function triggerShake(input) { if(!input) return; input.classList.add('shake-animation'); input.addEventListener('animationend', () => { input.classList.remove('shake-animation'); }, { once: true }); }
    (async function init(){
        populateCityDropdowns();
        // Restore session from server
        try {
            const res = await fetch('api/session_check.php');
            const data = await res.json();
            if(data.success) currentUser = data.user;
        } catch(e) {}
        updateUserDisplay();
        const remEmail = localStorage.getItem('remembered_email');
        if(remEmail && document.getElementById('login-email-popup')){
            document.getElementById('login-email-popup').value = remEmail;
            const rememberCheck = document.getElementById('remember-me');
            if(rememberCheck) rememberCheck.checked = true;
        }
        initHomeRaces(); initRacesPage(); initGuidelines(); setupEvents();
        let idx=0, bgSlides=document.querySelectorAll('#bg-animation .bg-slide');
        setInterval(()=>{ bgSlides[idx].classList.remove('active'); idx=(idx+1)%bgSlides.length; bgSlides[idx].classList.add('active'); },5000);
    })();
    window.openLoginModal=openLoginModal; window.closeLoginModal=closeLoginModal; window.openRegisterModal=openRegisterModal; window.closeRegisterModal=closeRegisterModal; window.switchToLoginFromRegister=switchToLoginFromRegister; window.switchToRegisterFromLogin=switchToRegisterFromLogin; window.openRaceRegistration=openRaceRegistration; window.closeRaceRegModal=closeRaceRegModal; window.closeRecordsModal=closeRecordsModal; window.closePrizeModal=closePrizeModal; window.logout=logout; window.closeRegSuccessModal=closeRegSuccessModal; window.showPaymentForm=showPaymentForm;