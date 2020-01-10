import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

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

    const getTemplate = () => {
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

    const createPDF = async() => {
        const options = {
            html: getTemplate(),
            fileName: 'test',
            // directory: 'files',
        };

        const file = await RNHTMLtoPDF.convert(options)
        console.log(file.filePath);
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/* <Image source={{uri:'file:///' + props.navigation.state.params.imagePath }} style={{width: '100%', height: '100%'}}/> */}
            <Button
            title="GET PlaceHolder"
            onPress={() => {
                getTemplate();
                // console.log('props', props);    
            }} />

            <Button
            title="Generate PDF"
            onPress={() => {
                createPDF();
                // console.log('props', props);    
            }}
            />
        </View>
    )
}

export default ResultScreen;