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
  return (
    checkFunctionCode(
      WebGLRenderingContext.prototype.bufferData,
      "bufferData"
    ) ||
    checkFunctionCode(WebGL2RenderingContext.prototype.bufferData, "bufferData")
  );
}
