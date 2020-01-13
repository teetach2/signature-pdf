import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';

const ResultScreen = (props) => {
    const getPlaceHolders = (str) => {
        const regex = /{{\w+(\|translate)?}}/g;
        const result = str.match(regex);
        return result;
    }
    const getValueToReplace = (key, valueToReplace) => {
        const keyToFind = key.substring(2, key.length-2);
        if (keyToFind.includes('translate')) {
            const keyToTranslate = keyToFind.replace('|translate', '');
            return 'translated: ' + valueToReplace[keyToTranslate];
        }
        console.log('keyToFind=', keyToFind);
        return valueToReplace[keyToFind];

    }
    
    const replaceValue = (template, valueToReplace, placeHolder) => {
        placeHolder.forEach(element => {
            console.log('bbb element=', element);
            console.log('bbb element sub=', element.substring(2, element.length-2).replace('|translate', ''))
            template = template.replace(element, getValueToReplace(element, valueToReplace));
        });
        console.log('bbb template=', template);
        return template;
    }

    const getHTMLtoRender = () => {
        const template = '<h1>PDF TEST</h1><div>{{replacethis}} {{replacethat|translate}}</div>';
        const placeHolders = getPlaceHolders(template);
        const valueToReplace = {
            replacethis: 'Welcome to',
            replacethat: 'translation.key.smth'
        }
        console.log('bbb placeHolder=', placeHolders);
        const final = replaceValue(template, valueToReplace, placeHolders);
        console.log('bbb final=', final)
        return final;
    }

    const [pdfSource, setPdfSource] = useState();
    const [showPDF, setShowPDF] = useState(false);

    const styles = StyleSheet.create({
        pdf: {
            flex:1,
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height,
        }
    });

    const createPDF = async() => {
        // use this value in html if you want to use placeholder
        // placeholder value will be
        // {{value}} for render a value
        // {{some.key.to.translate|translate}} to translate
        const templateWithReplacedValue = getHTMLtoRender();
        const options = {
            html: `<h1>PDF TEST11</h1>
            <br>
            <img src="file://${props.navigation.state.params.imagePath}" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC41ZYUyZQAAA5NJREFUWEfVl7tOG0EUhrdJHiB5gETJE3C1wUiAbUDiJiouBS096aBBlEDtmA4QJWkBwSsgUVJQoJACgQIWEtiyYsxkvuXMenbXXq9JiuSXjmTPmfn/45kzZ46d/worKytv+/r6UgMDA1+6uro20un0t8HBwT0+M6YtxRyZ/vegRT739PTktVCho6NDRVl3d3eht7c3pwP9JMtfj/n5+fepVOqrJq4GhWJYlbVwCF1rmJiYSCYSiR9BYr0LanZ2Vi0tLXljy8vL7hg+ey4GB1xCGw+ZTCaryco20cjIiNre3la3t7cKVKtVNT4+7trz87M7hm9ra0sNDw/7gtBcpWw2mxH6aBCtLd7Z2anW19dVqVRyRWwUi0XXgmBsbW3NXWsHMTk5mRCZ+uC87G3Xn9Xh4aHQhrG/v68ODg7kWxishcPiu1xcXHwncmFIwrmTiT5KHExPT6u5uTn5Vh9wGE4MDZHzg6umJ3jZzrZHgXMfHR1VU1NTMtIYcBne9vb2is6njyJbA/fcTCLh6p25DQLQhced2wyPj49qaGjICwItkX0B1UsniVdkyPZmqFQqELlBmFsQBTgNvy5WPxcWFt6IvONQXo1TB+JdtSiUy2W2UyWTSfdKNsPNzY3vVvT399dqA3XcOCgocVAoFFRbW5tr7EYczMzMeAGgKfKOo3/1hnFQ4Z6enmRJY+RyOY8sn8/LaGOwS3b1RFPkHYdXzTgwqlu9AmNwd3fnK7t8vr+/F28YDw8PamxszJuPoSny7hXcs526GkYGwPbbAWBUvkaoFwCaIu8/Ah6WOFm9ubkZCmJ3d1e8YcAJt5mLpsi/LgkB276zs+MFQpYfHx+LNwwqp9HxJaH+0vI1tHF0dOReR9ZTG05PT8VTw/X1tSeO+a4hhYhOxjh5UlvFyckJpO56fb7q4uJCPC+ILESANspM4D2PSsJGOD8/d0szHJy3QbAUoyWyNdDDaaf3GEVldRSurq7U6uqqOjs7kxHlchleXT1/6R36ILJ+tPocx0Hs5xi02pA0A2sDDcn3yIYESEtWMosw3nPOMQgKDBYEc+1tx3TiFXUx6haZaNBABoMgichkXjXAe0FDYjelXDXm2AmHIa7PPS308UADqXFpE2HkBq9asC23i4xtbHvsXx4E50XS0EbVI48ysp21Tc88DujhaKMoIPXEbGMO97zhVfsTUL0oodRxHpPgn1N8oQr3b8NxfgOgvsOjwyVIMgAAAABJRU5ErkJggg==" />
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            <br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">
            `,
            fileName: 'tmpFile',
        };

        const file = await RNHTMLtoPDF.convert(options);
        const destPath = RNFS.DocumentDirectoryPath + '/signature/' + Math.random() + '.pdf';
        await RNFS.moveFile(file.filePath, destPath);
        setPdfSource({ uri: destPath });
        setShowPDF(true);
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
            {/* <Image source={{uri:'file:///' + props.navigation.state.params.imagePath }} style={{width: '100%', height: '100%'}}/> */}
            <Button
            title="GET raw html to render"
            onPress={() => {
                getHTMLtoRender();
                // console.log('props', props);    
            }} />

            <Button
            title="Generate PDF"
            onPress={() => {
                createPDF();
            }}
            />
            <View style={{flex: 1}}>
            { showPDF && (<Pdf
                source={pdfSource}
                style={styles.pdf}
            />)}
            </View>
        </View>
    )
}

export default ResultScreen;