import AE from "aggregate-error"; // rassembler erreurs en une seule erreur
import { ValidationError } from "class-validator";
import { TypeORMError } from "typeorm";

// structures de données
interface IError extends Error {
  field: string | null;
  message: string;
}

//formatage des erreurs venant de class-validator
export function aggregateErrors(
  errors: ValidationError[]

): any {
  const errorsFormated = errors.map((error) => {
    console.log("ERROR DE VALIDATION : ", error);
    if (error.constraints) {
          // Si des contraintes existent dans erreur
      // const key = Object.keys(error.constraints); // "min"
      const key = Object.keys(error?.constraints || {})[0]; // "min" Obtenir la première contrainte
      console.log("KEY =============>", key);
      console.log("PROPERTY", error.property);
      return {
        field: error.property,
        message: error.constraints[key], //error.contraints["min"]  Extraire message contrainte
      };
    } else {
      return {}; //objet vide si aucune contrainte
    }
  });
  return errorsFormated;
}
 //formater les erreurs globales
export function formatedErrors(err: AggregateError | TypeORMError) {
  const e: any = {
    errors: [],
  };

  if (err.name === "AggregateError") {
    // Si erreur est de type AggregateError
    const aggregateError = err as AE<IError>;
    e.errors = aggregateError.errors;
  }

  return e;
}