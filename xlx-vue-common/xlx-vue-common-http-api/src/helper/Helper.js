import lodash from "lodash"

import LoggerFactory from "xlx-vue-common-logger";

const log = LoggerFactory.newInstance("xlx.vue.common.http.helper.Helper")

export default {
    isEmpty(v) {
        return v == undefined || v == null
    },
    isNotEmpty(v) {
        return !this.isEmpty(v)
    },


    isEmptyField(v, fa, fb, fc, fd, fe) {
        if (this.isEmpty(v)) return true
        if (this.isNotEmpty(fa) && this.isEmpty(v[fa])) return true
        if (this.isNotEmpty(fb) && this.isEmpty(v[fa][fb])) return true
        if (this.isNotEmpty(fc) && this.isEmpty(v[fa][fb][fc])) return true
        if (this.isNotEmpty(fd) && this.isEmpty(v[fa][fb][fc][fd])) return true
        if (this.isNotEmpty(fe) && this.isEmpty(v[fa][fb][fc][fd][fe])) return true
        return false
    },
    isNotEmptyField(v, fa, fb, fc, fd, fe) {
        return !this.isEmptyField(v, fa, fb, fc, fd, fe);
    },



    /**
        just one thing i want to do here
        - merge many config 
    */
    merge() {
        let mo = arguments[0]
        let aos = []
        if (arguments.length > 1) {
            aos = Array.prototype.slice.call(arguments, 1)
        }
        aos.forEach(element => {
            if (element) {
                mo = this.mergeProperty(mo, element)
            }
        });
        return mo
    },

    /**
         just want to merge two object's properties
        - if property is an array:
        - if property is an object:
        - if property is else common value: 
        parameters
        - mo: main object
        - ao: another object
        parameters
        - mo: main object
        - ao: another object
        user manual
        - merge(mo,ao)
        - merge(mo,ao,key1,key2,key3)
    */
    mergeProperty() {
        let mo = arguments[0]
        let ao = arguments[1]
        let privateKeys = (ao && ao.privateKeys) ? ao.privateKeys : {}
        let keys = []
        if (arguments.length > 2) {
            keys = Array.prototype.slice.call(arguments, 2)
        } else if (arguments.length > 1) {
            keys = Object.getOwnPropertyNames(ao)
        }
        for (const key of keys) {
            if (privateKeys[key]) { continue; }
            const value = ao[key]
            if (this.isEmpty(value)) continue;
            if (Array.isArray(value)) {
                mo[key] = [
                    ...(mo[key] ? mo[key] : []),
                    ...(ao[key] ? ao[key] : [])
                ]
            } else if (typeof value === 'object') {
                mo[key] = this.merge(mo[key] ? mo[key] : {}, value)
            } else {
                mo[key] = value
            }
        }
        return mo
    },



}