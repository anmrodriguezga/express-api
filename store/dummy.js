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
  return db[tabla] || [];
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

async function query(tabla, query) {
  let collection = await list(tabla);
  let keys = Object.keys(query);
  let key = keys[0];

  return collection.filter(item => item[key] === query[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
};