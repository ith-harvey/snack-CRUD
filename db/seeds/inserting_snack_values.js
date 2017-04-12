
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('snacks').del()
    .then(function () {
      // Inserts seed entries
      return knex('snacks').insert([
        {
          id: 1,
          name: 'Triscuts',
          creator_company: 'Nabisco',
          expiration_date: '1/8/1999',
          my_rating: '4',
          img_url:'http://s.hswstatic.com/gif/how-triscuits-work-1.jpg'
        },
        {
          id: 2,
          name: 'Pretzels',
          creator_company: 'Rold Gold',
          expiration_date: '1/8/1920',
          my_rating: '2',
          img_url:'http://i.dailymail.co.uk/i/pix/2013/05/15/article-2324771-19C95482000005DC-737_306x423.jpg'
        },
        {
          id: 3,
          name: 'Nilla Wafers',
          creator_company: 'Nabisco',
          expiration_date: '1/8/2018',
          my_rating: '8',
          img_url:'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Nilla-Wafers-Box-Small.jpg/460px-Nilla-Wafers-Box-Small.jpg'
        }
      ]).then(() => {
      return knex.raw (
        "SELECT setval('snacks_id_seq', (SELECT MAX(id) FROM snacks))")
      })
    });
};
