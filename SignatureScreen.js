import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';
import RNFS from 'react-native-fs';

const SignatureScreen = (props) => {
    // _signaturePadError = error => {
  //   console.error(error);
  // };

  // _signaturePadChange = ({base64DataUrl}) => {
  //   console.log('Got new signature: ' + base64DataUrl);
  // };

  const [imageState, setImageState] = useState();

  handleSaveAction = (img) => {
    const imageBase64Code = img.split("data:image/png;base64,");
    const imagePath = RNFS.DocumentDirectoryPath + '/signature';
    const imageName = imagePath + '/' + Math.random() + '.png';
    // console.log(props);
    // props.navigation.push('Result', {imagePath: imageName});

    RNFS.exists(imagePath).then(isExist => {
      if (isExist) {
        RNFS.writeFile(imageName, imageBase64Code[1], 'base64')
        .then(() => { 
          setImageState(imageName);
          props.navigation.push('Result', {imagePath: imageName});
        });
      } else {
        RNFS.mkdir(imagePath)
            .then(() => {
              RNFS.writeFile(imageName, imageBase64Code[1], 'base64')
              .then(() => {
                setImageState(imageName);
                props.navigation.push('Result', {imagePath: imageName});
              });
            })
            .catch((err) => {
                console.warn('err', err)
        })
      }
    });

    // RNFS.writeFile(imagePath, imageBase64Code[1], 'base64')
    // .then(() => console.log('Image converted to png and saved at ' + imagePath));
  }

  return (
      <View style={{flex: 1}} >
      {/* <SignaturePad
        onError={this._signaturePadError}
        onChange={this._signaturePadChange}
        style={{flex: 1, backgroundColor: 'white'}}
      /> */}
      {/* <View style={{flex: 1}} >
        <Image source={{uri:'file:///' + imageState }} style={{width: 300, height: 300}}/>
      </View> */}
      <Signature
        // handle when you click save button
        onOK={(img) => handleSaveAction(img)}
        onEmpty={() => alert('askdjlkd')}
        // description text for signature
        descriptionText="Signature"
        // clear button text
        clearText="Clear"
        // save button text
        confirmText="Save"
        // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
        webStyle={`.m-signature-pad--footer
          .button {
            color: #FFF;
          }`}
      />
    </View>
  );
}

export default SignatureScreen;