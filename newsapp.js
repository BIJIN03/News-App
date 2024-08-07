const API_KEY="8e4a82b046a9493ead51af0e6ffde431";
const API_URL="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews('world'));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res=await fetch(`${API_URL}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer=document.getElementById('card-container');
    const newsTemplateCard=document.getElementById('template-news-card');

    cardsContainer.innerHTML='';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cloneCard=newsTemplateCard.content.cloneNode(true);
        fillCardData(cloneCard, article);
        cardsContainer.appendChild(cloneCard);
    });
}

function fillCardData(cloneCard, article) {
    const newsImage=cloneCard.querySelector('#news-image');
    const newsTitle=cloneCard.querySelector('#news-title');
    const newsDescription=cloneCard.querySelector('#news-desc');
    const newsSource=cloneCard.querySelector('#news-source');

    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;
    
    const date=new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    newsSource.innerHTML=`${article.source.name} - ${date}`;

    cloneCard.firstElementChild.addEventListener('click', () => window.open(article.url,"_blank"));
}

let curSelectedNav=null;
function onNavClick(id){
    const newsInput=document.getElementById('news-input');
    newsInput.value='';
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const newsInput=document.getElementById('news-input');
const searchBtn=document.getElementById('news-btn');
searchBtn.addEventListener('click', () => {
    if(!newsInput.value) return;
    curSelectedNav?.classList.remove('active');
    fetchNews(newsInput.value);
});