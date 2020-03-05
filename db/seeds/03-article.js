
exports.seed = function(knex) {
  return knex('article').insert([
    { 
      url: "https://medium.com/@jaeger.rob/seed-knex-postgresql-database-with-json-data-3677c6e7c9bc",
      title: "Seed Knex PostgreSQL Database with JSON Data",
      image: "https://miro.medium.com/max/1200/1*sAZXAho-4_l_-DILaLZW2Q.jpeg",
      description: "How to seed multiple data files with a one-to-many relationship",
      notes: "Read before build week",
      board_id: 1,
      user_id: 1
    },
    { 
      url: "https://www.javascriptstuff.com/component-communication",
      title: "8 no-Flux strategies for React component communication",
      image: "https://www.javascriptstuff.com/static/parent-to-child-fc4c68730b003da3f9d20dd57cf52d20-8aa1a.png",
      description: "Sending data between React components can seem like a pain at first. Here are some simple strategies.",
      board_id: 1,
      user_id: 1
    },
    { 
      url: "https://www.seriouseats.com/recipes/2012/06/miso-glazed-salmon-in-the-toaster-oven-recipe.html",
      title: "5-Minute Miso-Glazed Toaster Oven Salmon Recipe",
      image: "https://www.seriouseats.com/recipes/images/2012/06/20120625-miso-glazed-salmon-7.jpg",
      description: "This is one of the easiest, least messy, fastest ways to cook salmon. Once you have it marinated, it's a matter of minutes in the toaster oven or broiler before it's ready to eat.",
      notes: "Try this weekend",
      board_id: 2,
      user_id: 2
    },
    { 
      url: "https://www.nikolastype.com",
      title: "Nikolas Type",
      image: "https://res.cloudinary.com/nikolastype/image/upload/v1562656214/Favicons/r1rtdc62orar0jcbnhjv.png",
      description: "Nikolas Type is the independent type foundry of Nikolas Wrobel, creating retail and bespoke typefaces for analog and digital media.",
      notes: "Minimal, flat design",
      board_id: 3,
      user_id: 1
    },
    {
      url: "https://www.npr.org/2020/03/04/812026357/coronavirus-fears-lead-to-canceled-flights-and-concerns-within-the-travel-indust",
      title: "Coronavirus Fears Lead To Canceled Flights And Concerns Within The Travel Industry",
      image: "https://media.npr.org/assets/img/2020/03/04/gettyimages-1203662366_wide-0ef805a46d7412307dd2a645eca84320b738ab18.jpg?s=1400",
      description: "Companies are canceling employee travel and airlines are slashing hundreds of flights amid fear of the spreading coronavirus. The slump is hitting the travel industry and related businesses hard.",
      notes: "I need to make a news board",
      user_id: 1
    }
  ]);
};