(() => {
  'use strict';

  const BASE_CATEGORIES = [
    { id: 'sauces', name: 'Соусы, специи и бакалея', short: 'Соусы и бакалея' },
    { id: 'preserves', name: 'Консервация и соленья', short: 'Консервация' },
    { id: 'vegetables', name: 'Овощи и зелень', short: 'Овощи и зелень' },
    { id: 'dairy', name: 'Сыры и молочные продукты', short: 'Сыры и молочное' },
    { id: 'fruit', name: 'Фрукты', short: 'Фрукты' },
    { id: 'bakery', name: 'Хлебные изделия и фритюр', short: 'Хлеб и фритюр' },
    { id: 'seafood', name: 'Рыба и морепродукты', short: 'Рыба и морепродукты' },
    { id: 'meat', name: 'Мясо и мясные изделия', short: 'Мясо' }
  ];

  const MESSAGE_SECTIONS = {
    dairy: { emoji: '🧀', name: 'Сыры и молочные продукты' },
    sauces: { emoji: '🥫', name: 'Соусы, специи и бакалея' },
    preserves: { emoji: '🥒', name: 'Консервация и соленья' },
    vegetables: { emoji: '🥬', name: 'Овощи и зелень' },
    fruit: { emoji: '🍎', name: 'Фрукты' },
    bakery: { emoji: '🍞', name: 'Хлеб и расходные материалы' },
    seafood: { emoji: '🐟', name: 'Рыба и морепродукты' },
    meat: { emoji: '🥩', name: 'Мясо и мясные изделия' }
  };
  const MESSAGE_SECTION_ORDER = ['dairy', 'sauces', 'vegetables', 'fruit', 'bakery', 'preserves', 'seafood', 'meat'];

  const UNIT_OPTIONS = ['кг', 'г', 'л', 'мл', 'шт.', 'уп.', 'кор.', 'пак.', 'бан.', 'бут.', 'пуч.'];
  const CATALOG = {
    sauces: [
      'Соус сладкий чили|бут.', 'Соус устричный|бут.', 'Соус ореховый|бут.', 'Соус рыбный|бут.', 'Соус вустерский|бут.',
      'Соус бальзамический|бут.', 'Соус бальзамический с трюфелем|бут.', 'Соус барбекю|бут.', 'Соус терияки|бут.',
      'Соус сырный|бут.', 'Соус кетчуп|бут.', 'Горчица французская|бан.', 'Горчица русская|бан.', 'Топинг шоколадный|бут.',
      'Топинг карамельный|бут.', 'Топинг клубничный|бут.', 'Хрен|бан.', 'Соус томатный для пиццы|бан.', 'Уксус столовый 9%|бут.',
      'Перец чёрный|уп.', 'Чеснок сублимированный сухой|уп.', 'Соль нитритная|уп.', 'Сахар|кг', 'Разрыхлитель|уп.',
      'Соль экстра|уп.', 'Крупа манная|кг', 'Корица|уп.', 'Приправа универсальная|уп.', 'Сухой бульон со вкусом бекона|уп.',
      'Сухой бульон со вкусом рыбы|уп.', 'Сухой бульон со вкусом курицы|уп.', 'Приправа карри|уп.', 'Прованские травы|уп.',
      'Паприка|уп.', 'Какао-порошок|уп.', 'Глутамат натрия|уп.', 'Приправа «Красный чили»|уп.', 'Масло кунжутное|бут.',
      'Масло оливковое|бут.', 'Масло подсолнечное|бут.', 'Миндаль|кг', 'Фисташки|кг', 'Мёд|кг',
      'Мука пшеничная для пиццы|кг', 'Мука ржаная обдирная хлебопекарная|кг', 'Семена подсолнечника|кг',
      'Семена кунжута|кг', 'Семена тыквы|кг', 'Крахмал картофельный|кг', 'Кокосовая стружка|кг', 'Спагетти|уп.',
      'Ньокки картофельные|кг', 'Дрожжи|уп.', 'Рис длиннозёрный в пакетиках|уп.', 'Паста Том Ям|бан.', 'Соус гранатовый|бут.'
    ],
    preserves: [
      'Каперсы|бан.', 'Перец чили|кг', 'Перец халапеньо|бан.', 'Оливки|бан.', 'Маслины|бан.', 'Корнишоны|бан.',
      'Томаты черри маринованные|бан.', 'Капуста квашеная|кг'
    ],
    vegetables: [
      'Розмарин|пуч.', 'Мята|пуч.', 'Тимьян|пуч.', 'Укроп|пуч.', 'Петрушка|пуч.', 'Шампиньоны|кг', 'Салат айсберг|шт.',
      'Лук репчатый|кг', 'Чеснок свежий|кг', 'Томаты черри|кг', 'Перец болгарский|кг', 'Огурцы свежие|кг',
      'Томаты розовые|кг', 'Баклажаны|кг', 'Цукини|кг', 'Картофель свежий|кг', 'Шпинат|кг', 'Фасоль стручковая|кг', 'Спаржа|кг'
    ],
    dairy: [
      'Брынза|кг', 'Фетакса|кг', 'Сыр чеддер|кг', 'Сыр пармезан|кг', 'Сыр дор блю|кг', 'Сыр моцарелла|кг',
      'Мороженое шоколадное|уп.', 'Мороженое ванильное|уп.', 'Сыр косичка копчёный|кг', 'Сыр чечил|кг',
      'Масло сливочное|кг', 'Сливки|л', 'Сыр творожный «Креметте»|кг'
    ],
    fruit: ['Апельсины|кг', 'Яблоки|кг', 'Виноград|кг', 'Груши|кг', 'Ананас|шт.', 'Киви|кг', 'Лайм|кг', 'Лимоны|кг'],
    bakery: [
      'Хлебные палочки солёные|уп.', 'Хлеб ржаной (чёрный)|шт.', 'Хлеб пшеничный: багет|шт.', 'Хлеб пшеничный: чиабатта|шт.',
      'Хлеб для сэндвичей HARRY’S|уп.', 'Луковые кольца|кг', 'Картофель фри|кг', 'Картофель по-деревенски|кг', 'Сырные шарики П/Ф|кг'
    ],
    seafood: ['Креветка северная|кг', 'Анчоусы|кг', 'Сельдь слабосолёная|кг', 'Минтай|кг', 'Мидии|кг', 'Лосось|кг', 'Кальмар|кг'],
    meat: [
      'Грудка утиная|кг', 'Ростбиф|кг', 'Буженина|кг', 'Крылья куриные|кг', 'Бедро куриное|кг', 'Грудка куриная|кг',
      'Колбасы копчёные без названия|кг', 'Сало|кг', 'Колбаски пепперони|кг', 'Корейка свиная на кости|кг',
      'Вяленые куриные ломтики «Пепперони»|уп.', 'Вяленые куриные ломтики «Хамон»|уп.',
      'Вяленые куриные ломтики «Утка по-пекински»|уп.', 'Ветчина|кг', 'Бекон|кг'
    ]
  };

  const KEYS = { custom: 'vip-restobar-v1-custom', groups: 'vip-restobar-v1-groups', history: 'vip-restobar-v1-history' };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const safeRead = (key, fallback) => {
    try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; }
  };
  let customGroups = safeRead(KEYS.groups, []).filter((group) => group && group.id && group.name);
  let CATEGORIES = [...BASE_CATEGORIES, ...customGroups.map((group) => ({ ...group, short: group.name, custom: true }))];
  let categoryMap = new Map(CATEGORIES.map((category) => [category.id, category]));
  const refreshCategoryMap = () => {
    CATEGORIES = [...BASE_CATEGORIES, ...customGroups.map((group) => ({ ...group, short: group.name, custom: true }))];
    categoryMap = new Map(CATEGORIES.map((category) => [category.id, category]));
  };
  const seeded = BASE_CATEGORIES.flatMap((category) => (CATALOG[category.id] || []).map((entry, index) => {
    const [name, unit] = entry.split('|');
    return { id: `${category.id}-${index}`, name, category: category.id, unit, custom: false };
  }));
  let customProducts = safeRead(KEYS.custom, []).filter((product) => product && product.id && product.name && categoryMap.has(product.category));
  let products = [...seeded, ...customProducts];
  let selected = {};
  let activeCategory = 'all';
  let orders = safeRead(KEYS.history, []).filter((order) => order && order.id && Array.isArray(order.items));
  let savedDraftId = null;
  let toastTimer;
  let audioContext;

  const productById = () => new Map(products.map((product) => [product.id, product]));
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const todayIso = (date = new Date()) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  };
  const tomorrowIso = () => { const date = new Date(); date.setDate(date.getDate() + 1); return todayIso(date); };
  const parseIsoDate = (iso) => {
    const [year, month, day] = String(iso || '').split('-').map(Number);
    return year && month && day ? new Date(year, month - 1, day, 12) : new Date();
  };
  const formatLongDate = (iso) => new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(parseIsoDate(iso));
  const formatShortDate = (iso) => new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(parseIsoDate(iso));
  const formatDateTime = (iso) => new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
  const formatQuantity = (value) => {
    const numeric = Number(String(value).replace(',', '.'));
    if (!Number.isFinite(numeric)) return '';
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 3 }).format(numeric);
  };
  const plural = (count, one, few, many) => {
    const n = Math.abs(count) % 100;
    if (n >= 11 && n <= 19) return many;
    const last = n % 10;
    return last === 1 ? one : last >= 2 && last <= 4 ? few : many;
  };
  const persist = () => {
    try {
      localStorage.setItem(KEYS.custom, JSON.stringify(customProducts));
      localStorage.setItem(KEYS.groups, JSON.stringify(customGroups));
      localStorage.setItem(KEYS.history, JSON.stringify(orders.slice(0, 120)));
    } catch { showToast('Не удалось сохранить данные в браузере.'); }
  };
  const invalidateDraft = () => { savedDraftId = null; };

  function renderClock() {
    const now = new Date();
    $('#liveClock').textContent = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(now);
    $('#createdAt').textContent = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }).format(now);
  }

  function renderCategories() {
    const query = $('#productSearch').value.trim().toLocaleLowerCase('ru-RU');
    const matching = products.filter((product) => !query || product.name.toLocaleLowerCase('ru-RU').includes(query));
    const categoryButtons = [
      { id: 'all', name: 'Все товары', count: matching.length },
      ...BASE_CATEGORIES.map((category) => ({ ...category, count: matching.filter((product) => product.category === category.id).length })),
      { id: 'custom', name: 'Другие товары', count: matching.filter((product) => product.custom).length },
      ...customGroups.map((category) => ({ ...category, short: category.name, custom: true, count: matching.filter((product) => product.category === category.id).length }))
    ];
    $('#categoryNav').innerHTML = categoryButtons.map((category) => `
      <button class="category-chip${activeCategory === category.id ? ' active' : ''}" type="button" data-category="${category.id}" aria-pressed="${activeCategory === category.id}">
        ${escapeHtml(category.name)} <small>${category.count}</small>
      </button>`).join('');
  }

  function renderCatalog() {
    const query = $('#productSearch').value.trim().toLocaleLowerCase('ru-RU');
    const matches = products.filter((product) => {
      const inCategory = activeCategory === 'all' || (activeCategory === 'custom' ? product.custom : product.category === activeCategory);
      const inSearch = !query || product.name.toLocaleLowerCase('ru-RU').includes(query);
      return inCategory && inSearch;
    });
    $('#productTotal').textContent = products.length;
    $('#resultsLabel').textContent = activeCategory === 'all' ? (query ? 'Результаты поиска' : 'Все товары') : activeCategory === 'custom' ? 'Другие товары' : categoryMap.get(activeCategory)?.name || 'Все товары';
    $('#selectionLabel').textContent = `Выбрано: ${Object.keys(selected).length}`;
    $('#productGrid').innerHTML = matches.map((product) => {
      const category = categoryMap.get(product.category);
      const item = selected[product.id];
      const quantity = item?.quantity ?? '0';
      const unit = item?.unit || product.unit;
      const unitOptions = [...new Set([unit, ...UNIT_OPTIONS])].map((option) => `<option value="${escapeHtml(option)}"${option === unit ? ' selected' : ''}>${escapeHtml(option)}</option>`).join('');
      return `<article class="product-card${item ? ' selected' : ''}${product.custom ? ' custom-product' : ''}" data-product-id="${escapeHtml(product.id)}">
        <div class="product-info"><span class="product-name">${escapeHtml(product.name)}</span><span class="product-category">${escapeHtml(category?.short || category?.name || '')}${product.custom ? ' · свой товар' : ''}</span></div>
        <div class="product-actions">
          ${item ? `<div class="quantity-controls">
            <button class="quantity-button quantity-minus" type="button" data-action="decrement" data-id="${escapeHtml(product.id)}" aria-label="Уменьшить количество: ${escapeHtml(product.name)}">−</button>
            <input class="product-quantity" type="number" inputmode="decimal" min="0" step="any" value="${escapeHtml(quantity)}" data-field="quantity" data-id="${escapeHtml(product.id)}" aria-label="Количество: ${escapeHtml(product.name)}" />
            <select class="product-unit" data-field="unit" data-id="${escapeHtml(product.id)}" aria-label="Единица измерения: ${escapeHtml(product.name)}">${unitOptions}</select>
            <button class="quantity-button quantity-plus" type="button" data-action="increment" data-id="${escapeHtml(product.id)}" aria-label="Увеличить количество: ${escapeHtml(product.name)}">＋</button>
          </div>` : `<div class="quick-add"><span class="unit-badge">${escapeHtml(unit)}</span><button class="add-item-button" type="button" data-action="increment" data-id="${escapeHtml(product.id)}" aria-label="Добавить: ${escapeHtml(product.name)}">＋</button></div>`}
          ${product.custom ? `<button class="custom-delete" type="button" data-action="delete-product" data-id="${escapeHtml(product.id)}" aria-label="Удалить товар ${escapeHtml(product.name)}" title="Удалить из каталога"><svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 9h-7.6l-.7-9M8 8.5v4.5m4-4.5v4.5" /></svg><span>Удалить</span></button>` : ''}
        </div></article>`;
    }).join('');
    $('#noResults').hidden = matches.length > 0;
    const viewingCustomGroup = activeCategory === 'custom' || Boolean(categoryMap.get(activeCategory)?.custom);
    $('#noResultsTitle').textContent = viewingCustomGroup && !query ? 'В этой группе пока нет товаров' : 'Ничего не найдено';
    $('#noResultsText').textContent = viewingCustomGroup && !query ? 'Нажмите «Новый товар», чтобы добавить первую позицию.' : 'Измените запрос или добавьте товар в каталог.';
    const activeGroup = categoryMap.get(activeCategory);
    const showCustomTools = activeCategory === 'custom' || Boolean(activeGroup?.custom);
    $('#customTools').hidden = !showCustomTools;
    $('#customToolsTitle').textContent = activeGroup?.custom ? activeGroup.name : 'Другие товары';
    $('#customToolsText').textContent = activeGroup?.custom ? 'Добавляйте товары в эту группу или удалите её целиком.' : 'Создайте свою группу и добавляйте в неё позиции.';
    $('#deleteGroup').hidden = !activeGroup?.custom;
    renderCategories();
    refreshFooter();
  }

  function renderSummary() {
    const byId = productById();
    const lines = Object.entries(selected);
    $('#selectedList').innerHTML = lines.map(([id, item]) => {
      const product = byId.get(id) || item;
      const category = categoryMap.get(product.category);
      return `<div class="selected-item" data-selected-id="${escapeHtml(id)}">
        <div class="selected-topline"><span class="selected-name">${escapeHtml(product.name)}<small>${escapeHtml(formatQuantity(item.quantity))} ${escapeHtml(item.unit)}</small></span><button class="remove-item" type="button" data-action="remove" data-id="${escapeHtml(id)}" aria-label="Убрать товар">×</button></div>
        <div class="selected-category">${escapeHtml(category?.short || 'Мой товар')}</div>
      </div>`;
    }).join('');
    $('#orderEmpty').hidden = lines.length > 0;
    $('#itemCount').textContent = lines.length;
    $('#mobileCount').textContent = lines.length;
    $('#mobileReview').hidden = lines.length === 0;
    $('#selectionLabel').textContent = `Выбрано: ${lines.length}`;
    refreshFooter();
  }

  function syncProductCard(id) {
    const item = selected[id];
    const card = $(`[data-product-id="${CSS.escape(id)}"]`, $('#productGrid'));
    const product = productById().get(id);
    if (!card || !product) return;
    card.classList.toggle('selected', Boolean(item));
    const quantity = $('.product-quantity', card);
    if (quantity && document.activeElement !== quantity) quantity.value = item?.quantity || '0';
    const minus = $('.quantity-minus', card);
    if (minus) minus.disabled = !item;
    const badge = $('.unit-badge', card);
    const unitSelect = $('.product-unit', card);
    if (badge) { badge.hidden = Boolean(item); badge.textContent = item?.unit || product.unit; }
    if (unitSelect) { unitSelect.hidden = !item; unitSelect.value = item?.unit || product.unit; }
  }

  function refreshFooter() {
    const lines = Object.entries(selected);
    const missing = lines.filter(([, item]) => !Number.isFinite(Number(String(item.quantity).replace(',', '.'))) || Number(String(item.quantity).replace(',', '.')) <= 0);
    const chef = $('#chefName').value.trim();
    let hint = '';
    if (!lines.length) hint = '';
    else if (missing.length) hint = `Укажите количество: ${missing.slice(0, 2).map(([id]) => productById().get(id)?.name || selected[id]?.name).join(', ')}${missing.length > 2 ? ` и ещё ${missing.length - 2}` : ''}.`;
    else if (!chef) hint = 'Введите имя повара перед копированием заказа.';
    $('#validationMessage').textContent = hint;
    const validItems = lines.length > 0 && missing.length === 0 && Boolean($('#deliveryDate').value);
    $('#copyOrder').disabled = !validItems;
    $('#saveOrder').disabled = !validItems || !chef;
    $('#clearOrder').disabled = lines.length === 0;
  }

  function setQuantity(id, rawQuantity) {
    const product = productById().get(id);
    if (!product) return;
    const wasSelected = Boolean(selected[id]);
    const quantity = Number(String(rawQuantity).replace(',', '.'));
    const unit = selected[id]?.unit || product.unit;
    if (Number.isFinite(quantity) && quantity > 0) {
      selected[id] = { name: product.name, category: product.category, quantity: String(quantity), unit };
    } else delete selected[id];
    invalidateDraft();
    if (wasSelected !== Boolean(selected[id])) renderCatalog();
    else syncProductCard(id);
    renderSummary();
    persist();
  }

  function adjustQuantity(id, change) {
    const current = Number(selected[id]?.quantity || 0);
    const next = Math.max(0, current + change);
    setQuantity(id, next);
  }

  function makeOrderSnapshot() {
    const byId = productById();
    const items = Object.entries(selected).map(([id, item]) => {
      const product = byId.get(id) || item;
      const categoryId = product.category || item.category;
      return {
        id,
        name: product.name || item.name,
        category: categoryId,
        categoryName: categoryMap.get(categoryId)?.name || item.categoryName || 'Другие товары',
        quantity: String(item.quantity),
        unit: item.unit
      };
    });
    return {
      id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(), deliveryDate: $('#deliveryDate').value,
      chef: $('#chefName').value.trim(), items
    };
  }

  function validateOrder() {
    const lines = Object.entries(selected);
    if (!lines.length) { showToast('Добавьте товары в заказ.'); return false; }
    const missing = lines.filter(([, item]) => !Number.isFinite(Number(String(item.quantity).replace(',', '.'))) || Number(String(item.quantity).replace(',', '.')) <= 0);
    if (missing.length) { showToast('Укажите количество для каждого товара.'); return false; }
    if (!$('#chefName').value.trim()) {
      closeSheet();
      $('#chefName').focus();
      showToast('Введите имя повара, чтобы скопировать заказ.');
      return false;
    }
    if (!$('#deliveryDate').value) { $('#deliveryDate').focus(); showToast('Укажите дату поставки.'); return false; }
    return true;
  }

  function saveCurrentOrder() {
    if (!validateOrder()) return null;
    if (savedDraftId) {
      const existing = orders.find((order) => order.id === savedDraftId);
      if (existing) return existing;
    }
    const order = makeOrderSnapshot();
    orders.unshift(order);
    orders = orders.slice(0, 120);
    savedDraftId = order.id;
    persist();
    renderHistory();
    return order;
  }

  function formatOrder(order) {
    const categoryGroups = CATEGORIES.map((category) => ({
      category,
      items: order.items.filter((item) => item.category === category.id)
    })).filter((group) => group.items.length);
    categoryGroups.sort((a, b) => {
      const rank = (category) => {
        const messageIndex = MESSAGE_SECTION_ORDER.indexOf(category.id);
        return messageIndex >= 0 ? messageIndex : MESSAGE_SECTION_ORDER.length + CATEGORIES.indexOf(category);
      };
      return rank(a.category) - rank(b.category);
    });
    const knownCategories = new Set(CATEGORIES.map((category) => category.id));
    const extraGroups = new Map();
    for (const item of order.items) {
      if (knownCategories.has(item.category)) continue;
      const name = item.categoryName || 'Другие товары';
      if (!extraGroups.has(name)) extraGroups.set(name, []);
      extraGroups.get(name).push(item);
    }
    const extraCategoryGroups = [...extraGroups.entries()]
      .sort(([nameA], [nameB]) => nameA.localeCompare(nameB, 'ru-RU'))
      .map(([name, items]) => ({ category: { name }, items }));
    const productOrder = new Map(products.map((product, index) => [product.id, index]));
    for (const group of [...categoryGroups, ...extraCategoryGroups]) {
      group.items.sort((a, b) => {
        const indexA = productOrder.get(a.id);
        const indexB = productOrder.get(b.id);
        if (indexA !== undefined && indexB !== undefined) return indexA - indexB;
        if (indexA !== undefined) return -1;
        if (indexB !== undefined) return 1;
        return String(a.name).localeCompare(String(b.name), 'ru-RU');
      });
    }
    const orderedGroups = [...categoryGroups, ...extraCategoryGroups];
    const header = [
      `Повар: ${order.chef}`,
      `Оформлен: ${formatDateTime(order.createdAt)}`,
      `Всего позиций: ${order.items.length}`,
      '',
      'Список продуктов:'
    ];
    const body = orderedGroups.map(({ category, items }) => {
      const section = MESSAGE_SECTIONS[category.id] || { emoji: '📦', name: category.name };
      return [
        `${section.emoji} ${section.name}`,
        ...items.map((item) => `${item.name} — ${formatQuantity(item.quantity)} ${item.unit || 'шт.'}`)
      ].join('\n');
    });
    return `${header.join('\n')}\n${body.join('\n\n')}`;
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const textarea = document.createElement('textarea');
        textarea.value = text; textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed'; textarea.style.opacity = '0';
        document.body.append(textarea); textarea.select();
        const copied = document.execCommand('copy'); textarea.remove();
        if (!copied) throw new Error('copy failed');
      }
      return true;
    } catch { return false; }
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2500);
  }

  function renderHistory() {
    const query = $('#historySearch').value.trim().toLocaleLowerCase('ru-RU');
    const filtered = orders.filter((order) => {
      if (!query) return true;
      const haystack = [order.chef, order.deliveryDate, formatShortDate(order.deliveryDate), formatLongDate(order.deliveryDate), order.createdAt, ...order.items.map((item) => item.name)].join(' ').toLocaleLowerCase('ru-RU');
      return haystack.includes(query);
    });
    $('#historyCount').textContent = `${filtered.length} ${plural(filtered.length, 'заказ', 'заказа', 'заказов')}`;
    $('#historyEmpty').hidden = filtered.length > 0;
    $('#historyList').innerHTML = filtered.map((order) => {
      const deliveryText = formatShortDate(order.deliveryDate);
      const amount = order.items.length;
      const preview = order.items.slice(0, 5).map((item) => item.name).join(' · ') + (amount > 5 ? ` · ещё ${amount - 5}` : '');
      return `<article class="history-card"><div class="history-card-main">
        <div class="history-card-title">Поставка ${escapeHtml(deliveryText)} <span class="history-status">СОХРАНЁН</span></div>
        <div class="history-meta">${escapeHtml(order.chef)} · оформлен ${escapeHtml(formatDateTime(order.createdAt))} · ${amount} ${plural(amount, 'товар', 'товара', 'товаров')}</div>
        <div class="history-preview">${escapeHtml(preview)}</div>
      </div><div class="history-actions">
        <button class="history-action" type="button" data-history-action="load" data-id="${escapeHtml(order.id)}">Открыть</button>
        <button class="history-action" type="button" data-history-action="copy" data-id="${escapeHtml(order.id)}">Копировать</button>
        <button class="history-action delete-history" type="button" data-history-action="delete" data-id="${escapeHtml(order.id)}" aria-label="Удалить заказ" title="Удалить">×</button>
      </div></article>`;
    }).join('');
  }

  function loadOrder(id) {
    const order = orders.find((item) => item.id === id);
    if (!order) return;
    selected = {};
    for (const item of order.items) {
      if (!products.some((product) => product.id === item.id)) {
        const recovered = { id: item.id, name: item.name, category: categoryMap.has(item.category) ? item.category : 'sauces', unit: item.unit || 'шт.', custom: true };
        customProducts.push(recovered); products.push(recovered);
      }
      selected[item.id] = { name: item.name, category: item.category, quantity: String(item.quantity ?? ''), unit: item.unit || 'шт.' };
    }
    $('#chefName').value = '';
    $('#deliveryDate').value = order.deliveryDate || tomorrowIso();
    savedDraftId = null;
    activeCategory = 'all';
    $('#productSearch').value = '';
    $('#historyDialog').close();
    renderCatalog();
    renderSummary();
    renderClock();
    persist();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Заказ открыт для редактирования');
  }

  function openSheet() {
    if (!window.matchMedia('(max-width: 900px)').matches) return;
    $('#orderPanel').classList.add('open');
    $('#sheetScrim').hidden = false;
    document.body.classList.add('sheet-open');
  }
  function closeSheet() {
    $('#orderPanel').classList.remove('open');
    $('#sheetScrim').hidden = true;
    document.body.classList.remove('sheet-open');
  }

  function fillProductForm(preselectedCategory) {
    $('#newProductCategory').innerHTML = CATEGORIES.map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`).join('');
    if (preselectedCategory && categoryMap.has(preselectedCategory)) $('#newProductCategory').value = preselectedCategory;
    $('#newProductUnit').innerHTML = UNIT_OPTIONS.map((unit) => `<option value="${unit}">${unit}</option>`).join('');
  }

  function openProductDialog() {
    const selectedGroup = categoryMap.get(activeCategory)?.custom ? activeCategory : customGroups[0]?.id;
    if (activeCategory === 'custom' && !customGroups.length) {
      showToast('Сначала создайте группу.');
      $('#addGroupDialog').showModal();
      setTimeout(() => $('#newGroupName').focus(), 30);
      return;
    }
    $('#newProductName').value = '';
    fillProductForm(activeCategory === 'custom' ? selectedGroup : activeCategory);
    $('#addProductDialog').showModal();
    setTimeout(() => $('#newProductName').focus(), 30);
  }

  function createGroup(name) {
    const normalized = name.trim();
    if (!normalized) return;
    const duplicate = customGroups.some((group) => group.name.toLocaleLowerCase('ru-RU') === normalized.toLocaleLowerCase('ru-RU'));
    if (duplicate) { showToast('Группа с таким названием уже есть.'); return; }
    const randomId = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const group = { id: `group-${randomId}`, name: normalized };
    customGroups.push(group);
    refreshCategoryMap();
    activeCategory = group.id;
    $('#productSearch').value = '';
    persist();
    renderCatalog();
    $('#addGroupDialog').close();
    showToast('Группа создана. Теперь добавьте в неё товары.');
  }

  function deleteActiveGroup() {
    const group = categoryMap.get(activeCategory);
    if (!group?.custom) return;
    const groupProducts = products.filter((product) => product.category === group.id);
    const productCount = groupProducts.length;
    const details = productCount
      ? ` и ${productCount} ${plural(productCount, 'товар', 'товара', 'товаров')}`
      : '';
    if (!confirm(`Удалить группу «${group.name}»${details} из каталога?`)) return;
    const removedIds = new Set(groupProducts.map((product) => product.id));
    customGroups = customGroups.filter((item) => item.id !== group.id);
    customProducts = customProducts.filter((product) => product.category !== group.id);
    products = products.filter((product) => product.category !== group.id);
    for (const id of removedIds) delete selected[id];
    refreshCategoryMap();
    activeCategory = 'custom';
    invalidateDraft();
    persist();
    renderCatalog();
    renderSummary();
    showToast(`Группа «${group.name}» удалена`);
  }

  function beep() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioContext ||= new AudioContextClass();
      const context = audioContext;
      if (context.state === 'suspended') context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = 740;
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + .008);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + .075);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(); oscillator.stop(context.currentTime + .08);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    } catch { /* Звук зависит от поддержки браузера и системных настроек. */ }
  }

  $('#chefName').value = '';
  $('#deliveryDate').value = tomorrowIso();
  $('#productTotal').textContent = products.length;
  fillProductForm();
  renderClock();
  renderCatalog();
  renderSummary();
  renderHistory();
  setInterval(renderClock, 15000);

  document.addEventListener('click', (event) => {
    if (event.isTrusted && event.target.closest('button:not(:disabled)')) beep();
  }, { capture: true });

  $('#categoryNav').addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;
    renderCatalog();
  });

  $('#productGrid').addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const { action, id } = button.dataset;
    if (action === 'increment') adjustQuantity(id, 1);
    if (action === 'decrement') adjustQuantity(id, -1);
    if (action === 'delete-product') {
      const product = products.find((item) => item.id === id);
      if (!confirm(`Удалить товар «${product?.name || 'Без названия'}» из каталога?`)) return;
      customProducts = customProducts.filter((product) => product.id !== id);
      products = products.filter((product) => product.id !== id);
      delete selected[id];
      invalidateDraft(); persist(); renderCatalog(); renderSummary(); showToast('Товар удалён из каталога');
    }
  });

  $('#productGrid').addEventListener('change', (event) => {
    const quantity = event.target.closest('[data-field="quantity"]');
    if (quantity) { setQuantity(quantity.dataset.id, quantity.value); return; }
    const select = event.target.closest('[data-field="unit"]');
    if (!select || !selected[select.dataset.id]) return;
    selected[select.dataset.id].unit = select.value;
    invalidateDraft(); persist(); renderSummary();
  });

  $('#selectedList').addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="remove"]');
    if (button) setQuantity(button.dataset.id, 0);
  });

  $('#productSearch').addEventListener('input', renderCatalog);
  $('#chefName').addEventListener('input', () => { invalidateDraft(); refreshFooter(); });
  $('#deliveryDate').addEventListener('change', () => { invalidateDraft(); refreshFooter(); });
  $('#historySearch').addEventListener('input', renderHistory);

  $('#addProductOpen').addEventListener('click', openProductDialog);
  $('#addGroupOpen').addEventListener('click', () => { $('#newGroupName').value = ''; $('#addGroupDialog').showModal(); setTimeout(() => $('#newGroupName').focus(), 30); });
  $('#deleteGroup').addEventListener('click', deleteActiveGroup);
  $('#addGroupForm').addEventListener('submit', (event) => {
    event.preventDefault();
    createGroup($('#newGroupName').value);
  });
  $('#addProductForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = $('#newProductName').value.trim();
    if (!name) return;
    const randomId = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const product = { id: `custom-${randomId}`, name, category: $('#newProductCategory').value, unit: $('#newProductUnit').value, custom: true };
    customProducts.push(product); products.push(product);
    $('#addProductDialog').close();
    activeCategory = product.category;
    $('#productSearch').value = '';
    persist(); renderCatalog();
    showToast('Новый товар добавлен в каталог');
  });

  $('#historyOpen').addEventListener('click', () => { renderHistory(); $('#historyDialog').showModal(); });
  $('#historyList').addEventListener('click', async (event) => {
    const button = event.target.closest('[data-history-action]');
    if (!button) return;
    const { id, historyAction } = button.dataset;
    const order = orders.find((item) => item.id === id);
    if (!order) return;
    if (historyAction === 'load') loadOrder(id);
    if (historyAction === 'copy') {
      const chef = $('#chefName').value.trim();
      if (!chef) {
        $('#historyDialog').close();
        $('#chefName').focus();
        showToast('Введите имя повара, чтобы скопировать заказ.');
        return;
      }
      const copied = await copyText(formatOrder({ ...order, chef, createdAt: new Date().toISOString() }));
      showToast(copied ? 'Сообщение скопировано' : 'Не удалось скопировать. Попробуйте ещё раз.');
      if (copied) { $('#chefName').value = ''; invalidateDraft(); refreshFooter(); }
    }
    if (historyAction === 'delete' && confirm('Удалить этот заказ из истории?')) {
      orders = orders.filter((item) => item.id !== id);
      if (savedDraftId === id) savedDraftId = null;
      persist(); renderHistory(); showToast('Заказ удалён из истории');
    }
  });

  $('#copyOrder').addEventListener('click', async () => {
    const order = saveCurrentOrder();
    if (!order) return;
    const copied = await copyText(formatOrder(order));
    showToast(copied ? 'Заказ сохранён и скопирован' : 'Заказ сохранён, но скопировать не удалось');
    if (copied) {
      selected = {};
      $('#chefName').value = '';
      invalidateDraft();
      renderCatalog();
      renderSummary();
      persist();
      if (window.matchMedia('(max-width: 900px)').matches) closeSheet();
    }
  });
  $('#saveOrder').addEventListener('click', () => {
    const order = saveCurrentOrder();
    if (order) showToast('Заказ сохранён в истории');
  });
  $('#clearOrder').addEventListener('click', () => {
    if (!Object.keys(selected).length || !confirm('Очистить текущий список товаров?')) return;
    selected = {}; $('#chefName').value = ''; invalidateDraft(); renderCatalog(); renderSummary(); persist(); showToast('Список очищен');
  });
  $('#mobileReviewButton').addEventListener('click', openSheet);
  $('#panelClose').addEventListener('click', closeSheet);
  $('#sheetScrim').addEventListener('click', closeSheet);

  document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('[data-close-dialog]');
    if (closeButton) document.getElementById(closeButton.dataset.closeDialog)?.close();
  });
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); $('#productSearch').focus(); }
    if (event.key === 'Escape') closeSheet();
  });
})();
