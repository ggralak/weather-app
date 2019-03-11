import axios from 'axios';

/**
 * Defines the base url from which all our paths are routed from
 */
export const baseUrl: string = process.env.BASENAME as string;

/**
 * The main client for dealing with the viewer api
 */
export const mphClient = axios.create( {
  baseURL: `/api`,
  // baseURL: `/${ baseUrl }/api`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
} );