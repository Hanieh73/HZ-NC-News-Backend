const request = require('supertest')
const app = require('../app')

const db = require('../db/connection')
const seed= require('../db/seeds/seed')

const data = require('../db/data/test-data')

beforeEach(() => {
    
    return seed(data)
})

afterAll(() => {
     return db.end();
})

describe('app', () => {
   it('status: 404 for invalid path', () => {
       return request(app)
           .get('/invalid path')
           .expect(404)
           .then(({body : { msg}}) => {
           expect(msg).toBe('Not Found')
               
       })
   }); 
    
    describe('/api', () => {
        
        describe('GET/api/topics', () => {
    it('status: 200 successful request should return an array of topics', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                expect(body.topics).toBeInstanceOf(Array)
                expect(body.topics).toHaveLength(3);
                body.topics.forEach((topic) => {
                    expect(topic).toEqual(
                        expect.objectContaining({
                            slug: expect.any(String),
                            description: expect.any(String)


})

                    )

                })


        })
    });

})

    })





})