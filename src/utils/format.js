export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function mapStatus(s){
    switch(s){
        case 1:
            return 'Completed'
        case 2:
            return 'Cancelled'
        default: return '';
    }
}