export class CreatePetitionsResponse {
  message: string;
  createdPetition: Petition;
}

export class ReadPetitionsResponse {
  count: number;
  petitions: Array<Petition>;
}

export class Petition {
  _id: string;
  charge: string;
  punishment: string;
  creator: string;
  praetor?: string;
  defendant?: string;
  verdict?: boolean;
}

export class User {
  _id: string;
  name: string;
  email: string;
  __v: any;
}
