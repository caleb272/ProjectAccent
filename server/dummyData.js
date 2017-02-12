import Filter from './models/filter'

export default function () {
  Filter.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const Filter1 = new Filter({ filter: 'STARTUP' })
    const Filter2 = new Filter({ filter: 'POLITICS' })

    Filter.create([Filter1, Filter2])
  })
}
