import { Injectable } from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async runSeed() {
    this.insertNewProducts();
    return 'SEED EXECUTED';
  }

  private async insertNewProducts() {
    const insertPromises = [];

    await this.productsService.deleteAllProducts();

    const seedProducts = initialData.products;
    seedProducts.forEach((product) => {
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);
  }
}
