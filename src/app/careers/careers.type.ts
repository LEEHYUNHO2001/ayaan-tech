interface Education {
  label: string;
  description: string;
  period: string[];
}

export interface Career extends Education {
  mainRole: string;
  subRole?: string;
  stackList: string[];
  experienceList: string[];
  serviceList: string[];
}

export interface CareersHomeTextModel {
  title: string;
  careerList: Career[];
  educationList: Education[];
}
