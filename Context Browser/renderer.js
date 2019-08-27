const {ipcRenderer} = require('electron')

let isBrowserOpen = false;
function renderBrowser(){
    if(isBrowserOpen){
        ipcRenderer.send('close-browser')
        isBrowserOpen = false;
        return;
    }

    let coord = getCanvasReference("c");
    isBrowserOpen = true;
    ipcRenderer.send('render-browser',{left:coord.left,top:coord.top,height:200,width:330})

}

function getCanvasReference(id){
        var cumulativeOffset = function(element) {
                var top = 0, left = 0;
                do {
                    top += element.offsetTop  || 0;
                    left += element.offsetLeft || 0;
                    element = element.offsetParent;
                } while(element);

                return {
                    top: top,
                    left: left
                };
        };
        var coord = cumulativeOffset(document.getElementById(id));
        return coord;
}