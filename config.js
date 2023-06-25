
export const AJAX = async function(url, uploadData = undefined) {
   try {
      const res = uploadData ?await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(uploadData)
      }) :await fetch(url);
      console.log(res);
      const data = await res.json()
      if (!res.ok) throw new Error(`${data.message}`);
      return data

   }
   catch (e) {
      console.log(e)
   }
}


/*export  const getJson = async function(url){
   try {
      let res = await fetch(url)
      let data = await res.json()
      if (!res.ok) throw new Error(`${data.message}`)
      return data
   } catch (e) {
      throw e
   }
}


export  const setJson = async function(url,newdata){
   try {
      let res = await fetch(url,{
         method:'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify(newdata),
      })
      
      let data = await res.json()
      console.log(data);
      if (!res.ok) throw new Error(`${data.message}`)
      return data
   } catch (e) {
      throw e
   }
}*/