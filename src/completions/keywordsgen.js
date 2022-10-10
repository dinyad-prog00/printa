export const keywordsgen = (list)=>{
    return list.map((k)=> { return {label: k, type:"keyword"}});

}

export const variablesgen = (list)=>{
    return list.map((k)=> { return {label: k, type:"variable"}});

}

export const functionsgen = (list)=>{
    return list.map((k)=> { return {label: k, type:"function"}});

}

export const constsgen = (list)=>{
    return list.map((k)=> { return {label: k, type:"constant"}});

}
