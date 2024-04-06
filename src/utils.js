export function isAllNodeisConnected(nodes, edges) {
  const allNodesIds = nodes.map((node) => node.id);
  const allSourceEdges = edges.map((edge) => edge.source);
  let count = 0;
  for (let i = 0; i < allNodesIds.length; i++) {
    if (!allSourceEdges.includes(allNodesIds[i])) count++;
  }
  console.log(allNodesIds, allSourceEdges);
  if (count >= 2) {
    return false;
  }
  return true;
}

export function deepClone(obj, hash = new WeakMap()) {
  // If obj is null or not an object, return it as is
  if (obj === null || typeof obj !== "object") return obj;

  // If obj is already cloned, return the cloned object
  if (hash.has(obj)) return hash.get(obj);

  // Create an empty object with the same prototype of obj
  let clone = Object.create(Object.getPrototypeOf(obj));

  // Store the clone in the hash map
  hash.set(obj, clone);

  // Iterate over obj's properties and deep clone them
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}

export function extractKeyName(expression) {
  // Define the regular expression to extract the key name
  const keyNameRegex = /\.(\w+)\??$/;

  // Use the regular expression to match the key name
  const match = expression.match(keyNameRegex);

  // Extract the key name or return null if not found
  return match ? match[1] : null;
}
