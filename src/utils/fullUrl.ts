import { Event } from '../types/handler.types';

export const getFullUrl = (event: Event) => {
  // Retrieve the protocol, host, and path from the event object
  const protocol = event.headers && event.headers['X-Forwarded-Proto'];
  const host = event.headers && event.headers.Host;
  const path = event.requestContext && event.requestContext.path;

  // Construct the full URL
  const fullURL = `${protocol}://${host}/dev${path}`;

  return fullURL;
};
