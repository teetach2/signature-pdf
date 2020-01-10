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
        return valueToReplace[keyToFind];

    }
    
    const replaceValue = (template, valueToReplace, placeHolder) => {
        placeHolder.forEach(element => {
            template = template.replace(element, getValueToReplace(element, valueToReplace));
        });
        console.log('bbb template=', template);
        return template;
    }

    const getTemplate = (templateType) => {
        if (templateType === 'S') {
            return `<h1>PDF TEST</h1><div>{{replacethis}} {{replacethat|translate}}</div>`;
        } else if (templateType === 'SDCM') {
            return `<h1>PDF TEST</h1><div>{{replacethis}} {{replacethat|translate}}</div>
            <hr>
            <h1>Disclaimer with needed translation</h1>
            <div>
            <p>{{dcm1|disclaimer|translate}}</p>
            <p>{{dcm2|disclaimer|translate}}</p>
            </div>
            <hr>
            <h1>Disclaimer with unneeded translation</h1>
            <div>
            <p>{{dcm1|disclaimer}}</p>
            <p>{{dcm2|disclaimer}}</p>
            </div>`;
        } else if (templateType === 'DDCM') {
            return `<h1>PDF TEST</h1><div>{{replacethis}} {{replacethat|translate}}</div>
            <hr>
            <h1>Basic Disclaimer</h1>
            <div>
            {{basicDcm}}
            <hr>
            <h1>Additional Disclaimer with unneeded translation</h1>
            <div>
            {{addDCM}}
            </div>`;
        }
    }

    const getHTMLtoRender = () => {
        const template = getTemplate('S');
        const placeHolders = getPlaceHolders(template);
        const valueToReplace = {
            replacethis: 'Welcome to',
            replacethat: 'translation.key.smth'
        }
        const final = replaceValue(template, valueToReplace, placeHolders);
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
            <img src="file:///${props.navigation.state.params.imagePath}" alt="Girl in a jacket" width="300" height="300">
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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">`,
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