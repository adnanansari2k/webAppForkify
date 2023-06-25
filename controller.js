import * as model from './model.js'
import reciepView from './recipeView.js'
import searchView from './searchView.js'
import ResultView from './resultView.js'
import PaginationView from './paginationView.js'
import BookmarkView from './bookmarkView.js'
import AddPageView from './addpageview.js'
let bookmarkBtn = document.querySelector('.bookmark')
let bookmarkPage = document.querySelector('.bookmarks')
     bookmarkBtn.addEventListener('click',function(){
        console.log('clicked');
      bookmarkPage.classList.toggle('hidden')
     })
   
const showReciep = async function() {
   try {
      
      let id = window.location.hash.slice(1);
      if (!id) return;
      reciepView.loading()
      await model.loadRecipe(id)
      reciepView.render(model.state.recipe)
   
   } catch (err) {
      reciepView.errorRender()
   }
}

const searchController = async function() {
   try {
      ResultView.loading()
      let query = searchView.getQuery()

      if (!query) return
      await model.loadSerchReciep(query)
      ResultView.render(model.searchResultPerPage(1))
      PaginationView.render(model.state.search)
   }
   catch (err) {
      ResultView.errorRender(err)
   }
}

function paginationEvent(goTo){
   ResultView.render(model.searchResultPerPage(goTo))
   PaginationView.render(model.state.search)
}

const servingsContoller=function(update){
   model.updateServings(update)
   reciepView.update(model.state.recipe)
}

const bookmarkController=function (){
  if(!model.state.recipe.bookmark) 
  {model.bookmarkRecipe(model.state.recipe)}else{
     model.deleteBookmark(model.state.recipe.id)
  }
  
   reciepView.update(model.state.recipe)
   
   BookmarkView.render(model.state.bookmarks)
   
}


const storeBookmarkController=function(){
   BookmarkView.render(model.state.bookmarks)
}

const addPagecontroller =async function(newRecipe){
  
 await  model.uploadData(newRecipe)
 BookmarkView.render(model.state.bookmarks)
 
 window.history.pushState(null,'',`#${model.state.recipe.id}`);
 reciepView.render(model.state.recipe)
 setTimeout(function(){
    AddPageView.addPageOpen()
 }, 1000)
}

function init() {
   reciepView.eventHandler(showReciep)
   reciepView.servingsHandler(servingsContoller)
   reciepView.bookmarkHandler(bookmarkController)
   searchView.addEventHandler(searchController)
   PaginationView.addEventHandler(paginationEvent)
   BookmarkView.storeBookmarkHandler(storeBookmarkController)
   AddPageView.uploadRecipe(addPagecontroller)
}

init()