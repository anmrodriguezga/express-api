const db = {
  'user': [
    { id: '1', name: 'User 1' },
    { id: '2', name: 'User 2' },
    { id: '3', name: 'User 3' }
  ],
  'product': [
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' },
    { id: '3', name: 'Product 3' }
  ],
};

async function list(tabla) {
  return db[tabla];
}

async function get(tabla, id) {
  let collection = await list(tabla);
  return collection.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
  if (!db[tabla]) {
    db[tabla] = [];
  }

  db[tabla].push(data);

  console.log(db);
}

async function remove(tabla, id) {
  db[tabla] = db[tabla].filter(item => item.id !== id);
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};