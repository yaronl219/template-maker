import { httpService } from "./httpService";

export const downloadService = {
    downloadZip
}

async function downloadZip(projectSettings) {
    const file = await httpService.postBlob('templates',projectSettings)

    var url = window.URL.createObjectURL(file);
    var a = document.createElement('a');
    a.href = url;
    a.download = `${projectSettings.projectName}.zip`;
    document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
    a.click();    
    a.remove();  //afterwards we remove the element again    


    // const filePath = window.URL.createObjectURL(file);
    // console.log(filePath)
    // window.location.assign(filePath);
}