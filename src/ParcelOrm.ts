import { GraphqlOrmDataSource } from 'graphql-orm-datasource';
import { Truck } from './entity/Truck';

export class ParcelOrm extends GraphqlOrmDataSource {

  async findTrucks(): Promise<Truck[]> {
    const repo = this.orm.getRepository(Truck);
    return repo.find({ relations: ['parcels'] }); // TODO pass filter criteria
  }

  async findTruck(id: string): Promise<Truck> {
    const repo = this.orm.getRepository(Truck);
    return repo.findOne(id, { relations: ['parcels'] });
  }

}
