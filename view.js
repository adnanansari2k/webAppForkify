export default class  View {
      _data;
   
   render(data) {
    
      if(!data || (Array.isArray(data) && data.length === 0)) return this.errorRender()
      this._data = data
      let markup = this._genrateMarkup()
      this._parentEl.innerHTML = ''
      this._parentEl.insertAdjacentHTML('afterbegin', markup)
   }
   
   update(data){
      if(!data || (Array.isArray(data) && data.length === 0)) 
      return this.errorRender()
      this._data = data
      let newMarkup = this._genrateMarkup() 
      const newDom = document.createRange().createContextualFragment(newMarkup)
      let newElements = Array.from(newDom.querySelectorAll('*'))
      let curElements = Array.from(this._parentEl.querySelectorAll('*'))
      newElements.forEach((newEl,i)=>{
         let curEl = curElements[i];
         if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
            curEl.textContent = newEl.textContent
         }
         
         if(!newEl.isEqualNode(curEl)) {
            Array.from(newEl.attributes).forEach(attr=>{
               curEl.setAttribute(attr.name,attr.value)
            })
         }
      })
   }
   
   errorRender(){
      let html = `
           <div class="error">
                     <p>
                        We could not find recipe Try to search another Recipe <span class="material-symbols-outlined">
                        warning
                        </span>
                      </p>
                  </div>
      `
     this._parentEl.innerHTML = ''
     this._parentEl.insertAdjacentHTML('afterbegin',html)
   }
   
   loading(){
   let html = `
        <div class='loader'>
        <span class="material-symbols-outlined">
        hourglass_top
        </span>
        </div>
   `
   this._parentEl.innerHTML = ''
   this._parentEl.insertAdjacentHTML('afterbegin',html)
         
      }
   

}