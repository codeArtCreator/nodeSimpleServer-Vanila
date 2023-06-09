module.exports = (template,data) => {
    let output = template.replace('{{%IMAGE%}}', data.productImage)
    output = output.replace('{{%NAME%}}', data.name)
    output = output.replace('{{%MODELNAME%}}', data.modeName)
    output = output.replace('{{%MODELNO%}}', data.modelNumber)
    output = output.replace('{{%SIZE%}}', data.size)
    output = output.replace('{{%CAMERA%}}', data.camera)
    output = output.replace('{{%PRICE%}}', data.price)
    output = output.replace('{{%COLOR%}}', data.color)
    output = output.replace('{{%ID%}}', data.id)
    output = output.replace('{{%NAME%}}', data.name)
    output = output.replace('{{%ROM%}}', data.ROM)
    output = output.replace('{{%DESC%}}', data.Description)

    return output;
}