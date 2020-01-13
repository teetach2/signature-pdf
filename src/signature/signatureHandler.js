const signatureHandler = () => {
    const wrapper = document.getElementById('signature-pad');
    const clearButton = wrapper.querySelector('[data-action=clear]');
    const saveButton = wrapper.querySelector('[data-action=save]');
    const canvas = wrapper.querySelector('canvas');
    
    // Adjust canvas coordinate space taking into account pixel ratio,
    // to make it look crisp on mobile devices.
    // This also causes canvas to be cleared.
    const resizeCanvas = () => {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        const ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
    }
    
    window.onresize = resizeCanvas;
    resizeCanvas();
    
    // This class related with SignatureEngine.js which is a engine to draw signature
    const signaturePad = new SignaturePad(canvas);
    
    clearButton.addEventListener('click', () => {
        signaturePad.clear();
    });
    
    saveButton.addEventListener('click', () => {
        if (signaturePad.isEmpty()) {
            window.ReactNativeWebView.postMessage('EMPTY');
        } else {
            window.ReactNativeWebView.postMessage(signaturePad.toDataURL());
            signaturePad.clear();
        }
    });
};

export default signatureHandler;