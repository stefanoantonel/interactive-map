export type Country = {
  name: string;
  code: string;
};

type Continent = {
  name: string;
};

type Language = {
  name: string;
};

type State = {
  code: string;
};

export type CountryInfoType = Country & {
  capital: string;
  continent: Continent;
  currency: string;
  emoji: string;
  languages: Language[];
  phone: string;
  states: State[];
};
