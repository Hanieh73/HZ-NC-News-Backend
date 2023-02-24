const request = require('supertest')
const app = require('../app')
require('jest-sorted')
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
    it('status 404 - for invalid path', () => {
        return request(app)
            .get('/invalid path')
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe('Not Found')
               
            })
    });
    
    describe('/api', () => {
        
        describe('GET/api/topics', () => {
            it('status 200 - successful request should return an array of topics', () => {
                return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then(({ body }) => {
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



        describe('GET/api/articles', () => {
            it('status 200 - successful request should return an array of articles ', () => {
                return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.articles).toBeInstanceOf(Array)
                        expect(body.articles).toHaveLength(12);
                        body.articles.forEach((article) => {
                            expect(article).toMatchObject(
                                {
                                    author: expect.any(String),
                                    title: expect.any(String),
                                    article_id: expect.any(Number),
                                    topic: expect.any(String),
                                    created_at: expect.any(String),
                                    votes: expect.any(Number),
                                    article_img_url: expect.any(String),
                                    comment_count: expect.any(Number)
                                })

                        
                        })
                    

                    })
            });


            describe('GET/api/articles/:article_id', () => {
             it('status 200 - responds with the corresponding article object', () => {
            return request(app).get('/api/articles/1')
                .then((response) => {
                    expect(response.body.article).toEqual({
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        topic: 'mitch',
                        author: 'butter_bridge',
                        body: 'I find this existence challenging',
                       // created_at: 1594329060000,
                        created_at: "2020-07-09T20:11:00.000Z",
                        votes: 100,
                        article_img_url:
                            'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
                       
                       
                    })
                   
                })

             })
               it('status 200 - responds with an object with the right data type when passes an article id ', () => {
                return request(app)
                    .get('/api/articles/1')
                    .expect(200)
                    .then(({body}) => {
                        
                            expect(body.article).
                            toMatchObject({
                            author: expect.any(String),
                            title: expect.any(String),
                            article_id: expect.any(Number),
                            body: expect.any(String),
                            topic: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            article_img_url: expect.any(String)


                        })
                    }) 
               })
            
            it('status 404 - for a valid but non existent article_id ', () => {
                return request(app)
                    .get('/api/articles/999')
                    .expect(404)
                    .then(({body}) => {
                    expect(body.msg).toBe('Not Found')

        })
            });

            it('status 400 - for a bad request', () => {
                return request(app)
                    .get("/api/articles/'NaN'")
                    .expect(400)
                    .then(({body}) => {
                  expect(body.msg).toBe('bad request')
                    
              })  
            })

            })
            
            describe('GET/api/articles/:article_id/comments', () => {
                it('status 200 - successful request should return the correct comment when passed an article_id', () => {
                    return request(app)
                        .get('/api/articles/1/comments')
                        .expect(200)
                        .then(({ body }) => {
                            expect(body.comments).toBeInstanceOf(Array)
                            expect(body.comments).toBeSortedBy('created_at', { descending: true })
                            expect(body.comments).toHaveLength(11)
                            body.comments.forEach((comment) => {
                                expect(comment).toMatchObject({
                                    comment_id: expect.any(Number),
                                    votes: expect.any(Number),
                                    created_at: expect.any(String),
                                    author: expect.any(String),
                                    body: expect.any(String),
                                    article_id: expect.any(Number)


                                })

                            })
                        

                    })
                });

                it('status 200 - for a valid article_id but empty comments', () => {
                    return request(app)
                        .get('/api/articles/8/comments')
                        .expect(200)
                        .then(({body}) => {
                            expect(body.comments).toBeInstanceOf(Array)
                            expect(body.comments).toHaveLength(0)
                    
                    })
                });

                it('status 404 - for a valid but non existent article_id', () => {
                    return request(app)
                        .get('/api/articles/999/comments')
                        .expect(404)
                        .then(({body}) => {
                        expect(body.msg).toBe('Not Found')

                    })
                    
                });

            

                it('status 400 - for a bad request', () => {
                    return request(app)
                        .get('/api/articles/NaN/comments')
                        .expect(400)
                        .then(({ body }) => {
                        
                            expect(body.msg).toBe('bad request')
                    })
                    
                });

            })

          
        })
      
          describe('POST/api/articles/:article_id/comments', () => {
              it('status 201 - post a new comment to article by article_id', () => {
                    
                  const newComment = {
                      username: 'butter_bridge',
                      body: 'new comment body'
                  };
                    return request(app)
                        .post('/api/articles/1/comments')
                        .send(newComment)
                        .expect(201)
                        .then(({body}) => {
                            expect(body.comment.body).toEqual('new comment body')
                            expect(body.comment.article_id).toEqual(1)
                            expect(body.comment.author).toEqual('butter_bridge')
                            expect(body.comment).toHaveProperty('created_at')
                            expect(body.comment).toEqual(
                              expect.objectContaining({
                                    body: expect.any(String),
                                    votes: expect.any(Number),
                                    author: expect.any(String),
                                    article_id: expect.any(Number),
                                  created_at: expect.any(String),
                                    comment_id: expect.any(Number)

                                })
                            )
                            
                    })
              });
              
              it('status 404 - when passed with valid but non existent article', () => {
                   const newComment = {
                      username: 'butter_bridge',
                      body: 'new comment body'
                  }
                  return request(app)
                      .post('/api/articles/999/comments')
                      .send(newComment)
                      .expect(404)
                      .then((response) => {
                      expect(response.body.msg).toEqual('Not Found')
                          
                  })
              });


              it('status 400 - when passed no comment to an existent article ', () => {
                  return request(app)
                      .post('/api/articles/1/comments')
                      .send({})
                      .expect(400)
                      .then((response) => {
                       expect(response.body.msg).toBe('bad request')   
                  })
              });



                it('status 400 - when passed a comment with a username data that doesnt exist ', () => {
                   const newComment = {
                      username: 'I dont exist',
                      body: 'new comment body'
                  }
                  return request(app)
                      .post('/api/articles/1/comments')
                      .send(newComment)
                      .expect(404)
                      .then((response) => {
                          console.log(response.body)
                       expect(response.body.msg).toBe('Not Found')   
                  })
              });


 it('status 404 - when passed valid comment to an invalid article-id', () => {
                 const newComment = {
                      username: 'butter_bridge',
                      body: 'new comment body'
                  }
                     return request(app)
                      .post('/api/articles/banana/comments')
                      .send(newComment)
                      .expect(400)
                      .then((response) => {
                       expect(response.body.msg).toBe('bad request')  
              });


            })




            })
      })
    })

  

