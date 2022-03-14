class ExplosionGallery
{
    constructor(id)
    {
        this.gallery = document.getElementById(id);
        this.cards = [...this.gallery.querySelectorAll(".card")];
        
        this.cardsNum = this.cards.length;
        this.index = 0;  
        this.limit = 4;       
        this.minWidth = 1023;
        this.minHeight = 600;        

        this.getSizes();
        this.initModal();        
        this.events();
    }

    getSizes()
    {
        this.modalWidth = Math.max(window.innerWidth, this.minWidth);
        this.modalHeight = Math.max(window.innerHeight, this.minHeight);
        this.galleryWidth = this.gallery.getBoundingClientRect().width;        
        this.cardWidth = this.cards[0].getBoundingClientRect().width;
        this.cardHeight = this.cards[0].getBoundingClientRect().height;        
    }

    initModal()
    {
        this.modal = document.createElement("div");
        this.modal.classList.add("explosion");

        const imgsList = this.cards.map(link =>
            `<img src="${link.href}" alt="${link.dataset.title}" class="explosion__img">`)
                                  .join("");      

        this.modal.innerHTML = `            
            ${imgsList}           
            <div class="explosion-actions" id="explosion-actions">
                <button class="explosion__close" id="modal-close"><img src="img/icons/close.svg" alt="close icon"></button> 
                <div class="explosion-nav">
                    <button class="explosion__btn explosion__btn_up" id="btn-prev"></button>
                    <span class="explosion__counter" id="counter">1/${this.cardsNum}</span>
                    <button class="explosion__btn explosion__btn_down" id="btn-next"></button>
                </div>                
            </div>
            <div class="explosion-description" id="explosion-description">
                <div class="explosion-description-wrapper" id="explosion-description-wrapper">
                    <h2 class="explosion__title" id="explosion-title"></h2>
                    <p class="explosion__text" id="explosion-text"></p>
                </div>
            </div>                       
        `;         
        
        document.body.append(this.modal);  
        
        this.modalClose = document.getElementById("modal-close"); 
        this.explosionActions = document.getElementById("explosion-actions"); 
        this.explImgs = this.modal.querySelectorAll(".explosion__img"); 
        this.navBtnNext = document.getElementById("btn-next");
        this.navBtnPrev = document.getElementById("btn-prev");
        this.counter = document.getElementById("counter");
        this.explDescr = document.getElementById("explosion-description");
        this.explosionDescrWrapper = document.getElementById("explosion-description-wrapper");
        this.explTitle = document.getElementById("explosion-title");
        this.explTextNode = document.getElementById("explosion-text");      
        
    }

    setImgsSizes()
    {
        this.explImgs.forEach((img, i) =>
        {
            img.style.width = this.cardsData[i].width + "px";
            img.style.height = this.cardsData[i].height + "px";
        });
    }

    setImgsInitialPositions()
    {
        this.explImgs.forEach((img, i) =>
        {
            img.style.transform = `translate3d(${this.cardsData[i].left.toFixed(1)}px,
                                               ${this.cardsData[i].top.toFixed(1)}px, 0)`;            
        });        
    }

    groupImages()
    {
        this.prevHiddenImgs = [];
        this.prevImgs = [];
        this.activeImg = null;
        this.nextImgs = [];
        this.nextHiddenImgs = [];

        this.explImgs.forEach((img, i) =>
        {            
            if(i + this.limit < this.index) this.prevHiddenImgs.unshift(img);
            else if(i < this.index) this.prevImgs.unshift(img);
            else if(i === this.index) this.activeImg = this.explImgs[i];
            else if(i - this.index <= this.limit) this.nextImgs.push(img);
            else this.nextHiddenImgs.push(img);           
        });       
       
    }

    styleImages()
    {       
        
        this.prevHiddenImgs.forEach(img =>
            this.setImgStyles(img,
            {                
                opacity: "0",
                zIndex: 1,
                transform: `translate3d(${0.3 * this.modalWidth}px, ${-this.modalHeight}px, 0) scale(0.4)`
            })
       );

        this.setImgStyles(this.prevImgs[0],
        {            
            opacity: "0.4",
            zIndex: 1,
            transform: `translate3d(${0.24 * this.modalWidth}px, ${this.modalHeight - this.cardHeight}px, 0) scale(0.75)`
        });
        
        this.setImgStyles(this.prevImgs[1],
        {            
            opacity: "0.3",
            zIndex: 1,
            transform: `translate3d(${0.06 * this.modalWidth}px, ${0.33 * this.modalHeight}px, 0) scale(0.6)`
        });
        
        this.setImgStyles(this.prevImgs[2],
        {            
            opacity: "0.2",
            zIndex: 1,
            transform: `translate3d(${0.15 * this.modalWidth}px, 0, 0) scale(0.5)`
        });
        
        this.setImgStyles(this.prevImgs[3],
        {            
            opacity: "0.1",
            zIndex: 1,
            transform: `translate3d(${0.3 * this.modalWidth}px, ${-0.15 * this.modalHeight}px, 0) scale(0.4)`
        });        
        
        this.setImgStyles(this.activeImg,
        {   
            opacity: 1,         
            transform: `translate3d(${(this.modalWidth - this.cardWidth) / 2}px,
                                    ${(this.modalHeight - this.cardHeight) / 2}px, 0)
                        scale(1.2)`,
            zIndex: 3
        });

        this.setImgStyles(this.nextImgs[0],
        {           
            opacity: "0.4",
            zIndex: 2,
            transform: `translate3d(${0.52 * this.modalWidth}px, 0, 0) scale(0.75)`
        });
    
        this.setImgStyles(this.nextImgs[1],
        {            
            opacity: "0.3",
            zIndex: 1,
            transform: `translate3d(${0.71 * this.modalWidth}px, ${0.12 * this.modalHeight}px, 0) scale(0.6)`
        });
    
        this.setImgStyles(this.nextImgs[2],
        {           
            opacity: "0.2",
            zIndex: 1,
            transform: `translate3d(${0.66 * this.modalWidth}px, ${0.46 * this.modalHeight}px, 0) scale(0.5)`
        });
    
        this.setImgStyles(this.nextImgs[3],
        {           
            opacity: "0.1",
            zIndex: 1,
            transform: `translate3d(${0.53 * this.modalWidth}px, ${0.67 * this.modalHeight}px, 0) scale(0.4)`
        });

        this.nextHiddenImgs.forEach(img =>        
            this.setImgStyles(img,
            {                
                opacity: "0",
                zIndex: 1,
                transform: `translate3d(${0.53 * this.modalWidth}px, ${ this.modalHeight}px, 0) scale(0.4)`
            })
        ); 
    }

    setImgStyles(img, styles)
    {
        if(!img) return;

        const keys = Object.keys(styles);
        keys.forEach(key => img.style[key] = styles[key]);
    }    

    setDescription(hasAnimation = false)
    {
        const { title, description } = this.cards[this.index].dataset;

        if(!hasAnimation)
        {
            this.explTitle.innerText = title;
            this.explTextNode.innerText = description; 
        }
        else
        {
            this.explosionDescrWrapper.style.opacity = 0;

            setTimeout(() =>
            {
                this.explTitle.innerText = title;
                this.explTextNode.innerText = description;

                this.explosionDescrWrapper.style.opacity = 1;

            }, 250);
        }       
               
    }

    placeActions()
    {        
        this.explosionActions.style.top = `${(this.modalHeight - this.cardHeight * 1.2) / 2}px`;
        this.explosionActions.style.height = `${350 - ((1903 - this.modalWidth) * 70) / 880}px`;        

        this.setCounter();
    }

    setCounter()
    {
        if(this.index + 1 === 1)
        {
            switchBtnState(this.navBtnPrev, true);
            switchBtnState(this.navBtnNext, false);            
        }            
        else if(this.index + 1 === this.cardsNum)
        {
            switchBtnState(this.navBtnPrev, false);
            switchBtnState(this.navBtnNext, true); 
        }
        else
        {
            switchBtnState(this.navBtnPrev, false);
            switchBtnState(this.navBtnNext, false);
        }       
        
        this.counter.innerText = `${this.index + 1}/${this.cardsNum} `;
    }      

    events()
    {
        const throttledResize = throttle(this.resize);
        window.addEventListener("resize", throttledResize);
        window.addEventListener("keydown", this.onKeyDown);

        this.gallery.addEventListener("click", this.onClick);
        this.modalClose.addEventListener("click", this.onModalClose);
        this.explosionActions.addEventListener("click", this.onActionsClick);
    }

    resize = () =>
    {
        this.getSizes();

        if(!this.modal.classList.contains("explosion_opened"))
            return;  

        this.cardsData = this.cards.map(card => card.getBoundingClientRect());        

        this.setImgsSizes();
        this.styleImages(); 
        this.placeActions();              

    }

    onKeyDown = e =>
    {
        if(!this.modal.classList.contains("explosion_opened"))
            return;        

        if(e.key === "Escape")
            this.onModalClose();
        else if(e.key === "ArrowLeft" || e.key === "ArrowUp")
        {
            e.preventDefault();
            this.changeImage(-1);
        }            
        else if(e.key === "ArrowRight" || e.key === "ArrowDown")
        {
            e.preventDefault();
            this.changeImage(1);
        }
      
    }

    onClick = e =>
    {
        e.preventDefault();        

        const card = e.target.closest("a");

        if(!card || this.modal.classList.contains("explosion_opening")) return;        

        this.index = +card.dataset.index; 
        this.cardsData = this.cards.map(card => card.getBoundingClientRect());        
        
        this.setImgsSizes();
        this.setImgsInitialPositions();        

        this.modal.classList.add("explosion_opening"); 
         
        fadeIn(this.modal, () =>
        {
            this.modal.classList.remove("explosion_opening");
            this.modal.classList.add("explosion_opened");

            this.groupImages();
            this.styleImages();
            this.setDescription();
            this.placeActions();                         
            
        });        
        
    }    

    onModalClose = () =>
    {   
        this.modal.classList.remove("explosion_opened");
        this.modal.classList.add("explosion_closing");

        this.setImgsInitialPositions();

        this.explImgs.forEach(img =>
        {
            img.style.opacity = 1;
            img.style.transform += "scale(1)";
        });         

        fadeOut(this.modal, () =>
        {    
            this.modal.classList.remove("explosion_closing");           
        });      
       
    }

    onActionsClick = e =>
    {
        if(e.target.id !== "btn-prev" &&
           e.target.id !== "btn-next" ) return;

        const btn = e.target;  

        let shift = btn.id === "btn-prev" ? -1 : 1; 
        
        this.changeImage(shift);              

    }

    changeImage = shift =>
    { 
        if(this.index === 0 && shift < 0 ||
           this.index === this.cardsNum - 1 && shift > 0)
            return;

        this.index += shift;    

        this.groupImages();
        this.styleImages();
        this.setDescription(true);
        this.setCounter();        
        
    }
}

