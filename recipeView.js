import View from './View.js'
class RecipeView extends View {
   _parentEl = document.querySelector('.reciepContainer')
   
   eventHandler(handle){
      let event = ['hashchange', 'load']
      event.forEach(ev => window.addEventListener(ev, handle))
   }
   
   servingsHandler(handler){
    
      this._parentEl.addEventListener('click',function(e){
         let btn = e.target.closest('.btn2')
         if(!btn) return ;
         let update = +btn.dataset.update  
        if(update>0) handler(update)
      })
   }
   
   bookmarkHandler(handler){
      this._parentEl.addEventListener('click',function(e){
         let btn = e.target.closest('.saved')
         if(!btn) return 
         handler()
      })
   }
   
   _genrateMarkup(){
      return `
                 <img src="${this._data.image}" alt="" class="reciepImg">
                       <h1 class="title">${this._data.title}</h1>
                       <div class="rciepHeader">
                          <label for="cookingTime"><span class="material-symbols-outlined">
                                schedule
                             </span></label>
                          <h6 class="cookingTime">${this._data.cookingTime} Minutes</h6>
                          <label for="servings"><span class="material-symbols-outlined">
                                person
                             </span></label>
                          <h6 class="servings">${this._data.servings} People</h6>
                          <input class="minus btn2" type="button" value="-" data-update = ${this._data.servings -1 }>
              
                          <input class="plus btn2" type="button" value="+" data-update = ${this._data.servings +1 }>
                          <span class="material-symbols-outlined saved ${this._data.bookmark? 'savedActive' :  ''          }">
                             bookmark
                          </span>
                       </div>
                       <div class="reciepIngredients">
                          <h6 class="iTitle">Recipe Ingredients</h6>
                          <ul class="ingredients">
                          ${this._data.ingredients.map(ing=>{
                             return `
                               <li class="ingredient">
                                <p class="ingredientDetails">
                                   ${ing.quantity? ing.quantity :' '} ${ing.unit} ${ing.description}
                                </p>
                             </li>
                             `
                          }).join('')}
                            
                          </ul>
                       </div>
                       <h class="cdTitle">How to Cook it</h>
                       <input class="websiteButton" type="button" value="Check our Website➡️">
      
     `
   }
} 

export default new RecipeView()