const cache = {};

function set(key, data) {
  cache[key] = {
    data, // <=> data:data
    cachedAt: new Date().getTime()
  };
}

function get(key) {
  return new Promise(resolve => {
    resolve(
      cache[key] && cache[key].cachedAt + 15 * 60 * 1000 > new Date().getTime()
        ? cache[key].data
        : null
    );
    // <=> if(cache && && cache[key].cachedAt + 15 * 60 * 1000 (15 min) > new Date().getTime()){return cache[key].data}else{return null}
  });
}

function invalidate(key) {
  delete cache[key];
}

export default {
  set,
  get,
  invalidate
};
