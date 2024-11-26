export function sendError(response , error){
    console.log(error);
    
    return response.json(error)
}