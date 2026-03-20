/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} categoryId
 * @property {string} categoryName
 * @property {number} price
 * @property {number} rating
 * @property {string} imageUrl
 * @property {string} description
 *
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 *
 * @typedef {Object} AuthPayload
 * @property {string} [name]
 * @property {string} email
 * @property {string} password
 *
 * @typedef {Object} CheckoutPayload
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} city
 * @property {string} note
 * @property {CartItem[]} items
 */

export const contracts = {};
