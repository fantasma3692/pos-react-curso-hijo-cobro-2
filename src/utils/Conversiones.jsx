
export function ConvertirCapitalize(input) {
    return (input.charAt(0).toUpperCase()+input.slice(1).toLowerCase());
  
  }
  export function ConvertirMinusculas(input){
    return input.toLowerCase()
  }
  export function FormatearNumeroDinero(numero,currency,iso){
    if(currency===undefined){
      return;
    }
    const esiso="es-" + iso
    const numeroconvertido=numero.toLocaleString(esiso,{style:"currency",currency:`${currency}` })
    return numeroconvertido
  }