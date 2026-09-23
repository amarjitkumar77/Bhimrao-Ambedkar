const search=document.getElementById('search');
const clearBtn=document.getElementById('clearBtn');
const pages=[...document.querySelectorAll('.pdf-page')];
const themeBtn=document.getElementById('themeBtn');
const topBtn=document.getElementById('topBtn');
const progressBar=document.getElementById('progressBar');

search.addEventListener('input',()=>{
  const q=search.value.trim().toLowerCase();
  pages.forEach(page=>{
    const text=page.querySelector('.page-text').innerText.toLowerCase();
    page.classList.toggle('hidden',q && !text.includes(q));
  });
});
clearBtn.addEventListener('click',()=>{search.value='';search.dispatchEvent(new Event('input'));});
themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  themeBtn.textContent=document.body.classList.contains('dark')?'Light Mode':'Dark Mode';
});
topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

document.querySelectorAll('.copy-btn').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    const page=pages[Number(btn.dataset.page)-1];
    try{
      await navigator.clipboard.writeText(page.querySelector('.page-text').innerText);
      const old=btn.textContent;btn.textContent='Copied!';setTimeout(()=>btn.textContent=old,1200);
    }catch(e){alert('Copy failed. Please select the text manually.');}
  });
});
window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progressBar.style.width=max>0?(window.scrollY/max*100)+'%':'0%';
});
