export const utilService = {
  getYoutubeEmbedId,
  dynamicSort,
  orderMap
}


function getYoutubeEmbedId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) ? match[2] : null;
}

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

function orderMap(map){
  var orderedMap = {};
  let orderedKeys = Object.keys(map)
   .sort((a, b) => (map[a] < map[b] ? 1 : -1))
   .forEach(key => (orderedMap[key] = map[key]));
   return orderedMap
}