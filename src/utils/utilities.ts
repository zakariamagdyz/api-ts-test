type OriginalObjType = {
  [prop: string]: any;
};

// Select specific properties from an object
export function selectFields<T extends OriginalObjType>(
  obj: T,
  selectedProperties: string[]
): T {
  let newObj: OriginalObjType = {};

  Object.keys(obj).forEach((key) => {
    if (selectedProperties.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj as T;
}

// exclude fields from an object

export function omitFileds<T extends OriginalObjType>(
  obj: string,
  omitedFields: string[]
) {
  // to ecxlude mongoose hydrated object
  let originalObj = JSON.parse(obj);
  let newObj: OriginalObjType = {};

  Object.keys(originalObj).forEach((key) => {
    if (omitedFields.includes(key)) {
      return;
    }
    newObj[key] = originalObj[key];
  });

  return newObj as T;
}
