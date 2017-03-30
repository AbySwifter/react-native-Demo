/**
 * Created by bear on 2017/3/30.
 */

let navigator = null;
const routeMap = new Map();
export function registerNavigator(nav) {
    if (navigator) {
        return;
    }
    navigator = nav;
}

export function getNavigator() {
    if (!navigator) {
        console.warn('navigator is not register');
    }
    return navigator;
}

export function getRouteMap() {
    return routeMap;
}