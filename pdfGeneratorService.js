class pdfGeneratorService {

    placeHolderPattern = /{{\w+(\|checkboxAndText)?(\|translate)?}}/g;

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
        if (templateType === 'addDCM') {
            return `<h1>PDF TEST</h1><div>{{replacethis}} {{replacethat|translate}}</div><div>this value should left blank: {{blankValue|translate}}</div>`;
        } else if (templateType === 'DCM') {
            return `<div>{{logo}}</div>
            <h1>PDF TEST</h1><div>{{replacethis}} {{replacethat|translate}}</div>
            <hr>
            <h1>Basic Disclaimer</h1>
            <div>
            {{basicDCM|checkboxAndText}}
            <hr>
            <h1>Additional Disclaimer</h1>
            <div>
            {{addDCM|checkboxAndText}}
            </div>`;
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
        if (keyToFind.includes('logo')) {
            return this.getLogo();
        }
        if (keyToFind.includes('|checkboxAndText')) {
            return this.getCheckboxAndTextValue(keyToFind, valueToReplace);
        }
        if (keyToFind.includes('|translate')) {
            return this.getTranslatedValue(keyToFind, valueToReplace);
        }
        const result = valueToReplace[keyToFind];
        return result ? result : '';
    }

    /**
     * get translated value of a placeHolder with pipe `|translate` from valueToReplace
     * @param placeHolder {{placeHolder|translate}} from HTML template
     * @param valueToReplace Object of field and value to replace in placeHolder ex. { field: value }
     * 
     * @return value of a placeholder (with or without translation)
     */
    getTranslatedValue(keyToFind, valueToReplace) {
        const keyToTranslate = keyToFind.replace('|translate', '');
        const result = valueToReplace[keyToTranslate];
        return result ? 'translated: ' + valueToReplace[keyToTranslate] : '';
    }

    /**
     * get checkbox and text value of a placeHolder with pipe `|checkboxAndText` from valueToReplace
     * @param placeHolder {{placeHolder|checkboxAndText}} from HTML template
     * @param valueToReplace Object of field and value to replace in placeHolder ex. { field: [ { isChecked: true, text: value } ] }
     * 
     * @return value of a placeholder (with or without translation)
     */
    getCheckboxAndTextValue(keyToFind, valueToReplace) {
        const needTranslation = keyToFind.includes('|translate');
        const checkboxKey = keyToFind.replace('|checkboxAndText','').replace('|translate', '');
        const checkboxAndTextValue = valueToReplace[checkboxKey];
        return this.getCheckboxAndTextHTMLTemplate(checkboxAndTextValue, needTranslation);
    }

    /**
     * get logo to attach in pdf
     * 
     * @return html of logo image
     */
    getLogo() {
        const logoPath = 'path/to/logo';
        return `<div>${logoPath}</div>`;
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
    getCheckboxAndTextHTMLTemplate(textList, needTranslation) {
        return textList.map((dcm) => {
            const { isChecked, text } = dcm;
            const textToRender = needTranslation ? `translated: ${text}` : text;
            return (`<div style="display: flex;">
            <div style="flex: 1">${isChecked}
            </div>
            <div style="flex: 10">
            ${textToRender}
            </div>
            </div>`);
        }).join('');
    }

    /** 
     * replace value from the form and replace all in the templates
     * @param templates HTML file
     * @param valueToReplace Object with field and value ex. { field: value }
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