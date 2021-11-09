export const isURLValid = (givenUrl) => {
    try { 
        return Boolean(new URL(givenUrl)); 
    }
    catch(e){ 
        return false; 
    }
}