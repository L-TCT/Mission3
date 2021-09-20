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
export interface IUser {
  nom: string,
  prenom: string,
  email: string,
  telephone: string,
  password: string,
  passwordConfirm: string,
  adresse: string,
  codePostal: number,
  ville: string,
}

export interface IUserFactu {
  nom: string,
  prenom: string,
  email: string,
  telephone: string,
  password: string,
  adresse: string,
  codePostal: number,
  ville: string,
  cbProprietaitre: string,
  cbNumero: string,
  cbDate: Date,
  cbCryptogramme: number,
  civilite: string
}