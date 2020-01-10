import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';

const ResultScreen = (props) => {

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