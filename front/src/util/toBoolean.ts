export function toBoolean(str: unknown) {
    if (typeof str === 'undefined' || str === null) {
        return false;
    } else if (typeof str === 'string') {
        switch (str.toLowerCase()) {
            case 'false':
            case 'no':
            case '0':
            case "":
                return false;
            default:
                return true;
        }
    } else if (typeof str === 'number') {
        return str !== 0
    }
    else {return true;}
}
