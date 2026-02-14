import { getDBConnection } from "./dbConnection.js";

async function viewAllProducts() {
  const db = await getDBConnection()//estb database connection

  try {

    //Retrieves all products from the database.
    const products = await db.all('SELECT * FROM blogs')
    // Neater table display
    const displayItems = products.map(({ id, heading, content }) => {
      return { id, heading, content }
    })
    console.table(displayItems)
  } catch (err) {
    console.error('Error fetching products:', err.message)
  } finally {
    await db.close()
  }
}

viewAllProducts()


