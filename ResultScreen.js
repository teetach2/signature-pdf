import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

const ResultScreen = (props) => {

    const createPDF = async() => {
        const options = {
            html: '<h1>PDF TEST</h1>',
            fileName: 'test2',
        };

        const file = await RNHTMLtoPDF.convert(options);
        const destPath = RNFS.DocumentDirectoryPath + '/signature/' + Math.random() + '.pdf';
        await RNFS.moveFile(file.filePath, destPath);
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/* <Image source={{uri:'file:///' + props.navigation.state.params.imagePath }} style={{width: '100%', height: '100%'}}/> */}
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