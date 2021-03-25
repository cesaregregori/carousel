import { createElement } from './util.js';
import { Card } from './card.js';
import { getRandomArbitrary, secondsToHHmm } from './util.js';

class Carousel{    
    
    constructor(options){

        this.title = options.title;

        this.subtitle = options.subtitle;

        this.fetchCards = options.fetchCards;
        
        this.container = document.getElementById(options.container);
        
        this.cards=[];

        this.chunkSize = 6;
        
        this.carousel = createElement('div','carousel'); 

        this.makeCarousel();
        
        this.addCards();

    }

    fetchNewCards(size){
        console.log('fetch');
        return this.fetchCards(size)
        .then(data => {
            for (let index = 0; index < data.length; index++){
                const element = data[index];
                const lastIndex = (this.cards.length - 1 - index);                
                //img
                this.cards[lastIndex].querySelector('.card-img').style.backgroundImage = `url('${element.image}')`;
                //type
                this.cards[lastIndex].querySelector('.card-type').innerHTML = element.type;
                //duration
                this.cards[lastIndex].querySelector('.card-duration').innerHTML = secondsToHHmm(element.duration);
                //title
                this.cards[lastIndex].querySelector('.card-title').innerHTML = element.title;
                
            }
            
        })
        .catch((error) => {
            console.error('ERR: ', error);
        });       

    }

    addPlaceholderCards(size){
        for (let index = 0; index < size; index++) {
            this.cards.push(new Card().htmlCard);                
        }
    }

    renderCards(){
        this.cards.forEach(element => {
            this.carousel.appendChild(element);                
        });    
    }

    addCards(){
        this.addPlaceholderCards(this.chunkSize);
        this.renderCards();

        this.fetchNewCards(this.chunkSize).then(()=>{
            this.renderCards();
        })
    }

    makeCarousel(){

        let icon = createElement('span',['carousel-icon','material-icons'],'wb_incandescent');

        let title = createElement('h2','carousel-title',this.title); 
        
        let subtitle = createElement('p','carousel-subtitle',this.subtitle); 
        
        let left = createElement('div','carousel-left'); 
        let right = createElement('div','carousel-right'); 
        
        let iconLeft = createElement('span','material-icons','chevron_left');
        let iconRight = createElement('span','material-icons','chevron_right');
        

        this.container.appendChild(icon);
        this.container.appendChild(title);
        this.container.appendChild(subtitle);
        this.container.appendChild(left);
        this.container.appendChild(right);
        
        left.appendChild(iconLeft);
        right.appendChild(iconRight);

        left.addEventListener("click", () => {
            this.scrollHandler(this.carousel, 'left');
        });
        right.addEventListener("click", () => {
            this.scrollHandler(this.carousel, 'right');
        });

        this.container.style.position='relative';
        this.container.appendChild(this.carousel);

    }


    scrollHandler(element, direction){
        let width = element.offsetWidth;
        let amount = element.scrollLeft;

        direction === 'left' ? amount -= width : amount += width;
        
        if(direction==='right'){
            let size = parseInt(getRandomArbitrary(1,2)) * this.chunkSize;
            let needsToFetch = (element.scrollLeft + element.offsetWidth) === element.scrollWidth;
            
            if(needsToFetch){
                this.addPlaceholderCards(size);
                this.renderCards();                   
                this.container.querySelector('.carousel-right').style.visibility='hidden';                    
                this.fetchNewCards(size)
                .then(() => {
                    this.renderCards();
                    this.container.querySelector('.carousel-right').style.visibility='visible';
                });    
            }

            element.scroll({
                left: amount,
                behavior: 'smooth'
            }); 

        }else if(direction==='left'){
            element.scroll({
                left: amount,
                behavior: 'smooth'
            });            
        }
    }
    

}

export {Carousel}