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
        const url = 'http:localhost:8000/api/ads?expand=user'
        const response = await fetch(url)
        if (response.ok){
            const ads = await response.json
            return ads.map(ad => this.parseAd(ad))
        } else {
            throw new Error('Error al recuperar los anuncios')
        }
    },
    
}