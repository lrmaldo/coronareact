const URL = "http://mapa.sattlink.com/api/noticias"

class API {
 
   async getData(){
        const query = await fetch(URL)
        const data = query.json()
        
        return data 
    }


}

export default new API();