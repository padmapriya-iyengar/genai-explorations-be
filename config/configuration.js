const configuration = {
    port: 4003,
    header_options: {
        origins: 'http://localhost:4202',
        methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        headers: 'X-Requested-With, content-type',
        credentials: true
    },
    log_config: {
        folder_path: './/logs//',
        file_path: 'data-extractor-log-%DATE%.log'
    },
    tesseract:{
        passport_path:'d:/Nandu/projects/genai-explorations-be/assets/passport/',
        eid_path:'d:/Nandu/projects/genai-explorations-be/assets/eid/',
        config:{
            lang: 'eng', 
            oem: 1,
            psm: 3  
        }
    },
    openAI:{
        key:"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",
        api: "https://api.openai.com/v1/chat/completions",
        model:"gpt-4.1"
    },
}

module.exports = configuration