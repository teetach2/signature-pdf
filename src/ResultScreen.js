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

    const getValueToReplaceWithPlaceHolder = () => {
       return {

        // section1
        assignmentJobCustomerData: {     
            firstname: 'firstname',    
            lastname: 'lastname',    
            email: 'email',    
            phoneNumber: 'phoneNumber',
            breakdownAddress:   'breakdownAddress',
            repairShopAddress:  'repairShopAddress',  
        },
        assignmentJobVehicleData: {     
            vehicleBrand:    'vehicleBrand',   
            vehicleModel:    'vehicleModel',  
            vehicleColor: 'some.key.to.translate.vehicleColor', // (translation key -> use ABS translation)     
            vehicleLicensePlate:     'vehicleLicensePlate',
            vehicleVin:     'vehicleVin',
            vehicleMileage:     'vehicleMileage',
            vehicleFuelType: 'some.key.to.translate.vehicleFuelType', //(translation key -> use ABS translation) 
            vehicleFuelQuantity:   'vehicleFuelQuantity',  
            vehicleWeight:     'vehicleWeight',
            vehicleCategory: 'some.key.to.translate.vehicleCategory', //(translation key -> use our translation)     
            vehiclePassengers:   'vehiclePassengers',
            specialInstructions:  'specialInstructions',
        },
        serviceProviderData: {     
            providerName:  'providerName',
            operativeName:   'operativeName',  
            timeReceived: 'timeReceived', //(covert to bu timezone, format: dd/MM/yyyy HH:mm)     
            timeOnScene: 'timeOnScene', //(covert to bu timezone, format: dd/MM/yyyy HH:mm)     
            timeDepartScene: 'timeDepartScene', //(covert to bu timezone, format: dd/MM/yyyy HH:mm)     
            timeDelivered: 'timeDelivered', //(covert to bu timezone, format: dd/MM/yyyy HH:mm)     
            problemDetails:   'problemDetails'
        },

        // section2
        vehicleCondition: {
            vehicleImage: 'imageSource',
            repairable: {
                acronym: 'some.key.to.translate.R', //(translation key -> use our translation)
                text: 'some.key.to.translate.repairable',  //(translation key -> use our translation)
            },
            nonRepairable: {
                acronym: 'some.key.to.translate.NR',
                text: 'some.key.to.translate.nonRepairable'
            },
            parts: [
                {
                    text:  'some.key.to.translate.parts',  //(translation key -> use our translation),
                    severity:  'some.key.to.translate.severity',  //(translation key -> use our translation)
                    repairable:  'some.key.to.translate.repairable', // (translation key -> use our translation)
                }
            ]
        },
        inspectionCondition: [ 'condition1', 'condition2' ],  // (translation key -> use our translation)
        exteriorCondition: {       
            soiled: 'some.key.to.translate.soiled', //(translation key -> use our translation)   
        },
        interiorCondition: {       
            frontSeat: [ 'some.key.to.translate.condition1', 'some.key.to.translate.condition2' ],  // (translation key -> use our translation)       
            rearSeat: [ 'some.key.to.translate.condition1', 'some.key.to.translate.condition2' ], // (translation key -> use our translation)       
            floorCovering: [ 'some.key.to.translate.condition1', 'some.key.to.translate.condition2' ],  // (translation key -> use our translation)       
            headlining:  [ 'some.key.to.translate.condition1', 'some.key.to.translate.condition2' ], // (translation key -> use our translation)   
        },
    
    
    
    
        // section3
        evidences: {      
            damagePart: [
                {
                    partName: 'some.key.to.translate.partName',  //(translation key -> use our translation)
                    photos: [ 'imageSource' ],
                    comment: 'comment'
                }
            ],
            additionalPhotos: [ 'imageSource' ],
            generalComment: 'generalComment'
        },
        
    
    
    
        // section4
        forceEntry: [  // if forceEntry is not checked or no signature, dont show this page
            {
                isChecked: true,   
                text: 'some.key.to.translate.forceEntry', //(translation key -> use our translation),         
            },
        ],
        
    
        // section5
        disclaimers:
        {     
            mandatory: [
                {
                    isChecked: true,               
                    text: 'some.key.to.translate.mandatory1', //(translation key -> use our translation),         
                },
            ],
            additional: [
                {
                    isChecked: true,               
                    text: 'some.key.to.translate.additional1', //(translation key -> use our translation),         
                }
            ]
        },
      
    
        signature: {
            technicianSignature: 'technicianSignature',// leave blank will be in other ticket 
            customerSignature:   'customerSignature', // leave blank will be in other ticket   
            repairshopSignature:  'repairshopSignature', // leave blank will be in other ticket   
        },
        repairshopName: 'repairshopName', // get from FE    
        vehicleConditionChanged: true
    };
   }

    const createPDF = async() => {
        // use html: templateWithReplacedValue if you want to use placeholder
        const templateWithReplacedValue = pdfGeneratorService.getHTMLtoRender(getValueToReplaceWithPlaceHolder());
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
                fileName: fileName,
                filePath: destPath
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
            toUrl: uploadUrl,
            files: files,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
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