// Importation des modules nécessaires
import AE from "aggregate-error";
import { ValidationError } from "class-validator";
import { TypeORMError } from "typeorm";

// Interface pour définir la structure d'une erreur personnalisée
interface IError extends Error {
  field: string | null;
  message: string;
}

// Définir un type personnalisé pour AggregateError
type CustomAggregateError = AE<IError>;

// Fonction pour agréger les erreurs provenant de class-validator et les formater
export function aggregateErrors(errors: ValidationError[]): any {
  const errorsFormatted = errors.map((error) => {
    console.log("ERROR DE VALIDATION : ", error);
    if (error.constraints) {
      const key = Object.keys(error?.constraints || {})[0]; // Récupération de la première contrainte d'erreur
      console.log("KEY =============>", key);
      console.log("PROPERTY", error.property);
      return {
        field: error.property,
        message: error.constraints[key], // Récupération du message d'erreur correspondant à la contrainte
      };
    } else {
      return {};
    }
  });
  console.log("ERROR FORMATED =====>", errorsFormatted);
  return errorsFormatted;
}

// Fonction pour formater les erreurs en un objet standard
export function formatedErrors(err: CustomAggregateError | TypeORMError) {
  console.log("ERROR ====>", err);
  console.log("ERROR NAME ===>", err.name);
  const e: any = {
    errors: [],
  };

  if (err.name === "AggregateError") {
    const aggregateError = err as CustomAggregateError;
    e.errors = aggregateError.errors; 
  }

  return e;
}
