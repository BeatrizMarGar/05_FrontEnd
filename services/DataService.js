export default{
    //anuncio con toda su info
    parseAd: function(ad){
        ad.name = ad.name.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        ad.picture = ad.picture;
        ad.username = ad.username;
        ad.sell = ad.sell;
        ad.description = ad.description;
        ad.date = ad.date;
        ad.canBeDeleted = ad.userId === this.getAuthUserId()
        return ad;
    },
    //conseguir anuncios
    getAds: async function(){
        //const url = 'http:localhost:8000/api/ads?_expand=username'
        const url = 'http:localhost:8000/api/ads'
        const response = await fetch(url)
        if (response.ok){
            const ads = await response.json
            return ads.map(ad => this.parseAd(ad))
        } else {
            throw new Error('Error al recuperar los anuncios')
        }
    },


    getAdsOld: function() {
        return new Promise(function(resolve, reject) {
            // llamar a fetch para obtener la respuesta
            fetch(url).then(function(response){
                if (response.ok) {
                    // una vez tengo la respuesta, obtener el JSON
                    response.json().then(function(data) {
                        // cuando tenga el JSON, resolver la promesa
                        resolve(data)
                    }).catch(function() {
                        reject('Error al parsear el JSON')
                    })
                } else {
                    reject('Error al cargar los anuncios')
                }
            }).catch(function() {
                reject('Error inesperado')
            })
        })
    },



    //detalles de los anuncios
    getAdDetail: async function(AdId){
        const url = `http:localhost:8000/api/ads/${AdId}?_expand=username`
        const response = await fetch(url)
        if (response.ok){
            const ad = await response.json
            return this.parseAd(ad)
        } else {
            if (response.status === 404) {
                return null
            } else {
                throw new Error('Fallo cargando el anuncio')
            }
        }
    },
    //post de anuncio
    post: async function(url, body) {
        return await this.request('POST', url, body)
    },
    //put anuncio
    put: async function(url, body) {
        return await this.request('PUT', url, body)
    },
    //delete anuncio
    delete: async function(url, body={}) {
        return await this.request('DELETE', url, body)
    },
    //request del anuncio
    request: async function(method, url, body) {
        const requestConfig = {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        if (this.isAuthenticed()) {
            const token = localStorage.getItem('AUTH_TOKEN')
            // requestConfig.headers.Authorization = `Bearer ${token}`
            requestConfig.headers['Authorization'] = `Bearer ${token}`
        }
        const response = await fetch(url, requestConfig)
        
        try {
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            throw error
        }
    },
    //registrar usuario
    registerUser: async function(username, password) {
        const url = 'http://localhost:8000/auth/register'
        return await this.post(url, {username, password})
    },
    //login de usuario
    login: async function(username, password) {
        const url = 'http://localhost:8000/auth/login'
        const data = await this.post(url, {username, password})
        
        const token = data.accessToken
        localStorage.setItem('AUTH_TOKEN', token)
    },
    //autenticar usuario
    isAuthenticed: function() {
        return localStorage.getItem('AUTH_TOKEN') !== null
    },
    //crear anuncio
    createAd: async function(msg) {
        const url = 'http://localhost:8000/api/ads'
        return await this.post(url, { message: msg })
    },

    getAuthUserId: function() {
        const token = localStorage.getItem('AUTH_TOKEN')
        if (token === null) {
            return null
        }
        const b64Parts = token.split('.')
        if (b64Parts.length !== 3) {
            return null
        }
        const b64Data = b64Parts[1]
        try {
            const userJSON = atob(b64Data)
            const user = JSON.parse(userJSON)
            return user.userId
        } catch (error) {
            console.error('Error while decoding JWT Token', error)
            return null
        }
    }


}