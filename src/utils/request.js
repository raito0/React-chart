import es6promise from 'es6-promise';
es6promise.polyfill();
function parseJSON(response) {
  debugger
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response.json();
}
  
// function checkStatus(response) {
//     if ((response.status >= 200 && response.status < 300) || response.status === 503) {
//       return response;
//     }
//     window.location = `${window.location.origin}/stay/404.html`;
//     const error = new Error(response.statusText);
//     error.response = response;
//     throw error;
// }

export default function request(url, options) {
    return fetch(url, options)
      .then(parseJSON).catch((e) =>{
        console.log(e);
      }
        );

}