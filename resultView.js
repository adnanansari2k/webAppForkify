import View from './View.js'
class ResultView extends View{
   _parentEl = document.querySelector('.reciepList')
   _genrateMarkup(){
   return  this._data.map(this._genrateMarkupPreview).join('')
     
   }
   
   _genrateMarkupPreview(result){
    return `
        <li class="reciep">
               <img src='${result.image}' alt="reciep" class="reciepImgList">
               <a href='#${result.id}'>
               <h6 class="reciepTitleList">
                  ${result.title}
               </h6></a>
               <h6 class="publisher">
                  ${result.publisher}
               </h6>
            </li>
            
      `
   }
}

export default new ResultView()