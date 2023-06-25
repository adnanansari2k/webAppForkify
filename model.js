import  {AJAX} from './config.js'
export const state ={
   recipe :{},
   search:{
      query:'',
      results:[],
      currentPage:1,
      perPage:4
   },
   bookmarks:[]
} 

const dataConvert = function (data){
   let { recipe } = data.data
     return {
         cookingTime: recipe.cooking_time,
         id: recipe.id,
         image: recipe.image_url,
         ingredients: recipe.ingredients,
         publisher: recipe.publisher,
         title: recipe.title,
         servings: recipe.servings,
         sourceUrl: recipe.source_url,
         ...(recipe.key && {key:recipe.key})
      }
      
}
export const loadRecipe = async function (id){
   try {
      
      let data = await AJAX(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=2eda5d09-ac91-4f15-9b52-fb88a308d28c`)
      
      state.recipe = dataConvert(data)
         if(state.bookmarks.some(b=>b.id=== id)){
         state.recipe.bookmark = true
      }else{
         state.recipe.bookmark = false
      }
      
   } catch (e) {
      throw e
   }
} 

export const loadSerchReciep=async function(query){
   try {
      state.search.query = query
      let data = await AJAX(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=2eda5d09-ac91-4f15-9b52-fb88a308d28c`)
      state.search.results = data.data.recipes.map(res =>{
         return {
         id: res.id,
         image: res.image_url,
         publisher: res.publisher,
         title: res.title
         }
      })
      
   } catch (e) {
      throw e
   }
   
}

export const searchResultPerPage=function (page = state.search.currentPage){
   state.search.currentPage = page
   let start = (page-1)* state.search.perPage
   let end = page * state.search.perPage
   return state.search.results.slice(start,end)
}

export const updateServings=function (nServings){
   state.recipe.ingredients.forEach(ing =>{
     ing.quantity = ing.quantity * nServings/state.recipe.servings
   })
   state.recipe.servings = nServings
}

const storeBookmark = function (){
   localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

export const bookmarkRecipe = function(recipe){
   state.bookmarks.push(recipe)
   if(recipe.id === state.recipe.id) state.recipe.bookmark = true
   storeBookmark()
}

export const deleteBookmark=function(id){
 let index= state.bookmarks.findIndex(el=>el.id === id)
   state.bookmarks.splice(index,1)
    if(id === state.recipe.id) state.recipe.bookmark = false 
    storeBookmark()
}

export const uploadData=  async function(recipe){
   const ingredients = Object.entries(recipe).filter(entry=>{
      return entry[0].startsWith('ingredient') && entry[1] !== ''
      }).map(entry =>{
        let ingArr = entry[1].replaceAll(' ','').split(',')
        if(ingArr.length !== 3){
           throw new Error('Wrong Format has been Used')
        }
       let [quantity,unit, description] = ingArr
       return {quantity :quantity ? (+quantity) :null,unit,description}
      })
      const newrecipe = {
         cooking_time: +recipe.cookingTime,
         image_url: recipe.image,
         ingredients,
         publisher: recipe.publisher,
         title: recipe.title,
         servings: +recipe.servings,
         source_url: recipe.sourceUrl
      }
      
     const sendData = await AJAX(`https://forkify-api.herokuapp.com/api/v2/recipes/?key=2eda5d09-ac91-4f15-9b52-fb88a308d28c`
     ,newrecipe)
     console.log(sendData);
     state.recipe = dataConvert(sendData)
     bookmarkRecipe(state.recipe)
}

const init=function (){
   let storage = localStorage.getItem('bookmarks')
   if(storage) state.bookmarks = JSON.parse(storage)
}
init()