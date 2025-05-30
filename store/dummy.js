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

function list(tabla) {
  return db[tabla];
}

function get(tabla, id) {
  let collection = list(tabla);
  return collection.filter(item => item.id === id)[0] || null;
}

function upsert(tabla, id, data) {
  db[collection].push(data);
}

function remove(tabla, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};