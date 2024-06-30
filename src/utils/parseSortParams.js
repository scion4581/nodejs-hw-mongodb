import { ASC_SORT_DIRECTION, DESC_SORT_DIRECTION } from '../constants/app.js';

const parseSortParams = ({ sortOrder, sortBy }, fieldList) => {
  const parsedSortOrder = sortOrder === ASC_SORT_DIRECTION ? ASC_SORT_DIRECTION : DESC_SORT_DIRECTION;
  const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  }
}

export default parseSortParams;
