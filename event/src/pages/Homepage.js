import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import Searchbar from '../components/Searchbar';
import FeaturedEventList from '../components/FeaturedEventList';
import Categories from '../components/Categories';
import LocationFilter from '../components/LocationFilter';
import Footer from '../components/Footer';

const Homepage = () => {
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  
  
  useEffect(() => {
    // connectToContract();
    // Fetch featured events and categories data from API or database
    // Example (replace with your API calls):
    // const fetchFeaturedEvents = async () => {
    //   const response = await fetch('/api/events/featured');
    //   const data = await response.json();
    //   setFeaturedEvents(data);
    // };
    // const fetchCategories = async () => {
    //   const response = await fetch('/api/categories');
    //   const data = await response.json();
    //   setCategories(data);
    // };
    // fetchFeaturedEvents();
    // fetchCategories();

  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationChange = (location) => {
    setLocation(location);
  };
  const handleSearch = (keyword) => {
    // Implement your search logic here, potentially using blockchain interaction
    console.log('Searching for:', keyword); // Temporary placeholder
  };
  const loginFunction =()=>{
    // e.preventDefault();
    console.log("Button Clicked");
    navigate('/signup'); 
  };
  const events = [
    {
      imageURL: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/706b9474134343.5c239806af449.jpg',
      title: 'Event 1',
      description: 'Description for Event 1',
    },
    {
      imageURL: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/62804b18669443.562cd567cbcd8.jpg',
      title: 'Event 2',
      description: 'Description for Event 2',
    },
    {
      imageURL: 'https://lh3.googleusercontent.com/proxy/1ibgGYxStdNEmwZJ5hsSyoomOZGwWkssy3ydder9mQSgzK7LVaKqe8s25EVxaq3a0MqjtCWD-qz7tGJIOyc2cFjQx9nsMLA5osRCFOoXcbJF6DjmRfUn6KnCC38y2S0m-A',
      title: 'Event 3',
      description: 'Description for Event 3',
    },
    {
      imageURL: 'https://www.everymanplayhouse.com/sites/default/files/styles/media_1400_x_700/public/production_carousel_images/2022/Nov/Family%20Tree%201400%20x%20700.jpg?itok=5VhEN1J1',
      title: 'Event 4',
      description: 'Description for Event 4',
    },
    {
      imageURL: 'https://example.com/image5.jpg',
      title: 'Event 5',
      description: 'Description for Event 5',
    }
  ];
  return (
    <div className="homepage">
        <div className="head-nav">
            <div className="logo">
                {/* <h3>CYBERTIX</h3> */}
                <img src={require('../images/logo-design-1.png')}/>
            </div>
            <Searchbar onSearch={(keyword) => handleSearch(keyword)} />
            <LocationFilter onSelect={handleLocationChange} />
            <button className="Login" onClick={loginFunction}>Sign In</button>
            
        </div>
      <FeaturedEventList events={events} />
      <Categories categories={categories} onSelect={handleCategoryChange} />
      <section>
        <div className="welcome">
            {/* {username && name ? ( */}
            {/* {username  ? ( */}
              <>
                <h2>Welcome {/* {username} */}!</h2>
              </>
            {/* ) : ( */}
              {/* <p>Kindly login to book tickets.</p> */}
            {/* )} */}
            <h3>Explore our curated selection of movies and book your tickets hassle-free!
            Are you ready for an unforgettable movie experience?
            At CIPHERTIX, we bring you the latest blockbuster movies, timeless classics, and everything in between. Whether you're a die-hard cinephile or just looking for a fun night out, we've got you covered.
            </h3>
        </div>
      </section>
         
      <section className="section-sec">
        <h3>Cartoon Movies ..</h3>
      <div className="cards-wrapper">
        <div className="card-grid-space">
          <div className="num">01</div>
          <a className="card" href="/login" style={{ '--bg-img': "url('https://w0.peakpx.com/wallpaper/6/857/HD-wallpaper-popeye-poster-art-cartoon-tv-movie.jpg')" }}>
            <div>
              {/* <h1>HTML Syntax</h1>
              <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
              <div className="date">6 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Popeyee</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">02</div>
          <a className="card" href="/login" style={{ '--bg-img': "url('https://i.pinimg.com/474x/0f/b1/69/0fb169517f06026db75b21eb7fd9e534.jpg')" }}>
            <div>
              {/* <h1>HTML Syntax</h1>
              <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
              <div className="date">6 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Tom&Jerry</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">03</div>
          <a className="card" href="/login" style={{ '--bg-img': "url('https://i.pinimg.com/originals/96/be/f0/96bef0ddd72be7fc6fcdf25d8b708384.jpg')" }}>
            <div>
              {/* <h1>Basic types of HTML tags</h1>
              <p>Learn about some of the most common HTML tags…</p>
              <div className="date">9 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Ben10</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">04</div>
          <a className="card" href="/login" style={{ '--bg-img': "url('https://m.media-amazon.com/images/M/MV5BNzMwN2ZhNDMtYWU4NS00MzM2LThkYmQtZmU0NWFhNDcwYzFiXkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_.jpg')" }}>
            <div>
              {/* <h1>Links, images and about file paths</h1>
              <p>Learn how to use links and images along with file paths…</p>
              <div className="date">14 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">ChotaBheem</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      </section>
      {/*Section 2 movies*/}
      <section className="section-sec">
      <h3>Action Movies ..</h3>
      <div className="cards-wrapper">
        <div className="card-grid-space">
          <div className="num">01</div>
          <a className="card" href="https://codetheweb.blog/2017/10/06/html-syntax/" style={{ '--bg-img': "url('https://m.media-amazon.com/images/I/81fn370ijEL.jpg')" }}>
            <div>
              {/* <h1>HTML Syntax</h1>
              <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
              <div className="date">6 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Top Gun</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">02</div>
          <a className="card" href="https://codetheweb.blog/2017/10/06/html-syntax/" style={{ '--bg-img': "url('https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg')" }}>
            <div>
              {/* <h1>HTML Syntax</h1>
              <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
              <div className="date">6 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">The Avengers</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">03</div>
          <a className="card" href="https://codetheweb.blog/2017/10/09/basic-types-of-html-tags/" style={{ '--bg-img': "url('https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_FMjpg_UX1000_.jpg')" }}>
            <div>
              {/* <h1>Basic types of HTML tags</h1>
              <p>Learn about some of the most common HTML tags…</p>
              <div className="date">9 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">F&F-6</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">04</div>
          <a className="card" href="https://codetheweb.blog/2017/10/14/links-images-about-file-paths/" style={{ '--bg-img': "url('https://static.toiimg.com/photo/19693755.cms?imgsize=125551')" }}>
            <div>
              {/* <h1>Links, images and about file paths</h1>
              <p>Learn how to use links and images along with file paths…</p>
              <div className="date">14 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Iron Man</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      </section>
      <section className="section-sec">
      <h3>Horror Movies ..</h3>
      <div className="cards-wrapper">
        <div className="card-grid-space">
          <div className="num">01</div>
          <a className="card" href="https://codetheweb.blog/2017/10/06/html-syntax/" style={{ '--bg-img': "url('https://www.tallengestore.com/cdn/shop/products/TheConjuring2-HollywoodEnglishHorrorMoviePoster_3ccbd106-c2e2-4e6d-9d87-4e2cc7a6b28d_large.jpg?v=1625220800')" }}>
            <div>
              {/* <h1>HTML Syntax</h1>
              <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
              <div className="date">6 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Conjuring-2</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">02</div>
          <a className="card" href="https://codetheweb.blog/2017/10/06/html-syntax/" style={{ '--bg-img': "url('https://i.pinimg.com/736x/96/70/10/967010ee395cf3c075f7fbc91346925b.jpg')" }}>
            <div>
              {/* <h1>HTML Syntax</h1>
              <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
              <div className="date">6 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">The NUN</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">03</div>
          <a className="card" href="https://codetheweb.blog/2017/10/09/basic-types-of-html-tags/" style={{ '--bg-img': "url('https://i.pinimg.com/564x/34/c1/fe/34c1fe8b5d23d3774b319ec39b5bcf7e.jpg')" }}>
            <div>
              {/* <h1>Basic types of HTML tags</h1>
              <p>Learn about some of the most common HTML tags…</p>
              <div className="date">9 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Annabelle</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">04</div>
          <a className="card" href="https://codetheweb.blog/2017/10/14/links-images-about-file-paths/" style={{ '--bg-img': "url('https://marketplace.canva.com/EAFVCFkAg3w/1/0/1131w/canva-red-and-black-horror-movie-poster-AOBSIAmLWOs.jpg')" }}>
            <div>
              {/* <h1>Links, images and about file paths</h1>
              <p>Learn how to use links and images along with file paths…</p>
              <div className="date">14 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Dark</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      </section>
      <Footer/>
      {/* <CallToAction /> */}
    </div>
  );
};
export default Homepage;
