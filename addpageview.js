import View from './View.js'
class AddPageView extends View{
   _parentEl = document.querySelector('form');
   addBtn = document.querySelector('.addBtn');
   closeBtn = document.querySelector('.btnClose');
   addPage = document.querySelector('.addPage');
   overlay = document.querySelector('.overlay');
   constructor(){
      super()
      this.addBtn.addEventListener('click',this.addPageOpen.bind(this));
      
      this.closeBtn.addEventListener('click',this.addPageOpen.bind(this))
   }
   
   addPageOpen(){
     this.overlay.classList.toggle('hidden')
     this.addPage.classList.toggle('hidden')
   }
   
   uploadRecipe(handler){
      this._parentEl.addEventListener('submit',function(e){
         e.preventDefault()
         let dataArr = [...new FormData(this)]
         let data = Object.fromEntries(dataArr)
         handler(data)
      })
   }
   
}
export default new AddPageView()