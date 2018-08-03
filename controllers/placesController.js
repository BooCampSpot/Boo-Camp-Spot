const request = require('request');

const getImageLink = (hauntedPlace) => {
  const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_API_KEY}&format=json&nojsoncallback=1&text=
  ${ encodeURIComponent(hauntedPlace)}&extras=url_o`;

  return new Promise((resolve, reject) => {
    request(flickrUrl, (error, response, body) => {
      let data;
      let urls = [];
      let imageLink;
  
      if (!error) {
        data = JSON.parse(body).photos.photo;
      }
  
      if (data.length) {
        for (const photo of data) {
          if (photo.url_o) {
            urls.push(photo.url_o);
          };
        };
        imageLink = urls[Math.floor(Math.random()*urls.length)];
      } else {
        imageLink = `/images/HP-${Math.floor(Math.random()*12)+1}.jpg`;
      };

      resolve(imageLink);
    });
  }); 
}

module.exports ={
  getImageLink
}