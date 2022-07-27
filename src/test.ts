function checkFunctionCode(func, expectedName){
    const reg = new RegExp("^\\s*function " + expectedName + "\\s*\\(\\)\\s*\\{\\s*\\[native code\\]\\s*\\}\\s*$");
    if (!func.toString().match(reg)){
        return true;
    }
    return false;
}

export async function checkFnGetImageData() {
    return checkFunctionCode(
        CanvasRenderingContext2D.prototype.getImageData,
        "getImageData"
    );
}
  
export async function checkFnToDataURL() {
    return checkFunctionCode(
		HTMLCanvasElement.prototype.toDataURL,
		"toDataURL"
	);
}