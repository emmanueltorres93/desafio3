import fs from 'fs'

class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  async addProduct(title, description, price, thumbnail, stock, code) {
    try {
      const products = await this.getProducts();
      const duplicatedCode = products.find((product) => product.code === code);
      if (duplicatedCode) {
        console.error("The code already exists...");
      } else {
        const product = {
          id: (await this.#getMaxId()) + 1,
          title,
          description,
          price,
          thumbnail,
          stock,
          code,
        };
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async #getMaxId() {
    try {
      const products = await this.getProducts();
      if (products.length === 0) return 0;
      let maxId = 0;
      products.forEach((product) => {
        if (product.id > maxId) {
          maxId = product.id;
        }
      });
      return maxId;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productsJSON = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(productsJSON);
      } else return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === productId);
      if (product) {
        return product;
      } else {
        console.error("Product not found...");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex === -1) {
        console.error("Product not found...");
        return;
      }

      products[productIndex] = {
        ...products[productIndex],
        ...updatedProduct,
        id: products[productIndex].id,
      };

      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(productId) {
    try {
      const products = await this.getProducts();
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );

      if (products.length === updatedProducts.length) {
        console.error("Product not found...");
        return;
      }

      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
    } catch (error) {
      console.log(error);
    }
  }
}

const productManager = new ProductManager();

const test = async () => {

  await productManager.addProduct(
    "Producto 1",
    "Este es el producto 1",
    100,
    "Sin imagen",
    25,
    "11"
  );

  await productManager.addProduct(
    "Producto 2",
    "Este es el producto 2",
    200,
    "Sin imagen",
    25,
    "22"
  );

  await productManager.addProduct(
    "Producto 3",
    "Este es el producto 3",
    300,
    "Sin imagen",
    25,
    "33"
  );

  await productManager.addProduct(
    "Producto 4",
    "Este es el producto 4",
    400,
    "Sin imagen",
    25,
    "44"
  );

  await productManager.addProduct(
    "Producto 5",
    "Este es el producto 5",
    500,
    "Sin imagen",
    25,
    "55"
  );

  await productManager.addProduct(
    "Producto 6",
    "Este es el producto 6",
    600,
    "Sin imagen",
    25,
    "66"
  );

  await productManager.addProduct(
    "Producto 7",
    "Este es el producto 7",
    700,
    "Sin imagen",
    25,
    "77"
  );

  await productManager.addProduct(
    "Producto 8",
    "Este es el producto 8",
    800,
    "Sin imagen",
    25,
    "88"
  );

  await productManager.addProduct(
    "Producto 9",
    "Este es el producto 9",
    900,
    "Sin imagen",
    25,
    "99"
  );

  await productManager.addProduct(
    "Producto 10",
    "Este es el producto 10",
    1000,
    "Sin imagen",
    25,
    "110"
  );

  console.log(await productManager.getProducts());
};

test();

export default ProductManager;