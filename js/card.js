import { createElement, secondsToHHmm  } from './util.js';

class Card{
    constructor(card){
        this.image = card?.image || '/images/gray.png';
        this.type = card?.type || 'type';
        this.duration = card?.duration || 3600;
        this.title = card?.title || 'title';
        this.cardinality = card?.cardinality || 'single';
        
        this.htmlCardElements = [];
        this.htmlCard =  createElement('div', ['card', this.cardinality]);
        
        this.makeCard();
    }

    makeCard(){
        
        let img = createElement('div', 'card-img');
        this.htmlCardElements.push(img);

        let type = createElement('span', 'card-type', this.type);
        this.htmlCardElements.push(type);
        
        let duration = createElement('span', 'card-duration', secondsToHHmm(this.duration));
        this.htmlCardElements.push(duration);

        let content = createElement('div', 'card-content');

        let title = createElement('div', 'card-title', this.title);
        this.htmlCardElements.push(title);

        img.style.backgroundImage = `url('${this.image }')`;

        img.appendChild(type);
        img.appendChild(duration);
        
        content.appendChild(title);

        this.htmlCard.appendChild(img);
        this.htmlCard.appendChild(content);

        return this.htmlCard;
    }
}

export {Card}