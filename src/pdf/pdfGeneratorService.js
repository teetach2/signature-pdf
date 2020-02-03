class pdfGeneratorService {

    pipes = {
        TOPIC_AND_IMAGE_GRID: '|imageGrid',
        TOPIC_AND_SINGLE_IMAGE: '|singleImage',
        INDICATE_SEVERITY: '|indicateServerity',
        CHECKBOX_AND_TEXT: '|checkboxAndText',
        TRANSLATE: '|translate',
        LOGO: 'logo'
    }

    severityLevel = {
        HIGH: { text: 'HIGH', color: 'red' },
        MEDIUM: { text: 'MEDIUM', color: 'orange' },
        LOW: { text: 'LOW', color: 'green' },
        NO_DAMAGE: { text: 'NO DAMAGE', color: 'grey' }
    }

    placeHolderPattern = /{{\w+(\|logo)?(\|imageGrid)?(\|indicateServerity)?(\|singleImage)?(\|checkboxAndText)?(\|translate)?}}/g;

    /** 
     * for getting template
     * currently it returns dummy template
     * 
     * placeholder value will be
     * {{value}} for render a value
     * {{some.key.to.translate|translate}} to translate
     * 
     * @deprecated @param templateType for getting different template style
     * @return html template
     * **/
    getTemplate(templateType) {
        return `<header><style>@media print{body,html{width:210mm;height:297mm}section{page-break-after:always}}@page{size:A4;margin:0}section:first-child{margin:0}section{margin:130px 0}body{padding:80px 100px;font-family:\"Trebuchet MS\",sans-serif}h1{text-align:center;margin:0;font-weight:700}h2{margin:0;font-weight:700;padding:10px 0 30px 0;text-transform:uppercase}.two-column{display:flex}.two-column div{width:50%}.field-and-value{display:flex;padding:10px 0}.field-and-value span:first-child{width:40%}.field-and-value span:nth-child(2){width:60%;word-break:break-all;padding-right:5px}.field-and-value, .one-line span:first-child{width:20%}.field-and-value, .one-line span:nth-child(2){width:80%;word-break:break-all}.one-line{width:100%}.separator{border-bottom:2px solid #333;margin:20px 0 10px 0}div span:nth-child(2){color:#007ab3}.signature-wrapper .header{font-weight:700}.signature-wrapper .signature{width:200px;height:150px;margin:10px 0}.signature-wrapper .name{color:#007ab3}</style></header><body> <section id=case-detail-wrapper style=margin:0><div id=file-header-wrapper><h1>VEHICLE CONDITION REPORT FORM</h1><div style=text-align:center;padding:20px;font-size:20px><span style=font-weight:700>Name des Produktes / Vertrages: </span><span>{{productName|defaultValue '-'}}</span></div><div style=display:flex;justify-content:space-between><div><span>Date: </span><span>{{pdfCreatedDate|defaultValue '-'}}</span></div><div><span>Auftragsnummer: </span><span>{{assignmentNumber|defaultValue '-'}}</span></div></div></div><div class=separator style=\"border-bottom:4px solid #333\"></div><div id=customerDetailsWrapper><h2>CUSTOMER DETAILS</h2><div id=customerDetails><div class=two-column><div class=field-and-value id=firstname><span>Vorname: </span><span>{{assignmentJobCustomerData.firstname|defaultValue '-'}}</span></div><div class=field-and-value id=lastname><span>Nachname: </span><span>{{assignmentJobCustomerData.lastname|defaultValue '-'}}</span></div></div><div class=two-column><div class=field-and-value id=email><span>Email: </span><span>{{assignmentJobCustomerData.email|defaultValue '-'}}</span></div><div class=field-and-value id=phoneNumber><span>Phone Number: </span><span>{{assignmentJobCustomerData.phoneNumber|defaultValue '-'}}</span></div></div><div class=\"field-and-value one-line\" id=eventLocation><span>Einsatzort: </span><span>{{assignmentJobCustomerData.breakdownAddress|defaultValue '-'}}</span></div><div class=\"field-and-value one-line\" id=destinationLocation><span>Destination Location: </span><span>{{assignmentJobCustomerData.repairShopAddress|defaultValue '-'}}</span></div></div></div><div class=separator></div><div id=vehicleDetailsWrapper><h2>VEHICLE DETAILS</h2><div id=vehicleDetails><div class=two-column><div class=field-and-value id=vehicleBrand><span>Fahrzeugmarke: </span><span>{{assignmentJobVehicleData.vehicleBrand|defaultValue '-'}}</span></div><div class=field-and-value id=vehicleModel><span>Fahrzeugmodell: </span><span>{{assignmentJobVehicleData.vehicleModel|defaultValue '-'}}</span></div></div><div class=two-column><div class=field-and-value id=vehicleColor><span>Farbe: </span><span>{{assignmentJobVehicleData.vehicleColor|defaultValue '-'|translate 'thirdparty'}}</span></div><div class=field-and-value id=vehicleLicensePlate><span>Kennzeichen: </span><span>{{assignmentJobVehicleData.vehicleLicensePlate|defaultValue '-'}}</span></div></div><div class=two-column><div class=field-and-value id=vehicleVin><span>Fahrgestellnummer (VIN): </span><span>{{assignmentJobVehicleData.vehicleVin|defaultValue '-'}}</span></div><div class=field-and-value id=vehicleMileage><span>KM-Stand Kundenfahrzeug: </span><span>{{assignmentJobVehicleData.vehicleMileage|defaultValue '-'}}</span></div></div><div class=two-column><div class=field-and-value id=vehicleFuelType><span>Fuel Type: </span><span>{{assignmentJobVehicleData.vehicleFuelType|defaultValue '-'|translate 'thirdparty'}}</span></div><div class=field-and-value id=vehicleFuelQuantity><span>Fuel Quantity: </span><span>{{assignmentJobVehicleData.vehicleFuelQuantity|defaultValue '-'}}</span></div></div><div class=two-column><div class=field-and-value id=vehicleWeight><span>Weight: </span><span>{{assignmentJobVehicleData.vehicleWeight|defaultValue '-'}}</span></div><div class=field-and-value id=vehicleType><span>Vehicle Category: </span><span>{{assignmentJobVehicleData.vehicleType|defaultValue '-'|translate}}</span></div></div><div class=\"field-and-value one-line\" id=vehiclePassengers><span>Anzahl Insassen: </span><span>{{assignmentJobVehicleData.vehiclePassengers|defaultValue '-'}}</span></div><div class=\"field-and-value one-line\" id=specialInstructions><span>Special Instructions: </span><span>{{assignmentJobVehicleData.specialInstructions|defaultValue '-'}}</span></div></div></div><div class=separator></div><div id=serviceProviderDetails><h2>SERVICE PROVIDER DETAILS</h2><div class=two-column><div class=field-and-value id=providerName><span>Name des Servicepartners: </span><span>{{serviceProviderData.providerName|defaultValue '-'}}</span></div><div class=field-and-value id=operativeName><span>Operative Name: </span><span>{{serviceProviderData.operativeName|defaultValue '-'}}</span></div></div><div class=two-column><div class=field-and-value id=timeReceived><span>Time Received: </span><span>{{serviceProviderData.timeReceived|defaultValue '-'}}</span></div><div class=field-and-value id=timeOnScene><span>Time on Scene: </span><span>{{serviceProviderData.timeOnScene|defaultValue '-'}}</span></div></div><div class=two-column><div class=field-and-value id=timeDepartScene><span>Time Depart Scene: </span><span>{{serviceProviderData.timeDepartScene|defaultValue '-'}}</span></div><div class=field-and-value id=timeDelivered><span>Time Delivered: </span><span>{{serviceProviderData.timeDelivered|defaultValue '-'}}</span></div></div><div id=problemDetails><div>Reported problem & details of work carried out:</div><div style=margin-top:10px;color:#007ab3>{{serviceProviderData.problemDetails|defaultValue '-'}}</div></div></div> </section> <section><div class=separator></div><h2>Vehicle Condition</h2><div style=width:fit-content;margin:auto;padding:0;margin-bottom:30px>{{vehicleCondition.vehicleImage|image}}</div><div style=width:fit-content;margin-left:auto;margin-right:0><div>{{vehicleCondition.repairable.acronym|translate}} – {{vehicleCondition.repairable.text|translate}}</div><div>{{vehicleCondition.nonRepairable.acronym|translate}} – {{vehicleCondition.nonRepairable.text|translate}}</div></div><div style=margin-top:50px;margin-bottom:50px>{{vehicleCondition.parts|damageParts}}</div><div class=separator></div><div><h2>INSPECTION CONDITION</h2><div style=margin-bottom:30px;color:#007ab3>{{inspectionCondition|multipleStringConcat ', '|defaultValue '-'|translate}}</div></div><div style=display:flex><div style=flex:1><h2>EXTERIOR CONDITION</h2><div class=field-and-value><span>Soiled: </span><span>{{exteriorCondition.soiled|defaultValue '-'|translate}}</span></div></div><div style=flex:1><h2>INTERIOR CONDITION</h2><div class=field-and-value><span>Front seat(s): </span><span>{{interiorCondition.frontSeat|multipleStringConcat ', '|defaultValue '-'|translate}}</span></div><div class=field-and-value><span>Rear seat(s): </span><span>{{interiorCondition.rearSeat|multipleStringConcat ', '|defaultValue '-'|translate}}</span></div><div class=field-and-value><span>Floor covering: </span><span>{{interiorCondition.rearSeat|multipleStringConcat ', '|defaultValue '-'|translate}}</span></div><div class=field-and-value><span>Headlining: </span><span>{{interiorCondition.rearSeat|multipleStringConcat ', '|defaultValue '-'|translate}}</span></div></div></div> </section>{{evidences}}{{forceEntry}} <section><div class=separator></div><h2>CUSTOMER ACKNOWLEDGEMENT & DISCLAIMERS</h2>{{disclaimers}}<div style=\"margin:50px 0\"><h3><span>Vehicle condition changed: </span><span style=font-weight:400>{{vehicleConditionChanged}}</span></h3></div><div class=signature-wrapper style=margin-top:20px><div class=header>Technician signature</div><div class=signature>{{signature.technicianSignature|image}}</div><div class=name>{{serviceProviderData.operativeName}}</div></div><div class=signature-wrapper style=margin-top:50px><div class=header>Repair shop technician signature</div><div class=signature>{{signature.repairshopSignature|image}}</div><div class=name>{{repairshopName}}</div></div><div class=signature-wrapper style=margin-top:50px><div class=header>Customer disclaimer & acknowledgement signature</div><div class=signature>{{signature.customerSignature|image}}</div><div class=name>{{assignmentJobCustomerData.firstname}} {{assignmentJobCustomerData.lastname}}</div></div> </section></body>`
    }

    /**
     * get value of a placeHolder from valueToReplace
     * @param placeHolder {{placeHolder}} from HTML template
     * @param valueToReplace Object of field and value to replace in placeHolder ex. { field: value }
     * 
     * @return value of a placeholder (with or without translation)
     */
    getValueOfPlaceHolder(placeHolder, valueToReplace) {
        const keyToFind = placeHolder.substring(2, placeHolder.length-2);
        if (keyToFind.includes(this.pipes.LOGO)) {
            return this.getLogo();
        }
        if (keyToFind.includes(this.pipes.CHECKBOX_AND_TEXT)) {
            return this.getCheckboxAndTextValue(keyToFind, valueToReplace);
        }
        if (keyToFind.includes(this.pipes.TOPIC_AND_SINGLE_IMAGE)) {
            return this.getSingleImage(keyToFind, valueToReplace);
        }
        if (keyToFind.includes(this.pipes.TOPIC_AND_IMAGE_GRID)) {
            return this.getImageGrid(keyToFind, valueToReplace);
        }
        if (keyToFind.includes(this.pipes.INDICATE_SEVERITY)) {
            return this.indicateServerity(keyToFind, valueToReplace);
        }
        if (keyToFind.includes(this.pipes.TRANSLATE)) {
            return this.getTranslatedValue(keyToFind, valueToReplace);
        }
        const result = valueToReplace[keyToFind];
        return result ? result : '';
    }

    /**
     * get translated value of a placeHolder with pipe `|translate` from valueToReplace
     * @param placeHolder placeHolder|translate from HTML template
     * @param valueToReplace Object of field and value to replace in placeHolder ex. { field: value }
     * 
     * @return value of a placeholder (with or without translation)
     */ 
    getTranslatedValue(keyToFind, valueToReplace) {
        if (!keyToFind.includes(this.pipes.TRANSLATE)) {
            return;
        }
        const keyToTranslate = keyToFind.replace(this.pipes.TRANSLATE, '');
        const result = valueToReplace[keyToTranslate];
        return result ? 'translated: ' + valueToReplace[keyToTranslate] : '';
    }

    /**
     * render checkbox and text in one line
     * 
     * @param textList list of text that will be rendered with checkbox and text
     * [
     *  { isChecked: false, text: 'translatin.key.1' }, // render with uncheck checkbox and translated value
     *  { isChecked: true, text: 'translatin.key.2' }, // render with uncheck checkbox and translated value
     * ]
     * 
     * @return a HTML string of checkbox and text for each object in textList
     */
    getCheckboxAndTextValue(keyToFind, valueToReplace) {
        if (!keyToFind.includes(this.pipes.CHECKBOX_AND_TEXT)) {
            return;
        }
        const needTranslation = keyToFind.includes(this.pipes.TRANSLATE);
        const checkboxKey = keyToFind.replace(this.pipes.CHECKBOX_AND_TEXT,'').replace(this.pipes.TRANSLATE, '');
        const checkboxAndTextValue = valueToReplace[checkboxKey];
        return checkboxAndTextValue.map((dcm) => {
            const { isChecked, text } = dcm;
            const textToRender = needTranslation ? `translated: ${text}` : text;
            return (`<div style="display: flex;">
            <div style="flex: 1">${isChecked}
            </div>
            <div style="flex: 10">
            ${textToRender}
            </div>
            </div>`);
        }).join('');;
    }

    /**
     * get logo to attach in pdf
     * @param placeHolder logo from HTML template
     * @param valueToReplace Object of field and value to replace in placeHolder 
     * ex. { logo: 'path/to/logo.jpg' }
     * 
     * @return html of logo image
     */
    getLogo() {
        const logoPath = 'path/to/logo';
        return `<div>${logoPath}</div>`;
    }

    /**
     * get topic and single image html
     * @param placeHolder placeHolder|singleImage from HTML template
     * @param valueToReplace Object of field and value to replace in placeHolder 
     * ex. { damagePhotos: [
                {
                    topic: 'topic1',
                    imagePath: 'path/to/img/1',
                    comment: 'comment jaaaaaa'
                }
            }
     * 
     * @return html of single image with topic and comment
     */
    getSingleImage(keyToFind, valueToReplace) {
        if (!keyToFind.includes(this.pipes.TOPIC_AND_SINGLE_IMAGE)) {
            return;
        }
        const key = keyToFind.replace(this.pipes.TOPIC_AND_SINGLE_IMAGE, '');
        const needTranslation = key.includes(this.pipes.TRANSLATE);
        const keyToFindTopicAndImage = key.replace(this.pipes.TRANSLATE, '');
        const topicAndImages = valueToReplace[keyToFindTopicAndImage];
        return topicAndImages.map((item) => {
            const { topic, imagePath, comment } = item;
            return `<div>
            ${topic ? `<h2>${needTranslation ? 'translated: ' + topic : topic}</h2>` : ''}
            ${imagePath? `<div>${imagePath}</div>` : ''}
            ${comment ? `<div>Comment: ${comment}</div>`: ``}
            </div>`
        }).join('');
    }
    
    /**
     * get topic and image grid html
     * @param placeHolder placeHolder|imageGrid from HTML template
     * @param valueToReplace Object of field and value to replace in placeHolder 
     * ex. { photoGrid: {
                topic: 'Photos',
                imagePaths: [
                    'path/to/img/1',
                    'path/to/img/2',
                    'path/to/img/3',
                ],
                comment: "Some Comment"
            }
        }
     * 
     * @return html of image grid with topic and comment
     */
    getImageGrid(keyToFind, valueToReplace) {
        if (!keyToFind.includes(this.pipes.TOPIC_AND_IMAGE_GRID)) {
            return;
        }
        const key = keyToFind.replace(this.pipes.TOPIC_AND_IMAGE_GRID, '');
        const needTranslation = key.includes(this.pipes.TRANSLATE);
        const keyToFindTopicAndImages = key.replace(this.pipes.TRANSLATE, '');
        const topicAndImages = valueToReplace[keyToFindTopicAndImages];
        const { topic, imagePaths, comment } = topicAndImages;
        return (`<div>
            ${topic ? `<h2>${needTranslation ? 'translated: ' + topic : topic}</h2>` : ''}
            ${imagePaths && imagePaths.length > 0 ? 
                `${imagePaths.map((item, key) => {
                    let result = '';
                    if ((key+1) % 3 === 1) {
                        result = result.concat('<div style="display: flex">');
                    }
                    
                    result = result.concat(`<div style="flex: 1; border: 1px solid #111; padding-bottom: 10px; padding-right: 10px;">${item}</div>`);
    
                    if ((key+1) % 3 === 0 || key === (imagePaths.length-1)) {
                        result = result.concat('</div>');
                    }
                    return result;
                }).join('')}` : ''}
            
            ${comment ? `<div>Comment: ${comment}</div>`: ``}
            </div>`);
    }

    /**
     * get text with severity color
     * RED - HIGH
     * ORANGE - MEDIUM
     * GREEN - LOW
     * GRAY - NO DAMAGE
     * @param placeHolder placeHolder|checkboxAndText from HTML template
     * @param valueToReplace Object of field and value to replace in placeHolder 
     * ex. { severity1: {
                severity: pdfGeneratorService.severityLevel.HIGH.text,
                repairable: 'R'
            } 
        }
     * 
     * @return html of text with severity color
     */
    indicateServerity(keyToFind, valueToReplace) {
        if (!keyToFind.includes(this.pipes.INDICATE_SEVERITY)) {
            return;
        }
        const key = keyToFind.replace(this.pipes.INDICATE_SEVERITY, '');
        const needTranslation = key.includes(this.pipes.TRANSLATE);
        const keyToFindText = key.replace(this.pipes.TRANSLATE, '');
        const value = valueToReplace[keyToFindText];
        if (!value) {
            return '';
        }
        const { severity, repairable } = value;
        const severityToFind = severity.replace(' ', '_');
        const colorCss = this.severityLevel[severityToFind] ? this.severityLevel[severityToFind].color : 'black';
        const severityText = this.severityLevel[severityToFind] ? this.severityLevel[severityToFind].text : '';
        return `<div style="color: ${colorCss}">
            ${needTranslation ? 'translated: ' + severityText : severityText} ${repairable ? `- ${repairable}` : ''}
            </div>`;
    }

    /**
     * get placeholders from template
     * @param template HTML template ex. <div>{{replacethis}} {{replacethat|translate}}</div>
     * 
     * @return array of placeolhders ex. [ "{{replacethis}}", "{{replacethat}}" ]
     */
    getPlaceHolders(template) {
        return template.match(this.placeHolderPattern);
    }

    /** 
     * replace value from the form and replace all in the templates
     * @param templates HTML file
     * @param valueToReplace Object with field and value see example in ResultScreen.js
     * 
     * @return HTML template that replaced all placeholder with value
    */
    replaceValue(template, valueToReplace, placeHolder) {
        placeHolder.forEach(element => {
            template = template.replace(element, this.getValueOfPlaceHolder(element, valueToReplace));
        });
        return template;
    }

    /** 
     * generate html
     * @param valueToReplacePlaceHolder ex. { field: value }
     * @return HTML that already replaced all placeholder with value
    */
   getHTMLtoRender(valueToReplacePlaceHolder) {
        const template = this.getTemplate();
        const placeHolders = this.getPlaceHolders(template);
        return this.replaceValue(template, valueToReplacePlaceHolder, placeHolders);
    }

}

export default new pdfGeneratorService;