export  function dateParser(dateString){
    const [day , month , year] = dateString.split('-').map(Number)
    return new Date(Date.UTC(year , month-1 , day))
}