import View from './View.js'
class PaginationView extends View {
   _parentEl = document.querySelector('.buttons')
   
   addEventHandler(handler){
     this._parentEl.addEventListener('click',function(e){
        let btn = e.target.closest('.btn')
        if(!btn) return 
        let goTo = +btn.dataset.goto
        
        handler(goTo)
     })
   }
   
   _genrateMarkup(){
      const numberOfPages = Math.ceil(this._data.results.length / this._data.perPage)
      if(this._data.currentPage === 1 && numberOfPages >1){
         
         return `
          <button class="hide btn" disabled></button>
         <input data-goto='${this._data.currentPage+1}' type="button" value="Page ${this._data.currentPage+1}" class="next btn">
           
         `
      }
      if(this._data.currentPage === numberOfPages && numberOfPages > 1){
         return ` <input data-goto='${this._data.currentPage-1}' type="button" value="Page ${this._data.currentPage -1}" class="previous btn">`
      }
      if(this._data.currentPage < numberOfPages){
         return `  <input data-goto='${this._data.currentPage-1}' type="button" value="Page ${this._data.currentPage - 1}" class="previous btn">
          <input data-goto='${this._data.currentPage+1}' type="button" value="Page  ${this._data.currentPage+1}" class="next btn">
         `
      }
      return ''
   }
   
 }
 
 export default new PaginationView()