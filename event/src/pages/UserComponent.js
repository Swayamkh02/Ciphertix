import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './UserComponent.css';
import { ethers } from 'ethers';
import contract1 from '../blockchain/artifacts/contracts/EventTicketing.sol/EventTicketing.json';

import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import UserTaskbar from '../components/UserTaskbar';
 

const UserComponent = () => {
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [searchParams] = useSearchParams();
  const [contract, setContract] = useState(null);
  const [provider1, setProvider] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    const initializeContract = async () => {
      try {
          // Set your Ethereum node provider
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          if (!provider) {
            console.error('provider not initialized.');
            return;
          }
          console.log(provider);
          // Set your contract address and ABI
          const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
          // Connect to the contract
          const contract = new ethers.Contract(contractAddress, contract1.abi,provider.getSigner());
          setContract(contract);
          console.log(contract);
          console.log(provider.getSigner().getAddress());
        } catch (error) {
          console.error('Error connecting to the contract:', error.message);
        }

    };
   initializeContract();

  const urlUsername = searchParams.get('username');
  if (urlUsername ) {
    setUsername(urlUsername);
      // setName(urlName);
  }
  else{
    console.log("No username");
  }
// const contract=useContract;
  console.log(contract);
  }, [searchParams]);

  const getUserDetails = async () => {
    try {
        console.log(contract);
        const userDetails = await contract.getUserDetails(username);
        console.log('User Details:', userDetails.toString());
        alert(`Name:${userDetails[0]}  \t Email:${userDetails[1]}`)
        console.log(userDetails);
        // Handle user details display
    } catch (error) {
        console.error('Error getting user details:', error);
    }
  };

  const handleButton = async() =>{
    if(contract){
      getUserDetails();
      console.log(contract);
    }
    else{
      console.log("Contract absent!");
    }
  };

  const handleSeeProfile = () => {
    navigate(`/viewProfile?username=${username}`);
  };

  const handleMyBookings = () => {
    navigate(`/bookings?username=${username}`);
  };

  const handleLogout = () => {
    navigate(`/`);
  };

  // ... rest of UserComponent as before ...
  return(
    <div>
      <UserTaskbar
        onSeeProfile={handleButton}
        onMyBookings={handleMyBookings}
        onLogout={handleLogout}
      />
      <section>
        <div className="welcome">
            {/* {username && name ? ( */}
            {username  ? (
              <>
                <h2>Welcome, {username}!</h2>
              </>
            ) : (
              <p>No user data available.</p>
            )}
            <h3>Explore our curated selection of movies and book your tickets hassle-free!</h3>
        </div>
      </section>
         
      <section className="section-sec">
        <h3>Cartoon Movies ..</h3>
      <div className="cards-wrapper">
        <div className="card-grid-space">
          <div className="num">01</div>
          <a className="card" href={`/ticketBooking?username=${username}&event=Popeyee`} style={{ '--bg-img': "url('https://w0.peakpx.com/wallpaper/6/857/HD-wallpaper-popeye-poster-art-cartoon-tv-movie.jpg')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=TomandJerry`} style={{ '--bg-img': "url('https://i.pinimg.com/474x/0f/b1/69/0fb169517f06026db75b21eb7fd9e534.jpg')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=Ben10`} style={{ '--bg-img': "url('https://i.pinimg.com/originals/96/be/f0/96bef0ddd72be7fc6fcdf25d8b708384.jpg')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=Chotabheem`} style={{ '--bg-img': "url('https://m.media-amazon.com/images/M/MV5BNzMwN2ZhNDMtYWU4NS00MzM2LThkYmQtZmU0NWFhNDcwYzFiXkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_.jpg')" }}>
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
      <section className="section-sec">
        <h3>Bollywood Movies ..</h3>
      <div className="cards-wrapper">
        <div className="card-grid-space">
          <div className="num">01</div>
          <a className="card" href={`/ticketBooking?username=${username}&event=Kgf`} style={{ '--bg-img': "url('https://rukminim2.flixcart.com/image/850/1000/l3bx5e80/poster/u/n/e/small-kgf-poster-kgf-yash-movie-poster-for-room-kgf-chapter-2-original-imageh8sayhgnkkm.jpeg?q=90&crop=false')" }}>
            <div>
              {/* <h1>HTML Syntax</h1>
              <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
              <div className="date">6 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">KGF</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">02</div>
          <a className="card" href={`/ticketBooking?username=${username}&event=Dhishoom`} style={{ '--bg-img': "url('https://static.abplive.com/wp-content/uploads/2016/05/30123615/Cjrp0uMUgAMY0aU.jpg?impolicy=abp_cdn&imwidth=720')" }}>
            <div>
              {/* <h1>HTML Syntax</h1>
              <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
              <div className="date">6 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Dhishoom</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">03</div>
          <a className="card" href={`/ticketBooking?username=${username}&event=Salaar`} style={{ '--bg-img': "url('https://m.media-amazon.com/images/M/MV5BMmU4ZTM0MTctZTQ3Ny00YjZmLWFhNzEtOGYzMDk0ZjcyNmYzXkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_FMjpg_UX1000_.jpg')" }}>
            <div>
              {/* <h1>Basic types of HTML tags</h1>
              <p>Learn about some of the most common HTML tags…</p>
              <div className="date">9 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Salaar</div>
              </div>
            </div>
          </a>
        </div>
        <div className="card-grid-space">
          <div className="num">04</div>
          <a className="card" href={`/ticketBooking?username=${username}&event=Singham`} style={{ '--bg-img': "url('https://m.media-amazon.com/images/I/71XrOg+MVsL.jpg')" }}>
            <div>
              {/* <h1>Links, images and about file paths</h1>
              <p>Learn how to use links and images along with file paths…</p>
              <div className="date">14 Oct 2017</div> */}
              <div className="tags">
                <div className="tag">Singham</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      </section>
      <section className="section-sec">
        <h3>Action Movies ..</h3>
      <div className="cards-wrapper">
        <div className="card-grid-space">
          <div className="num">01</div>
          <a className="card" href={`/ticketBooking?username=${username}&event=Topgun`} style={{ '--bg-img': "url('https://m.media-amazon.com/images/I/81fn370ijEL.jpg')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=Avengers`} style={{ '--bg-img': "url('https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=FF6`} style={{ '--bg-img': "url('https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_FMjpg_UX1000_.jpg')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=Ironman`} style={{ '--bg-img': "url('https://static.toiimg.com/photo/19693755.cms?imgsize=125551')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=Conjuring2`} style={{ '--bg-img': "url('https://www.tallengestore.com/cdn/shop/products/TheConjuring2-HollywoodEnglishHorrorMoviePoster_3ccbd106-c2e2-4e6d-9d87-4e2cc7a6b28d_large.jpg?v=1625220800')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=Thenun`} style={{ '--bg-img': "url('https://i.pinimg.com/736x/96/70/10/967010ee395cf3c075f7fbc91346925b.jpg')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=Annabelle`} style={{ '--bg-img': "url('https://i.pinimg.com/564x/34/c1/fe/34c1fe8b5d23d3774b319ec39b5bcf7e.jpg')" }}>
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
          <a className="card" href={`/ticketBooking?username=${username}&event=Dark`} style={{ '--bg-img': "url('https://marketplace.canva.com/EAFVCFkAg3w/1/0/1131w/canva-red-and-black-horror-movie-poster-AOBSIAmLWOs.jpg')" }}>
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
      
    </div>
  );
};

export default UserComponent;