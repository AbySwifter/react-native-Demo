/**
 * Created by bear on 2017/3/30.
 */
import {
    AppRegistry,
} from 'react-native';
import App from './page/MainPage';

// 优化log,在开发环境中，去除log函数
if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}

AppRegistry.registerComponent('ListViewApp', () => App);