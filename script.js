(() => {
  'use strict';

  const body = document.body;
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  const productSelect = document.getElementById('productType');
  const cutSelect = document.getElementById('cutType');
  const form = document.getElementById('orderForm');
  const status = document.getElementById('formStatus');
  const topBtn = document.querySelector('.to-top');
  const phoneNumber = '966530856858';

  function closeMenu() {
    body.classList.remove('menu-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }

  menuBtn?.addEventListener('click', () => {
    const opened = body.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(opened));
  });

  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => {
      const product = card.dataset.product || '';
      if (!product || !productSelect) return;
      productSelect.value = product;
      document.querySelectorAll('.product-card.selected').forEach((item) => item.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.cut-card').forEach((card) => {
    card.addEventListener('click', () => {
      const cut = card.dataset.cut || '';
      if (!cut || !cutSelect) return;
      cutSelect.value = cut;
      document.querySelectorAll('.cut-card.active').forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  function value(id) {
    return document.getElementById(id)?.value.trim() || '';
  }

  function buildMessage() {
    return [
      'السلام عليكم، أرغب بطلب ذبيحة من ذبائح أبو خالد',
      '',
      `الاسم: ${value('customerName')}`,
      `رقم الجوال: ${value('customerPhone')}`,
      `نوع الذبيحة: ${value('productType')}`,
      `طريقة التقطيع: ${value('cutType')}`,
      `تاريخ التوصيل المتوقع: ${value('deliveryDate')}`,
      `وقت الذبح: ${value('slaughterTime')}`,
      `ملاحظات: ${value('notes')}`
    ].join('\n');
  }

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const required = [
      ['customerName', 'اكتب الاسم الكامل'],
      ['customerPhone', 'اكتب رقم الجوال'],
      ['productType', 'اختر نوع الذبيحة'],
      ['cutType', 'اختر طريقة التقطيع']
    ];

    for (const [id, message] of required) {
      const field = document.getElementById(id);
      if (!field?.value.trim()) {
        if (status) status.textContent = message;
        field?.focus();
        return;
      }
    }

    if (status) status.textContent = 'جاري فتح واتساب لإرسال الطلب...';
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  });

  function toggleTopButton() {
    topBtn?.classList.toggle('show', window.scrollY > 520);
  }

  window.addEventListener('scroll', toggleTopButton, { passive: true });
  toggleTopButton();

  topBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
