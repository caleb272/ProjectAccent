import test from 'ava'
import request from 'supertest'
import { connectDB, dropDB } from '../../util/test-helpers'
import app from '../../server'
import Filter from '../filter'

const filters = [
  'STARTUP',
  'POLITICS'
]

const filterDBEntries = filters.map(filter => ({ filter }))

test.beforeEach('connect and add the two post entries', t => {
  connectDB(t, () => {
    Filter.create(filterDBEntries, err => {
      if (err) t.fail('Unable to create filters')
    })
  })
})


test.afterEach.always('drop the test db', t => {
  dropDB(t)
})


test.serial('Should correctly give number of filters in the database', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/filters')
    .set('Accept', 'application/json')

  t.is(res.status, 200)
  t.deepEqual(filters.length, res.body.data.length)
})
