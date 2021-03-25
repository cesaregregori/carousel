/**
 * 
 * @param {*} tag 
 * @param {*} classList 
 * @returns HTML element
 */
function createElement(tag, classList, text){
    let el = document.createElement(tag);
    
    let classes = [].concat(classList);
    el.classList.add(...classes);
    
    let txt = document.createTextNode(text||'');
    el.appendChild(txt);
    
    return el;    

}

/**
 * 
 * @param {*} chunkSize 
 */
function fetchData(chunkSize){
        
    let _chunkSize = chunkSize || 1;
    
    let _url = 'data.json';
    
    return delay(getRandomArbitrary(300,3600))
    .then(()=>{
        return fetch(_url)
        .then((response)=> {
            return response.json();
        })
        .then((data) => {
            return chooseRandom(data, _chunkSize)   
        });    
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function chooseRandom(arr, num = 1){
    const res = [];
    for(let i = 0; i < num; ){
       const random = Math.floor(Math.random() * arr.length);
       if(res.indexOf(arr[random]) !== -1){
          continue;
       };
       res.push(arr[random]);
       i++;
    };
    return res;
 };

/**
 * 
 * @param {*} seconds 
 * @returns 
 */
function secondsToHHmm(seconds) {
    var measuredTime = new Date(null);
    measuredTime.setSeconds(seconds); 
    return measuredTime.toISOString().substr(11, 8);
}

export{
    createElement,
    fetchData,
    secondsToHHmm,
    getRandomArbitrary
}