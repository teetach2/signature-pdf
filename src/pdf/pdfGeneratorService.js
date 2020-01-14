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
        if (templateType === 'DCM') {
            return `<div>{{logo}}</div>
            <div style="display: flex">
                <div style="flex: 1">
                    <div style="display: flex">
                        <div style="flex: 1">
                        Customer Name:
                        </div>
                        <div style="flex: 2">
                        {{customerName}}
                        </div>
                    </div>
                </div>
                <div style="flex: 1">
                    <div style="display: flex">
                        <div style="flex: 1">
                        Vehicle Type:
                        </div>
                        <div style="flex: 2">
                        {{vehicle|translate}}
                        </div>
                    </div>
                </div>
            </div>
            <h1>PDF TEST</h1><div>{{replacethis}} {{replacethat|translate}}</div>
            <hr>
            <h1>Basic Disclaimer</h1>
            <div>
            {{basicDCM|checkboxAndText}}
            <hr>
            <h1>Additional Disclaimer</h1>
            <div>
            {{addDCM|checkboxAndText}}
            </div>
            <div>
            {{damagePhotos|singleImage|translate}}
            </div>
            <div>
                <h1>Severity</h1>
                <div>1. severity: {{severity1|indicateServerity}}</div>
                <div>2. severity: {{severity2|indicateServerity}}</div>
                <div>3. severity: {{severity3|indicateServerity}}</div>
                <div>4. severity: {{severity4|indicateServerity}}</div>
                <div>5. severity: {{severity5|indicateServerity}}</div>
            </div>
            <div>
            {{additionalPhoto|imageGrid}}
            </div>
            `;
        } else if (templateType === 'withPhotos') {
            return `<h1>PDF TEST11</h1>
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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxGQRZEnqvF5ALRHZD80V8H4kP60YXfU6s_MydGu0Q8AWVLz4&s" alt="Girl in a jacket" width="300" height="300">`;
        } else {
            return 'No template';
        }
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
        const template = this.getTemplate('DCM');
        const placeHolders = this.getPlaceHolders(template);
        return this.replaceValue(template, valueToReplacePlaceHolder, placeHolders);
    }

}

export default new pdfGeneratorService;