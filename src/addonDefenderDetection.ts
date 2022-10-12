function checkFunctionCode(func, expectedName): boolean {
  const reg = new RegExp(
    "^\\s*function " +
      expectedName +
      "\\s*\\(\\)\\s*\\{\\s*\\[native code\\]\\s*\\}\\s*$"
  );
  if (!func.toString().match(reg)) {
    return true;
  }
  return false;
}

export function isFnCanvasDefender(): boolean {
  return checkFunctionCode(HTMLCanvasElement.prototype.toDataURL, "toDataURL");
}

export function isFnWebGLDefender(): boolean {
  return false;
  return (
    checkFunctionCode(
      WebGLRenderingContext.prototype.bufferData,
      "bufferData"
    ) ||
    checkFunctionCode(WebGL2RenderingContext.prototype.bufferData, "bufferData")
  );
}

export function isFnFontDefender(): boolean {
  return false;
}

export function isFnAudioContextDefender(): boolean {
  return false;
  return (
    checkFunctionCode(AudioBuffer.prototype.getChannelData, "getChannelData") ||
    checkFunctionCode(
      BaseAudioContext.prototype.createAnalyser,
      "createAnalyser"
    )
  );
}
