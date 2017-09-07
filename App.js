import React from 'react';
import {WebView, StatusBar, View, TouchableOpacity, Text} from 'react-native';

const styles = {
    container: {
        flex: 1,
        marginTop: typeof StatusBar.currentHeight === 'undefined' ? 10 : StatusBar.currentHeight
    },
    topBar: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBarText: {
        color: 'black'
    },
    topBarTextDisabled: {
        color: 'gray'
    }

};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {canGoBack: false};
    }


    onBack() {
        this.refs['WEBVIEW'].goBack();
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity disabled={!this.state.canGoBack} onPress={this.onBack.bind(this)}>
                        <Text style={this.state.canGoBack ? styles.topBarText : styles.topBarTextDisabled}>Go Back</Text>
                    </TouchableOpacity>
                </View>

                <WebView
                    ref={'WEBVIEW'}
                    style={{flex: 1}}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    source={{uri: 'https://instagram.com'}}
                    injectedJavaScript={
                        "function sort() {\n" +
                        "    let medias = [];\n" +
                        "    let articles = document.getElementsByTagName('article');\n" +
                        "    let parent = articles[0].parentElement;\n" +
                        "    let i = 0;\n" +
                        "    let iMax = articles.length;\n" +
                        "    for (; i < iMax; i++) {\n" +
                        "        let node = articles[i];\n" +
                        "        let time = node.getElementsByTagName('time')[0].getAttribute('datetime');\n" +
                        "        medias.push({node, time});\n" +
                        "    }\n" +
                        "    let lastItem = articles[iMax - 1];\n" +
                        "    lastItem.style.display = 'none';\n" +
                        "    medias = medias.sort((a, b) => {\n" +
                        "        return b.time.localeCompare(a.time);\n" +
                        "    });\n" +
                        "    parent.innerHTML = '';\n" +
                        "    medias.forEach((e) => parent.appendChild(e.node));\n" +
                        "    parent.appendChild(lastItem);\n" +
                        "    alert('Sort done');\n" +
                        "}\n" +
                        "\n" +
                        "function isInstagram() {\n" +
                        "    return window.location.host === 'www.instagram.com' && window.location.pathname === '/';\n" +
                        "}\n" +
                        "\n" +
                        "function isMainFeed(){\n" +
                        "    return document.getElementById('mainFeed') !== null;\n" +
                        "}\n" +
                        "\n" +
                        "function buttonIsCreated(){\n" +
                        "    return document.getElementById('sort-button') !== null;\n" +
                        "}\n" +
                        "\n" +
                        "function addButton() {\n" +
                        "\n" +
                        "    if (isInstagram() && isMainFeed()) {\n" +
                        "        let button = document.createElement('button');\n" +
                        "        button.id = 'sort-button';\n" +
                        "        button.style.zIndex = 12;\n" +
                        "        button.innerHTML = 'Sort';\n" +
                        "        button.style.position = 'fixed';\n" +
                        "        button.style.top = '7px';\n" +
                        "        button.style.left = '5px';\n" +
                        "        button.onclick = sort;\n" +
                        "        document.body.appendChild(button);\n" +
                        "    } else if(buttonIsCreated()){\n" +
                        "        let button = document.getElementById('sort-button');\n" +
                        "        button.parent.removeChild(button);\n" +
                        "    }\n" +
                        "}\n" +
                        "\n" +
                        "addButton();\n"
                    }
                />
            </View>
        );
    }
}

