
export default {
    newInstance: (env) => {
        return new Console(env)
    },
}


const MAX_LENGTH = 30


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

const LEVEL = ['info', 'warn', 'error']
class Console {
    constructor(env, length) {
        this._env = env;
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

            cut(newEnvArray, MAX_LENGTH)
            env = newEnvArray.join('.')

        }
        this.env = fill(env, length ? length : MAX_LENGTH);
        this.config = {
            show: true,
            level: "info",
            tab: "|->",
            prefix: ""
        };
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



    out(level) {
        let config = this.config
        if (config && config.show) {
            let wantLevelIndex = LEVEL.indexOf(level)
            let limitLevelIndex = LEVEL.indexOf(config.level)
            if (level && console[level] && limitLevelIndex <= wantLevelIndex) {
                let type = level == 'info' ? " " : "X"
                type = level == 'warn' ? "!" : type
                console['info']("" + this.env, type + ":" + this.config.prefix, ...Array.prototype.slice.call(arguments, 1))
            }
        }
    };

    init(config) {
        Object.assign(this.config, config)
    };

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


}



