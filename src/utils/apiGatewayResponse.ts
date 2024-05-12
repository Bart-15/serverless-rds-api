import { headers } from './const';

/* eslint-disable @typescript-eslint/no-explicit-any */
type TSuccessResponse = {
  body: Record<string | number, any>;
};

export function successResponse(props: TSuccessResponse) {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(props.body),
  };
}
