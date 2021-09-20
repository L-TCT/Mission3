export interface IAppInfoUser {
    adresse: string,
    codePostal: number,
    email: string,
    nom: string,
    prenom: string,
    telephone: number,
    ville: string
  }
export interface IAppInfoFacturationUser {
  nom: string,
  prenom: string,
  adresse: string,
  codePostal: number,
  ville: string,
  proprietaireCarte: string,
  numeroCarte: number,
  dateCarte: string,
  cryptogramme: number,
  civilite: string
}