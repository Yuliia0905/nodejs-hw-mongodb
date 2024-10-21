const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isType(contactType)) return contactType;
  return undefined;
};

// const parseIsFavourite = (isFavourite) => {
//   {
//     return typeof isFavourite === 'boolean' ? isFavourite : undefined;
//   }
// };

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'boolean') {
    return isFavourite;
  }
  if (typeof isFavourite === 'string') {
    return isFavourite.toLowerCase() === 'true';
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
