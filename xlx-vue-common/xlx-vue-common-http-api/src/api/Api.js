
/**
 * just one thing i want to do 
 * - help people create api(like axios config) easily
 */

export default {
    build(method, url, options) {
        return Object.assign({}, options, { url }, { method })
    },
    get(url, options) {
        return this.build("get", url, options)
    },
    post(url, options) {
        return this.build("post", url, options)
    },
    put(url, options) {
        return this.build("put", url, options)
    },
    delete(url, options) {
        return this.build("delete", url, options)
    },
}

