import { ParcelOrm } from './ParcelOrm';

export interface IDataSources {
  parcelOrm: ParcelOrm;
}

export interface IContextType {
  dataSources: IDataSources;
  userId?: string;
}
