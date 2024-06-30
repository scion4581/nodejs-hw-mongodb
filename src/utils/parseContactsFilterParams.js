import { CONTACT_TYPES } from '../constants/contacts.js';

const parseBoolean = value => {

  if(typeof value !== "string") return;

  if(!["true", "false"].includes(value)) return;

  return Boolean(value);
}

const parseContactsFilterParams = ({isFavourite, type})=> {
  const parsedContactType = CONTACT_TYPES.includes(type) ? type : null;
  const parsedFavourite = parseBoolean(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedFavourite,
  }
}

export default parseContactsFilterParams;
