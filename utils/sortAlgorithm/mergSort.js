/* ESTE ALGORITMO DE ORDENAMIENTO SOLO PUEDE ORDENAR EL ARRAY QUE ME DEVUELVE LA BASE DE DATOS , NO ES REUTILIZABLE
SI NECESITAS HACER USO DE UN ALGORITMO DE ORDENAMIENTO DEBERIAS DE CREAR UNO EN UN NUEVO ARCHIVO, PODRIAS 
REUTLILIZAR ESTE CODIGO SI CAMBIAS LO SIGUIENTE:
  left[leftIndex].regular[0] ====>  left[leftIndex]
  right[leftIndex].regular[0] ====>  right[leftIndex]
EN EL IF DENTRO DEL WHILE EN LA FUNCION MERGE
*/

/* ***************MERGE FUNCTION*********** */
let merge =(left, right)=> {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
  
    // We will concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
      if (parseFloat(left[leftIndex].regular[0]) < parseFloat(right[rightIndex].regular[0]) ) {
        resultArray.push(left[leftIndex]);
        leftIndex++; // move left array cursor
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++; // move right array cursor
      }
    }
  
    // We need to concat here because there will be one element remaining
    // from either left OR the right
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
  }
  
  
  
  // Merge Sort Implentation (Recursion)
  let mergeSort= (unsortedArray) => {
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }
    // Dividimos el array entrante en dos 
    const middle = Math.floor(unsortedArray.length / 2);
  
    // Asignamos una parte izq y una derecha en 
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);
  
    // Using recursion to combine the left and right
    return merge(
      mergeSort(left), mergeSort(right)
    );
  }




module.exports = mergeSort

