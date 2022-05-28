// https://stackoverflow.com/questions/6453269/jquery-select-element-by-xpath
export function xPath(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }
    return xnodes;
}

export function getElementsFromXPathObject(XPaths) {
    let output = {}
    for (const [key, value] of Object.entries(XPaths)) {
        output[key] = xPath(value)[0]
    }
    return output
}