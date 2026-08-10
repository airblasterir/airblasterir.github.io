
(function(){
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.navlinks');
  if(toggle&&nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'))}
  document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav&&nav.classList.remove('open')));
  const year=document.querySelector('[data-year]');
  if(year) year.textContent=new Date().getFullYear();

  const searchForm=document.querySelector('[data-search-form]');
  if(searchForm){
    searchForm.addEventListener('submit',function(e){
      e.preventDefault();
      const q=(document.querySelector('#site-search').value||'').trim().toLowerCase();
      const cards=[...document.querySelectorAll('[data-search-item]')];
      let found=0;
      cards.forEach(c=>{
        const hit=!q || c.textContent.toLowerCase().includes(q);
        c.classList.toggle('hidden',!hit); if(hit) found++;
      });
      const result=document.querySelector('[data-result]');
      if(result) result.textContent=q ? `${found} مورد مرتبط پیدا شد.` : 'برای شروع جستجو، عبارت خود را وارد کنید.';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const el=document.querySelector(this.getAttribute('href'));
      if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'})}
    })
  });
})();

// Premium product gallery / quote workflow
(function(){
  const root=document.querySelector('[data-lightbox-root]');
  const items=[...document.querySelectorAll('[data-lightbox]')];
  if(root&&items.length){
    const img=root.querySelector('[data-lightbox-image]');
    const caption=root.querySelector('[data-lightbox-caption]');
    let current=0;
    const open=(index)=>{
      current=(index+items.length)%items.length;
      const source=items[current].querySelector('img');
      img.src=source.src; img.alt=source.alt||''; caption.textContent=source.alt||'';
      root.classList.add('open');root.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
    };
    const close=()=>{root.classList.remove('open');root.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    items.forEach((item,i)=>item.addEventListener('click',()=>open(i)));
    root.querySelector('[data-lightbox-close]').addEventListener('click',close);
    root.querySelector('[data-lightbox-prev]').addEventListener('click',()=>open(current-1));
    root.querySelector('[data-lightbox-next]').addEventListener('click',()=>open(current+1));
    root.addEventListener('click',e=>{if(e.target===root)close()});
    document.addEventListener('keydown',e=>{if(!root.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')open(current+1);if(e.key==='ArrowRight')open(current-1)});
  }

  const form=document.querySelector('[data-quote-form]');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const data=new FormData(form);
      const get=k=>(data.get(k)||'').toString().trim();
      const subject='استعلام قیمت ایر بلاستر مارتین XHV - '+(get('name')||'درخواست جدید');
      const body=[
        'سلام، برای خرید/استعلام ایر بلاستر مارتین XHV درخواست بررسی دارم.',
        '',
        'نام و شرکت: '+get('name'),
        'شماره تماس: '+get('phone'),
        'مدل موردنظر: '+get('model'),
        'فشار هوای در دسترس: '+get('pressure'),
        'نوع ماده: '+get('material'),
        'محل نصب: '+get('location'),
        'توضیحات پروژه: '+get('details'),
        '',
        'در صورت نیاز، عکس/نقشه تجهیز را نیز به ایمیل پیوست می‌کنم.'
      ].join('\n');
      const href='mailto:info@airblaster.ir?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      const success=form.querySelector('[data-form-success]');
      success.hidden=false;
      success.innerHTML='درخواست شما آماده شد. <a href="'+href+'">برای باز کردن ایمیل و ارسال درخواست اینجا کلیک کنید ←</a><br><small>اگر فایل دارید، پس از باز شدن ایمیل آن را پیوست کنید.</small>';
      success.scrollIntoView({behavior:'smooth',block:'nearest'});
    });
  }
})();
