var testTree = 
{
    letters:[
    {
        letter: "a",
        ptr: {
            letters:[
            {
                letter: "l",
                id: "al",
                ptr: {
                    letters:[
                    {
                        letter: "e",
                        id: "ale",
                        ptr: null 
                    },
                    {
                        letter: "i",
                        id: "ali",
                        ptr: {
                            letters:[                            
                                {                            
                                letter: "v",
                                id: "aliv",
                                ptr: {        
                                    letters:[
                                    {                            
                                        letter: "e",
                                        id: "alive",
                                        isWord: true,
                                        ptr: null                           
                                    }           
                                    ]
                                }
                            }
                            ]
                        }           
                    }
                    ]
                }
            }
            ]
        }
    },
    ]
}

module.exports.sampleTree = testTree ;