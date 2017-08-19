var sampleTree = 
{
    a: {
        id: "a",
        l: {
            id: "al",
            i: {
                id: "ali",
                v: {        
                    id: "aliv",
                    e : {
                        id: "alive",
                        isWord: true,
                    }
                },
                k: {        
                    id: "alik",
                    e: {
                        id: "alike",
                        isWord: true,
                    }
                }
            },
            l: {
                id: "all",
                isWord: true,
            }
        }
    },
    b: {
        id: "b",
        e: {
            id: "be",
            isWord: true,            
        }
    }
}

module.exports.sampleTree = sampleTree ;