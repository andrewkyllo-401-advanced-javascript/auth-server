'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../../src/app');
const mockRequest = supergoose(server);

describe('Auth Server', () => {
  it('Responds with 404 on an invalid route.', () => {
    return mockRequest
      .get('/fail')
      .then(results => {
        expect(results.status).toBe(404);
      });
  });

  it('Responds with 500 when an internal server error is raised.', () => {
    return mockRequest
      .get('/this_will_error')
      .then(results => {
        expect(results.status).toBe(500);
      });
  });
});