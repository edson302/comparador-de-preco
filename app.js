const searchform=document.querySelector('.search-form')


const productlist=document.querySelector('.product-list')
const priceChart=document.querySelector('.price-chart')
let mychart=''
searchform.addEventListener('submit',async function (event) {
    
event.preventDefault()
const inputValue =event.target[0].value

const data= await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`)
const products=(await data.json()).results.slice(0, 10)


displayItens(products)
UpdatePriceChart(products)
})


function displayItens(products) {
    productlist.innerHTML=products.map(prod =>`<div class="product-card"> 
        
        <img src="${prod.thumbnail.replace(/\w\.jpg/gi,'W.jpg')}" alt="${prod.title}" >
        <h3>${prod.title}</h3>
        <p class="product-price">${prod.price.toLocaleString('pt-br',{style:"currency", currency:"BRL"})}</p>
         <p class="product-store">Loja:${prod.seller.nickname}</p>
        </div> `).join('')
}

function UpdatePriceChart(products) {
    const ctx=priceChart.getContext('2d');

    if (mychart) {
        mychart.destroy();
        }
        mychart = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: products.map(p => p.title.substring(0, 20) + '...'),
            datasets: [{
            label: 'Preço (R$)',
            data: products.map(p => p.price),
            backgroundColor: 'rgba(46, 204, 113, 0.6)',
            borderColor: 'rgba(46, 204, 113, 1)',
            borderWidth: 1
            }]
            },options:{

                responsive:true,

                y: {
                    beginAtZero: true,
                    ticks: {
                    callback: function(value) {
                    console.log(value)
                    
                    return 'R$ ' + value.toFixed(2);
                    }
                    }
                    }
            },
            plugins: {
                legend: {
                display: false
                },
                title: {
                display: true,
                text: 'Comparação de Preços',
                font: {
                size: 18
                }
                }
                }
                
        
        })

}