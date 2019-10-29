

const LEVEL = ['info', 'warn', 'error']
const OPTIONS = {
    length: 30,
    show: true,
    level: "info",
    tab: "|->",
    prefix: ""
}


export default {
    OPTIONS: OPTIONS,
    instances: [],
    newInstance(env, options) {
        let instance = new Console(env, options ? options : this.OPTIONS);
        this.instances.push(instance)
        return instance
    },
    initOptions(options) {
        this.OPTIONS = options
        for (const instance of this.instances) {
            instance.init(options)
        }
    }
}



function fill(value, length, emptyChar) {
    let space = "";
    let len = length - value.length
    for (let index = 0; index < len; index++) {
        space += (emptyChar ? emptyChar : " ")
    }
    return value + space;
}

function cut(newEnvArray, max) {
    let lastWord = newEnvArray[newEnvArray.length - 1]
    let firstLen = newEnvArray[0].length;
    let lastLen = lastWord.length;
    let totalLen = firstLen + lastLen + (newEnvArray.length - 2) * 2 + 1
    let diffLen = totalLen - max
    if (diffLen > 0 && diffLen < lastLen) {
        newEnvArray[newEnvArray.length - 1] = lastWord.substring(0, lastLen - diffLen - 1) + '*'
    }
    return newEnvArray
}


class Console {
    constructor(env, options) {
        this._env = env;
        this.env = env;
        this.config = Object.assign({}, OPTIONS, options)
        this.init();
    };
    init(options) {
        this.config = Object.assign({}, OPTIONS, this.config, options)
        let env = this._env
        if (env) {
            let newEnvArray = []
            let envArray = env.split('.');
            for (let ei = 0; ei < envArray.length; ei++) {
                let e = envArray[ei]
                if (newEnvArray.length == 0 || ei == envArray.length - 1) {
                    newEnvArray.push(e)
                } else {
                    newEnvArray.push(e.substring(0, 1))
                }
            }

            cut(newEnvArray, this.config.length)
            env = newEnvArray.join('.')
        }
        this.env = fill(env, this.config.length);
    };
    out(level) {
        let config = this.config
        if (config && config.show) {
            let wantLevelIndex = LEVEL.indexOf(level)
            let limitLevelIndex = LEVEL.indexOf(config.level)
            if (level && console[level] && limitLevelIndex <= wantLevelIndex) {
                this.console(level, ...Array.prototype.slice.call(arguments, 1))
            }
        }
    };
    console(level) {
        let prefix = this.config.prefix
        let type = level == 'info' ? "   " : "[x]"
        type = level == 'warn' ? "[!]" : type
        prefix = prefix ? " " + prefix : ""
        console.info(type + ":" + this.env, type + ":" + prefix, ...Array.prototype.slice.call(arguments, 1))
    }

    tabIn() {
        if (this.config.tab) {
            this.config.prefix = this.config.prefix ? this.config.prefix : ""
            let arr = this.config.prefix.split("")
            let v = ""
            for (let index = 0; index < arr.length; index++) {
                v += " "
            }
            this.config.prefix = v + this.config.tab;
        }
    };
    tabOut() {
        let prefix = this.config.prefix

        if (prefix && this.config.tab) {
            if (prefix.length >= this.config.tab.length * 2) {
                prefix = prefix.substr(0, prefix.length - this.config.tab.length * 2);
                prefix = prefix + this.config.tab;
            } else {
                prefix = ""
            }
            this.config.prefix = prefix
        }
    };


    info() {
        this.out('info', ...arguments)
    };
    warn() {
        this.out('warn', ...arguments)
    };
    error() {
        this.out('error', ...arguments)
    };

    start() {
        this.out('info', ...arguments)
        this.tabIn()
    };
    end() {
        this.tabOut()
        this.out('info', ...arguments)
    };


}



