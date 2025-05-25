const logger = require('../../root/logger')
const configuration = require('../../config/configuration')
const tesseract = require('tesseract.js');
const axios = require('axios');
const { DOC_TYPE, PROMPTS } = require('../contants');

const extractDocContent = async(reqBody, res) => {
    let imagePath = '';
    const logPrefix = `extractDocContent ${reqBody.doctype}`
    let docContent = ''
    try{
    logger.info(`ENTRY:: ${logPrefix}`)
    const filename = reqBody?.filename
    if(reqBody?.doctype===DOC_TYPE.PASSPORT){
        imagePath=configuration.tesseract.passport_path
    } else if(reqBody?.doctype === DOC_TYPE.EID){
        imagePath=configuration.tesseract.eid_path
    }
    const filePath = imagePath+filename;
    logger.info(`${logPrefix} imagePath ${imagePath} filename ${filename} filePath ${filePath}`)
    await tesseract.recognize(filePath).then((result) => {
        logger.info(`tessaract result ${result?.data?.text}`);
        docContent = result?.data?.text;
    });
    const extractedData = await extactData('',docContent, reqBody?.doctype)
    logger.info(`EXIT:: ${logPrefix}`)
    res.status(200).json({status: "Success", ocr: docContent, data: JSON.parse(extractedData)})
    } catch(error){
        logger.error(`EXIT:: error:: ${logPrefix} ${JSON.stringify(error)}`)
    }
    
}

const extactData = async(prompt, docContent, doctype) => {
    const logPrefix = `extractData doctype ${doctype}`
    logger.info(`ENTRY:: ${logPrefix}`)
    let docPrompt = '';
    if(doctype===DOC_TYPE.PASSPORT){
        docPrompt = PROMPTS.PASSPORT
    } else if(doctype === DOC_TYPE.EID){
        docPrompt = PROMPTS.EID
    }
    const openAIResponse = await axios.post(
        configuration.openAI.api,
        {
          model: configuration.openAI.model, 
          messages:[{role:"system", content: docContent},{role:"user",content:docPrompt}]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${configuration.openAI.key}`,
          },
        }
      );
      logger.info(`Open AI response ${openAIResponse?.data?.choices?.[0]?.message?.content}`)
      return openAIResponse?.data?.choices?.[0]?.message?.content;
}

module.exports = {
    extractDocContent,
    extactData
}