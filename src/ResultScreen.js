import React, { useState } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';
import pdfGeneratorService from './pdf/pdfGeneratorService';

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

    const getValueToReplacePlaceHolder = () => {
       return {
            replacethis: 'Welcome to',
            replacethat: 'translation.key.smth',
            vehicle: 'vehicle.type.car',
            customerName: 'john doe',
            damagePhotos: [
                {
                    topic: 'topic1',
                    imagePath: 'path/to/img/1',
                    comment: 'comment jaaaaaa'
                },
                {
                    topic: 'topic2',
                    imagePath: 'path/to/img/1'
                }
            ],
            severity1: {
                severity: pdfGeneratorService.severityLevel.HIGH.text,
                repairable: 'Yes'
            },
            severity2: {
                severity: pdfGeneratorService.severityLevel.MEDIUM.text,
                repairable: 'No'
            },
            severity3: {
                severity: pdfGeneratorService.severityLevel.LOW.text,
                repairable: 'No'
            },
            severity4: {
                severity: pdfGeneratorService.severityLevel.NO_DAMAGE.text,
                repairable: 'Yes'
            },
            addDCM: [
                {
                    isChecked: false,
                    text: 'additional.dcm.1'
                },
                {
                    isChecked: true,
                    text: 'additional.dcm.2'
                },
                {
                    isChecked: false,
                    text: 'additional.dcm.3'
                }
            ],
            basicDCM: [
                {
                    isChecked: true,
                    text: 'basic.dcm.1'
                },
                {
                    isChecked: true,
                    text: 'basic.dcm.2'
                },
                {
                    isChecked: true,
                    text: 'basic.dcm.3'
                },
                {
                    isChecked: false,
                    text: 'basic.dcm.4'
                }
            ]
       };
   }

    const createPDF = async() => {
        // use html: templateWithReplacedValue if you want to use placeholder
        const templateWithReplacedValue = pdfGeneratorService.getHTMLtoRender(getValueToReplacePlaceHolder());
        const options = {
            html: templateWithReplacedValue,
            fileName: 'tmpFile',
        };

        const file = await RNHTMLtoPDF.convert(options);
        const fileName = Math.random() + '.pdf';
        const destPath = RNFS.DocumentDirectoryPath + '/signature/' + fileName;
        await RNFS.moveFile(file.filePath, destPath);
        setPdfSource({ uri: destPath });
        setShowPDF(true);

        // Upload file
        const uploadUrl = 'http://localhost:8080/aws/files';
        const files = [
            {
                name: 'file',
                filename: fileName,
                filepath: destPath,
                filetype: 'application/pdf'
            }
        ];
        
        const uploadBegin = (response) => {
            console.log('UPLOAD HAS BEGUN! JobId: ' + response.jobId);
        };
        const uploadProgress = (response) => {
            const percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
            console.log('UPLOAD PERCENTAGE: ' + percentage);
        };

        RNFS.uploadFiles({
            files: files,
            toUrl: uploadUrl,
            method: 'POST',
            begin: uploadBegin,
            progress: uploadProgress
            })
        .promise.then((response) => {
            if (response.statusCode == 200) {
                console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
            } else {
                console.log('SERVER ERROR', response);
            }
        }).catch((err) => {
            console.log(err);
        });

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