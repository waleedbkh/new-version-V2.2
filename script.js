const phoneNumber = '966530856858';
const productCards = document.querySelectorAll('.product-card');
const cutCards = document.querySelectorAll('.cut-card');
const typeSelect = document.getElementById('type');
const cutSelect = document.getElementById('cut');
const orderSection = document.getElementById('order');

function pickProduct(card) {
  productCards.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  typeSelect.value = card.dataset.type;
  orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

productCards.forEach(card => {
  card.addEventListener('click', () => pickProduct(card));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      pickProduct(card);
    }
  });
});

cutCards.forEach(card => {
  card.addEventListener('click', () => {
    cutCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    cutSelect.value = card.dataset.cut;
  });
});

function value(id) {
  return document.getElementById(id).value.trim();
}

function sendWhatsApp() {
  const data = {
    name: value('name'),
    phone: value('phone'),
    type: value('type'),
    cut: value('cut'),
    date: value('date'),
    time: value('time'),
    notes: value('notes')
  };

  if (!data.name || !data.phone || !data.type || !data.cut || !data.date || !data.time) {
    alert('فضلاً أكمل البيانات المطلوبة قبل إرسال الطلب');
    return;
  }

  const message = `السلام عليكم، أرغب بطلب ذبيحة من ذبايح أبو خالد

الاسم: ${data.name}
رقم الجوال: ${data.phone}
نوع الذبيحة: ${data.type}
طريقة التقطيع: ${data.cut}
تاريخ التوصيل المتوقع: ${data.date}
وقت الذبح: ${data.time}
ملاحظات: ${data.notes || 'لا يوجد'}`;

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

document.getElementById('sendBtn').addEventListener('click', sendWhatsApp);
