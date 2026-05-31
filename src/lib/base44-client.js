// Your base44 API setup goes here
// For now, we will leave a placeholder so the build doesn't crash
export const base44 = {
  entities: {
    Branch: {
      list: () => Promise.resolve([]),
      delete: () => Promise.resolve(),
    },
    Order: {
      list: () => Promise.resolve([]),
    }
  }
};
