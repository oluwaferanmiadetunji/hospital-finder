export interface Item {
  title: string;
  id: string;
  resultType: string;
  distance: number;
  address: {
    label: string;
    countryCode: string;
    countryName: string;
    state: string;
    county: string;
    city: string;
  };
}
