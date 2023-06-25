class SearchView{
   #parentEl = document.querySelector('.search');
   getQuery(){
      
      let query= this.#parentEl.value 
      this.#clear()  
      return query
   }
   #clear(){
       this.#parentEl.value = ''
   }
   addEventHandler(handler){
     
      this.#parentEl.addEventListener('change',()=>handler())
   }
   
}
export default new SearchView()