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
        // const templateWithReplacedValue = pdfGeneratorService.getHTMLtoRender(getValueToReplaceWithPlaceHolder());
        const templateWithReplacedValue = `
        <header>
    <meta charset='UTF-8'>
    <style>
        section {
            padding-top: 27mm;
            min-height: 310mm;
        }
        
        body {
            padding: 0 16mm;
            font-family: 'Trebuchet MS',sans-serif
        }
        
        h1{text-align:center;margin:0;font-weight:700}h2{margin:0;font-weight:700;padding:10px 0 30px 0;text-transform:uppercase}.two-column{display:flex}.two-column div{width:50%}.field-and-value{display:flex;padding:10px 0}.field-and-value span:first-child{width:40%}.field-and-value span:nth-child(2){width:60%;word-break:break-all;padding-right:5px}.field-and-value, .one-line span:first-child{width:20%}.field-and-value, .one-line span:nth-child(2){width:80%;word-break:break-all}.one-line{width:100%}.separator{border-bottom:2px solid #333;margin:20px 0 10px 0}div span:nth-child(2){color:#007ab3}.signature-wrapper .header{font-weight:700}.signature-wrapper .signature{width:200px;height:150px;margin:10px 0}.signature-wrapper .name{color:#007ab3}
    
        @page {
            size: A4 portrait;
            margin: 27mm 16mm 27mm 16mm;
        }
        @media print {
            body {
                width: 210mm;
                height: 297mm;
            }
            section {
                padding-top: 0;
                page-break-before: always;
            }
            section:first-of-type {
                page-break-before: avoid;
            }
        }
    </style>
</header>

<body>
    <section id=case-detail-wrapper style=margin:0>
        <div id=file-header-wrapper>
            <h1>VEHICLE CONDITION REPORT FORM</h1>
            <div style=text-align:center;padding:20px;font-size:20px><span style=font-weight:700>Name des Produktes / Vertrages: </span><span>{{productName|defaultValue '-'}}</span></div>
            <div style=display:flex;justify-content:space-between>
                <div><span>Date: </span><span>{{pdfCreatedDate|defaultValue '-'}}</span></div>
                <div><span>Auftragsnummer: </span><span>{{assignmentNumber|defaultValue '-'}}</span></div>
            </div>
        </div>
        <div class=separator style='border-bottom:4px solid #333'></div>
        <div id=customerDetailsWrapper>
            <h2>CUSTOMER DETAILS</h2>
            <div id=customerDetails>
                <div class=two-column>
                    <div class=field-and-value id=firstname><span>Vorname: </span><span>{{assignmentJobCustomerData.firstName|defaultValue '-'}}</span></div>
                    <div class=field-and-value id=lastname><span>Nachname: </span><span>{{assignmentJobCustomerData.lastName|defaultValue '-'}}</span></div>
                </div>
                <div class=two-column>
                    <div class=field-and-value id=email><span>Email: </span><span>{{assignmentJobCustomerData.email|defaultValue '-'}}</span></div>
                    <div class=field-and-value id=phoneNumber><span>Phone Number: </span><span>{{assignmentJobCustomerData.phoneNumber|defaultValue '-'}}</span></div>
                </div>
                <div class='field-and-value one-line' id=eventLocation><span>Einsatzort: </span><span>{{assignmentJobCustomerData.breakdownAddress|defaultValue '-'}}</span></div>
                <div class='field-and-value one-line' id=destinationLocation><span>Destination Location: </span><span>{{assignmentJobCustomerData.repairShopAddress|defaultValue '-'}}</span></div>
            </div>
        </div>
        <div class=separator></div>
        <div id=vehicleDetailsWrapper>
            <h2>VEHICLE DETAILS</h2>
            <div id=vehicleDetails>
                <div class=two-column>
                    <div class=field-and-value id=vehicleBrand><span>Fahrzeugmarke: </span><span>{{assignmentJobVehicleData.vehicleBrand|defaultValue '-'}}</span></div>
                    <div class=field-and-value id=vehicleModel><span>Fahrzeugmodell: </span><span>{{assignmentJobVehicleData.vehicleModel|defaultValue '-'}}</span></div>
                </div>
                <div class=two-column>
                    <div class=field-and-value id=vehicleColor><span>Farbe: </span><span>{{assignmentJobVehicleData.vehicleColor|defaultValue '-'|translate 'thirdparty'}}</span></div>
                    <div class=field-and-value id=vehicleLicensePlate><span>Kennzeichen: </span><span>{{assignmentJobVehicleData.vehicleLicensePlate|defaultValue '-'}}</span></div>
                </div>
                <div class=two-column>
                    <div class=field-and-value id=vehicleVin><span>Fahrgestellnummer (VIN): </span><span>{{assignmentJobVehicleData.vehicleVin|defaultValue '-'}}</span></div>
                    <div class=field-and-value id=vehicleMileage><span>KM-Stand Kundenfahrzeug: </span><span>{{assignmentJobVehicleData.vehicleMileage|defaultValue '-'}}</span></div>
                </div>
                <div class=two-column>
                    <div class=field-and-value id=vehicleFuelType><span>Fuel Type: </span><span>{{assignmentJobVehicleData.vehicleFuelType|defaultValue '-'|translate 'thirdparty'}}</span></div>
                    <div class=field-and-value id=vehicleFuelQuantity><span>Fuel Quantity: </span><span>{{assignmentJobVehicleData.vehicleFuelQuantity|defaultValue '-'}}</span></div>
                </div>
                <div class=two-column>
                    <div class=field-and-value id=vehicleWeight><span>Weight: </span><span>{{assignmentJobVehicleData.vehicleWeight|defaultValue '-'}}</span></div>
                    <div class=field-and-value id=vehicleType><span>Vehicle Category: </span><span>{{assignmentJobVehicleData.vehicleType|defaultValue '-'|translate}}</span></div>
                </div>
                <div class='field-and-value one-line' id=vehiclePassengers><span>Anzahl Insassen: </span><span>{{assignmentJobVehicleData.vehiclePassengers|defaultValue '-'}}</span></div>
                <div class='field-and-value one-line' id=specialInstructions><span>Special Instructions: </span><span>{{assignmentJobVehicleData.specialInstructions|defaultValue '-'}}</span></div>
            </div>
        </div>
        <div class=separator></div>
        <div id=serviceProviderDetails>
            <h2>SERVICE PROVIDER DETAILS</h2>
            <div class=two-column>
                <div class=field-and-value id=providerName><span>Name des Servicepartners: </span><span>{{serviceProviderData.providerName|defaultValue '-'}}</span></div>
                <div class=field-and-value id=operativeName><span>Operative Name: </span><span>{{serviceProviderData.operativeName|defaultValue '-'}}</span></div>
            </div>
            <div class=two-column>
                <div class=field-and-value id=timeReceived><span>Time Received: </span><span>{{serviceProviderData.timeReceived|defaultValue '-'}}</span></div>
                <div class=field-and-value id=timeOnScene><span>Time on Scene: </span><span>{{serviceProviderData.timeOnScene|defaultValue '-'}}</span></div>
            </div>
            <div class=two-column>
                <div class=field-and-value id=timeDepartScene><span>Time Depart Scene: </span><span>{{serviceProviderData.timeDepartScene|defaultValue '-'}}</span></div>
                <div class=field-and-value id=timeDelivered><span>Time Delivered: </span><span>{{serviceProviderData.timeDelivered|defaultValue '-'}}</span></div>
            </div>
            <div id=problemDetails>
                <div>Reported problem & details of work carried out:</div>
                <div style=margin-top:10px;color:#007ab3>{{serviceProviderData.problemDetails|defaultValue '-'}}</div>
            </div>
        </div>
    </section>
    <section>
        <div class=separator></div>
        <h2>Vehicle Condition</h2>
        <div style=width:fit-content;margin:auto;padding:0;margin-bottom:30px>{{vehicleCondition.vehicleImage|image}}</div>
        <div style=width:fit-content;margin-left:auto;margin-right:0>
            <div>{{vehicleCondition.repairable.acronym|translate}} – {{vehicleCondition.repairable.text|translate}}</div>
            <div>{{vehicleCondition.nonRepairable.acronym|translate}} – {{vehicleCondition.nonRepairable.text|translate}}</div>
        </div>
        <div style=margin-top:50px;margin-bottom:50px>{{vehicleCondition.parts|section}}</div>
        <div class=separator></div>
        <div>
            <h2>INSPECTION CONDITION</h2>
            <div style=margin-bottom:30px;color:#007ab3>{{inspectionCondition|multipleStringConcat ', '|defaultValue '-'|translate}}</div>
        </div>
        <div style=display:flex>
            <div style=flex:1>
                <h2>EXTERIOR CONDITION</h2>
                <div class=field-and-value><span>Soiled: </span><span>{{exteriorCondition.soiled|defaultValue '-'|translate}}</span></div>
            </div>
            <div style=flex:1>
                <h2>INTERIOR CONDITION</h2>
                <div class=field-and-value><span>Front seat(s): </span><span>{{interiorCondition.frontSeat|multipleStringConcat ', '|defaultValue '-'|translate}}</span></div>
                <div class=field-and-value><span>Rear seat(s): </span><span>{{interiorCondition.rearSeat|multipleStringConcat ', '|defaultValue '-'|translate}}</span></div>
                <div class=field-and-value><span>Floor covering: </span><span>{{interiorCondition.floorCovering|multipleStringConcat ', '|defaultValue '-'|translate}}</span></div>
                <div class=field-and-value><span>Headlining: </span><span>{{interiorCondition.headlining|multipleStringConcat ', '|defaultValue '-'|translate}}</span></div>
            </div>
        </div>
    </section>{{evidences|section}}{{forceEntry|section}}
    <section>
        <div class=separator></div>
        <h2>CUSTOMER ACKNOWLEDGEMENT & DISCLAIMERS</h2>{{disclaimers|section}}
        <div style='margin:50px 0'>
        <div class=signature-wrapper style=margin-top:20px>
            <div class=header>Technician signature</div>
            <div class=signature>{{signature.technicianSignature|signatureImage}}</div>
            <div class=name>{{serviceProviderData.operativeName}}</div>
        </div>
        <div class=signature-wrapper style=margin-top:50px>
            <div class=header>Customer disclaimer & acknowledgement signature</div>
            <div class=signature>{{signature.customerSignature|signatureImage}}</div>
            <div class=name>{{assignmentJobCustomerData.firstName}} {{assignmentJobCustomerData.lastName}}</div>
        </div>
    </section>
</body>
        `;

        const options = {
            html: templateWithReplacedValue,
            fileName: 'tmpFile',
            height: 841.89,
            width: 595.276,
            paddingLeft: 25,
            bgColor: '#ffffff'
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