function switchBtnState(btn, disabled = false)
{
    if(btn.disabled === disabled) return;

    btn.disabled = disabled;
}

function fadeIn(node, callback)
{
    let opacity;

    animate();

    function animate()
    {
        opacity = +node.style.opacity;       

        if(opacity < 1)
        {              
            opacity += .1;   

            node.style.opacity = opacity;

            window.requestAnimationFrame(animate);
            return;
        }

        if(callback) callback();
       
    }
}

function fadeOut(node, callback)
{
    let opacity;

    animate();

    function animate()
    {
        opacity = +node.style.opacity; 

        if(opacity > 0)
        {
            opacity -= .025;        

            node.style.opacity = opacity;

            window.requestAnimationFrame(animate);
            return;
        }

        if(callback) callback();       
    }
}

function throttle(callback, delay = 100)
{
    let isWaiting = false;
    let savedThis = null;
    let savedArgs = null;

    return function handler(...args)
    {
        if(isWaiting)
        {
            savedThis = this;
            savedArgs = args;
            return;
        } 

        callback.apply(this, args);        

        isWaiting = true;

        setTimeout(() =>
        {   
            isWaiting = false;             

            if(savedThis !== null) 
            {
                handler.apply(savedThis, savedArgs);
                savedThis = null;
            }           

        }, delay);
    }
}

new ExplosionGallery("gallery");