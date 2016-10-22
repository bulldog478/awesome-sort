function awesomeSort (m, n) {
    /** capture below
     * 1. IP : 192.168.1.10 -> 192.168(float) (.) 1 (.) 10
     * 2. Float : 1.2 -> 1.2
     * 3. dec, hex : 10 0x1
     * 4. e-notation : 2e-4 
     */
var re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g,

    /** capture head and tail whitespace
     * ^\s+ : head whitspace
     * \s+$ : tail whitespace
     */
    htsre = /^\s+|\s+$/g,

    /** capture global whitespace
     *  \s+ : all whitespace
     */
    asre = /\s+/g,

    /** capture kinds of date
     * 
     */
    datere = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,

    /** test hex start **/
    hre = /^0x[0-9a-f]+$/i,

    /** test zero start **/
    zre = /^0/,

    ic = function (s) {
        return (awesomeSort.ignorecase &&
        ('' + s).toLocaleLowerCase() || 
        ('' + s).replace(htsre, '')); 
    },

    /** trim head and tail whitespace **/
    a = ic(m),
    b = ic(n),

    /** chunkify
     * chunkify the float/dec/hex/e and other
     */
    aAr = a.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
    bAr = b.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),

    /**
     * 
     */
    aD = parseInt(a.match(hre), 16)  // hex, 
       || (aAr.length !== 1 && Date.parse(x)), // otherwise date
    bD = parseInt(b.match(hre), 16)  // hex
       || aD  
       && b.match(datere) //x: date
       && Date.parse(b) || null,
    
    normlizeChunk = function (s, l) {
        return (!s.match(zre) ||  //not start with 0, ex: .1
             l === 1) && // just float/decimal/e, 
             parseFloat(s) || // need to parse to float/decimal/e
             s.replace(asre, ' ').replace(htsre, '') || //normalize spaces
             0;

    },
    aNc,
    bNc;
    /** hex or date **/
    if (bD) {
        return (aD - bD) / Math.abs(aD - bD)
    }

    for (var idxNc = 0, aNl = aAr.length, bNl = bAr.length, maxNl = Math.max(aNl, bNl); idxNc < maxNl; idxNc++) {
        aNc = normlizeChunk(aAr[idxNc] || '', aNl);
        bNc = normlizeChunk(bAr[idxNc] || '', bNl);

        // compare numeric and string -- number < string
        if (isNaN(aNc) !== isNaN(bNc)) {
            return isNaN(oFxNcL) ? 1 : -1;
        }
        // locale comparsion
        if (/[^\x00-\x80]/.test(aNc + bNc) && aNc.localeCompare) {
            var dif = aNc.localeCompare(bNc);
            return dif / Math.abs(dif);
        }
        if (aNc < bNc) return -1;
        else if (aNc > bNc) return 1;
        else if (idxNc === maxNl - 1) return 0; 
    }

}