class CacheItem {
    static DEFAULT_DURATION = 5 * 60 * 1000;
    constructor(data, options = {duration = DEFAULT_DURATION}) {
        this.data = data;
        this.createAt = +new Date();
        this.expireIn = this.createAt + options.duration;
    }
}
class Cache {
    constructor() {
        /** @type {Map<String, CacheItem>} */
        this._map = new Map();
    }

    add(key, data) {
        const item = new CacheItem(data);
        this._map.set(key, item);
    }

    get(key) {
        const item = this._map.get(key);
        if (!!item) {
            const now = +new Date();
            if (now < item.expireIn) {
                setTimeout(() => this._map.delete(key), 0);
                return item;
            }
        }
        return undefined;
    }
}
const cache = new Cache();


export const cacheAsync = (time) => 
    (target) => {
        
    }


export default cache;
