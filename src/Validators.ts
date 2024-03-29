import { Company, Job, Tag } from './models/Models';

export type Validator<T> = (x: unknown) => x is T;

/**
 * Checks if a value is a string.
 * @param val Value
 */
export const isString: Validator<string> = (val): val is string => typeof val === 'string';

/**
 * Checks if a value is a number.
 * @param val Value
 */
export const isNumber: Validator<number> = (val): val is number => typeof val === 'number';

/**
 * Checks if a value is a boolean.
 * @param val Value
 */
export const isBoolean: Validator<boolean> = (val): val is boolean => typeof val === 'boolean';

/**
 * Checks if a value is null.
 * @param val Value
 */
export const isNull: Validator<null> = (val): val is null => val === null;

/**
 * Checks if an object is a Tag.
 * @param val Object
 */
export const isTag: Validator<Tag> = (val): val is Tag => {
  const tmp = val as Tag;
  if (tmp.id === undefined || tmp.name === undefined || tmp.updated_at === undefined || tmp.created_at === undefined) {
    return false;
  }
  if (!isNumber(tmp.id) || !isString(tmp.name) || !isString(tmp.updated_at) || !isString(tmp.created_at)) {
    return false;
  }
  return true;
};

/**
 * Checks if an object is a Company.
 * @param val Object
 */
export const isCompany: Validator<Company> = (val): val is Company => {
  const tmp = val as Company;
  if (
    tmp.id === undefined ||
    tmp.name === undefined ||
    tmp.website === undefined ||
    tmp.sponsored === undefined ||
    tmp.created_at === undefined ||
    tmp.updated_at === undefined ||
    tmp.logo === undefined
  ) {
    return false;
  }
  if (
    !isNumber(tmp.id) ||
    !isString(tmp.name) ||
    !isString(tmp.website) ||
    !isBoolean(tmp.sponsored) ||
    !isString(tmp.created_at) ||
    !isString(tmp.updated_at) ||
    !(isString(tmp.logo) || isNull(tmp.logo))
  ) {
    return false;
  }
  return true;
};

/**
 * Checks if an object is a Validator.
 * @param val Value
 */
export const isJob: Validator<Job> = (val): val is Job => {
  const { id, title, company, tags, description, begin, end, created_at, url } = val as Job;
  if (
    id === undefined ||
    title === undefined ||
    company === undefined ||
    tags === undefined ||
    description === undefined ||
    begin === undefined ||
    end === undefined ||
    created_at === undefined ||
    url === undefined
  ) {
    return false;
  }
  if (
    !isNumber(id) ||
    !isString(title) ||
    !isCompany(company) ||
    !Array.isArray(tags) ||
    !isString(description) ||
    !isString(begin) ||
    !(isString(end) || isNull(end)) ||
    !isString(created_at) ||
    !isString(url)
  ) {
    return false;
  }
  if (tags.length > 0 && !tags.every(isTag)) {
    return false;
  }
  return true;
};
