import React from 'react';
import {View, StyleSheet} from 'react-native';

import htmlContent from './signatureLayout';
import injectedSignaturePad from './signatureEngine';
import injectedApplication from './signatureHandler';

import {WebView} from 'react-native-webview';

const styles = StyleSheet.create({
  webBg: {
    width: '100%',
    backgroundColor: '#FFF',
    flex: 1,
  },
});

const SignatureComponent = props => {
  const {clearText, confirmText, webStyle} = props;

  const injectedJavaScript = injectedSignaturePad + injectedApplication;
  let html = htmlContent(injectedJavaScript);
  html = html.replace('<%style%>', webStyle);
  html = html.replace('<%confirm%>', confirmText);
  html = html.replace('<%clear%>', clearText);

  source = { html };
  console.log(html);
  
  const getSignature = e => {
    const {onOK, onEmpty} = this.props;
    if (e.nativeEvent.data === 'EMPTY') {
      onEmpty();
    } else {
      onOK(e.nativeEvent.data);
    }
  };

  const renderError = e => {
    const {nativeEvent} = e;
    console.warn('WebView error: ', nativeEvent);
  };

  return (
    <View style={styles.webBg}>
      <WebView
        useWebKit={true}
        source={source}
        onMessage={getSignature}
        javaScriptEnabled={true}
        onError={renderError}
      />
    </View>
  );
};

export default SignatureComponent;
