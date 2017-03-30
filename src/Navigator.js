/**
 * Created by bear on 2017/3/30.
 */
import React, { Component } from 'react';
import {
    Navigator,
    View,
    Text,
    StyleSheet,
    BackAndroid,
} from 'react-native';
import { getRouteMap, registerNavigator } from './route';

let lastClickTime = 0;

const styles = StyleSheet.create({
    errorView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

class Navigator extends Component {
    componentWillMount() {
        if (__ANDROID__) {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnMount() {
        if (__ANDROID__) {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid() {
        const routers = this.navigator.getCurrentRoutes();
        if (routers.length > 1) {
            this.navigator.pop();
            return true;
        }
        const now = new Date().getTime();
        if (now - lastClickTime < 2500) { // 2.5秒内点击后退键两次推出应用程序
            return false; // 控制权交给原生
        }
        lastClickTime = now;
        return true;
    }
    renderScene = (route, navigator) => {
        const routeObject = getRouteMap().get(route.name);
        if (!routeObject) {
            console.warn('错误的页面注册名');
            return Navigator.SceneConfigs.PushFromRight;
        }
        const sceneAnimation = routeObject.sceneAnimation;
        if (sceneAnimation) {
            return sceneAnimation;
        }
        // 默认动画
        return Navigator.SceneConfigs.PushFromRight;
    }
    configureScene = (route, routeStack) => {
        this.navigator = navigator;
        registerNavigator(navigator);
        let ComponentObject = getRouteMap().get(route.name);
        if (!ComponentObject) {
            console.warn('错误的页面注册名');
            return (
                <View style={ styles.errorView }>
                    <Text style={ styles.errorText }>您所启动的Component未在routeMap中注册！</Text>
                </View>
            );
        }
        let ComponentScene = ComponentObject.page;
        return (
            <ComponentScene {...route}/>
        );
    }
    render() {
        return (
            <Navigator
                initialRoute={this.props.initialRoute}
                renderScene={this.renderScene}
                configureScene={this.configureScene}
                debugOverlay={false}
            />
        );
    }
}

export default Navigator;