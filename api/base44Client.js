// This is your API client that connects the app to the database
export const base44 = {
  entities: {
    Branch: {
      list: async () => [], // Returns an empty list of branches for now
      delete: async (id) => console.log('Deleting branch', id),
    },
    Order: {
      list: async () => [], // Returns an empty list of orders for now
    }
  }
};
