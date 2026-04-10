const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const value = btn.dataset.filter;
    document.querySelectorAll('.course-card[data-category]').forEach(card => {
      card.style.display = (value === 'all' || card.dataset.category === value) ? '' : 'none';
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ============================================================
   CLUB GLOBALVET — Drawer lateral
   MODIFICADO: integración Club GlobalVet
   ============================================================ */

(function() {
  const drawerHTML = `
<div class="club-overlay" id="clubOverlay"></div>
<aside class="club-drawer" id="clubDrawer" role="dialog" aria-modal="true" aria-label="Club GlobalVet">

  <div class="club-drawer-header">
    <button class="club-close-btn" id="clubClose" aria-label="Cerrar Club GlobalVet">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="club-badge-tag">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      Membresía exclusiva
    </div>
    <h2>Club GlobalVet</h2>
    <p>Accede a formación continua, recursos exclusivos y comunidad profesional veterinaria.</p>
  </div>

  <div class="club-tabs" role="tablist">
    <button class="club-tab active" data-tab="beneficios" role="tab">Beneficios</button>
    <button class="club-tab" data-tab="videos" role="tab">Videos</button>
    <button class="club-tab" data-tab="planes" role="tab">Planes</button>
  </div>

  <div class="club-drawer-body">

    <!-- Tab: Beneficios -->
    <div class="club-tab-panel active" id="tab-beneficios">
      <div class="club-benefit-item">
        <div class="club-benefit-icon">🎓</div>
        <div>
          <h4>Cursos y diplomados exclusivos</h4>
          <p>Accede a programas especializados disponibles solo para miembros del Club GlobalVet, con certificado de valor curricular.</p>
        </div>
      </div>
      <div class="club-benefit-item">
        <div class="club-benefit-icon">📹</div>
        <div>
          <h4>Biblioteca de videos profesionales</h4>
          <p>Más de 80 videos de formación clínica, técnica y académica organizados por área y nivel de especialización.</p>
        </div>
      </div>
      <div class="club-benefit-item">
        <div class="club-benefit-icon">🩺</div>
        <div>
          <h4>Casos clínicos reales</h4>
          <p>Estudia casos de práctica real presentados por especialistas veterinarios con resolución paso a paso.</p>
        </div>
      </div>
      <div class="club-benefit-item">
        <div class="club-benefit-icon">📄</div>
        <div>
          <h4>Material descargable</h4>
          <p>Protocolos, guías de manejo, tablas de referencia y recursos de estudio descargables en PDF.</p>
        </div>
      </div>
      <div class="club-benefit-item">
        <div class="club-benefit-icon">👥</div>
        <div>
          <h4>Comunidad profesional activa</h4>
          <p>Grupo exclusivo de WhatsApp con veterinarios y estudiantes de toda Latinoamérica.</p>
        </div>
      </div>
      <div class="club-benefit-item">
        <div class="club-benefit-icon">🏆</div>
        <div>
          <h4>Descuentos en cursos presenciales</h4>
          <p>Hasta 30% de descuento en cursos, talleres y diplomados presenciales de GlobalVet México.</p>
        </div>
      </div>
      <div class="club-benefit-item">
        <div class="club-benefit-icon">📆</div>
        <div>
          <h4>Webinars mensuales en vivo</h4>
          <p>Sesiones en vivo con expertos veterinarios, preguntas en tiempo real y acceso a grabaciones posteriores.</p>
        </div>
      </div>
    </div>

    <!-- Tab: Videos -->
    <div class="club-tab-panel" id="tab-videos">
      <p style="font-size:.84rem;color:var(--muted);margin-bottom:1rem;">Una muestra de los contenidos disponibles para miembros del Club:</p>
      <div class="club-video-item">
        <div class="club-video-thumb">▶️</div>
        <div class="club-video-info">
          <h4>Interpretación de perfil bioquímico en perros y gatos</h4>
          <span>Bioquímica clínica · 42 min</span>
        </div>
        <span class="club-video-badge">CLUB</span>
      </div>
      <div class="club-video-item">
        <div class="club-video-thumb">▶️</div>
        <div class="club-video-info">
          <h4>Protocolo de anestesia en pacientes de alto riesgo</h4>
          <span>Cirugía · 38 min</span>
        </div>
        <span class="club-video-badge">CLUB</span>
      </div>
      <div class="club-video-item">
        <div class="club-video-thumb">▶️</div>
        <div class="club-video-info">
          <h4>Técnicas de fisioterapia post-quirúrgica</h4>
          <span>Rehabilitación · 55 min</span>
        </div>
        <span class="club-video-badge">CLUB</span>
      </div>
      <div class="club-video-item">
        <div class="club-video-thumb">▶️</div>
        <div class="club-video-info">
          <h4>Manejo del estrés en consulta: herramientas prácticas</h4>
          <span>Bienestar animal · 29 min</span>
        </div>
        <span class="club-video-badge">CLUB</span>
      </div>
      <div class="club-video-item">
        <div class="club-video-thumb">▶️</div>
        <div class="club-video-info">
          <h4>Neonatología: primeras 72 horas críticas</h4>
          <span>Neonatología · 47 min</span>
        </div>
        <span class="club-video-badge">CLUB</span>
      </div>
      <div class="club-video-item">
        <div class="club-video-thumb">▶️</div>
        <div class="club-video-info">
          <h4>Radiología digital: lectura e interpretación básica</h4>
          <span>Diagnóstico · 61 min</span>
        </div>
        <span class="club-video-badge">CLUB</span>
      </div>
      <div class="club-video-item">
        <div class="club-video-thumb">▶️</div>
        <div class="club-video-info">
          <h4>Etología aplicada: comunicación canina y felina</h4>
          <span>Etología · 33 min</span>
        </div>
        <span class="club-video-badge">CLUB</span>
      </div>
      <p style="font-size:.82rem;color:var(--muted);text-align:center;margin-top:.5rem;">+80 videos disponibles para miembros activos</p>
    </div>

    <!-- Tab: Planes -->
    <div class="club-tab-panel" id="tab-planes">
      <div class="club-plan-card">
        <h3>Plan Mensual</h3>
        <div class="club-plan-price">$199 <span>MXN / mes</span></div>
        <p class="club-plan-desc">Ideal para explorar el Club y comenzar tu formación continua.</p>
        <ul class="club-plan-features">
          <li>Acceso completo a la biblioteca de videos</li>
          <li>Material descargable en PDF</li>
          <li>Comunidad de WhatsApp profesional</li>
          <li>1 webinar en vivo al mes</li>
          <li>Certificados digitales incluidos</li>
        </ul>
      </div>
      <div class="club-plan-card featured">
        <div class="club-plan-popular">⭐ Más popular</div>
        <h3>Plan Anual</h3>
        <div class="club-plan-price">$1,490 <span>MXN / año</span></div>
        <p class="club-plan-desc">El mejor valor. Ahorra 38% vs el plan mensual.</p>
        <ul class="club-plan-features">
          <li>Todo lo del Plan Mensual</li>
          <li>Acceso a cursos exclusivos Club</li>
          <li>Casos clínicos reales con resolución</li>
          <li>Webinars ilimitados + grabaciones</li>
          <li>30% descuento en cursos presenciales</li>
          <li>Soporte prioritario por WhatsApp</li>
        </ul>
      </div>
    </div>

  </div>

  <div class="club-drawer-footer">
    <a class="club-cta-btn" href="https://wa.me/5212381500864?text=Hola%2C%20me%20interesa%20unirme%20al%20Club%20GlobalVet%20%F0%9F%90%BE" target="_blank" rel="noopener">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.563 4.14 1.535 5.874L0 24l6.29-1.508A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.814 9.814 0 01-5.058-1.4l-.361-.214-3.735.896.944-3.653-.235-.374A9.817 9.817 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
      ¡Unirme al Club GlobalVet!
    </a>
    <span class="club-cta-secondary">¿Tienes dudas? <a href="https://wa.me/5212381500864" target="_blank" rel="noopener">Escríbenos por WhatsApp</a></span>
  </div>

</aside>
  `;

  // Inyectar el drawer al final del body
  document.body.insertAdjacentHTML('beforeend', drawerHTML);

  const overlay = document.getElementById('clubOverlay');
  const drawer  = document.getElementById('clubDrawer');
  const closeBtn = document.getElementById('clubClose');

  function openClub() {
    overlay.classList.add('active');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeClub() {
    overlay.classList.remove('active');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Botones que abren el drawer
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-open-club]')) {
      e.preventDefault();
      openClub();
    }
  });

  overlay.addEventListener('click', closeClub);
  closeBtn.addEventListener('click', closeClub);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeClub();
  });

  // Tabs del drawer
  document.querySelectorAll('.club-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.club-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.club-tab-panel').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      document.getElementById('tab-' + this.dataset.tab).classList.add('active');
    });
  });
})();
