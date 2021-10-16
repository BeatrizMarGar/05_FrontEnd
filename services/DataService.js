export default{
    //anuncio con toda su info
    parseAd: function(ad){
        ad.name = ad.name.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        ad.picture = ad.picture;
        ad.author = ad.user;
        ad.sell = ad.sell;
        ad.canBeDeleted = ad.userId === this.getAuthUserId()
        return ad;
    },
    //conseguir anuncios
    getAds: async function(){
        const url = 'http:localhost:8000/api/ads?_expand=user'
        const response = await fetch(url)
        if (response.ok){
            const ads = await response.json
            return ads.map(ad => this.parseAd(ad))
        } else {
            throw new Error('Error al recuperar los anuncios')
        }
    },
    //detalles de los anuncios
    getAdDetail: async function(AdId){
        const url = `http:localhost:8000/api/ads/${AdId}?_expand=user`
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
    //put anuncio
    //delete anuncio
    //registrar usuario
    //login de usuario
    //autenticar usuario
    //crear anuncio
}