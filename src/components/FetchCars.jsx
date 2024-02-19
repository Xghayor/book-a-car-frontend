import { Link } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaLinkedinIn,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import splitSentence from '../helpers/splitSentence';

const FetchCars = () => {
    const [cars, setCars] = useState([]);
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const groupSize = 3;
    const totalGroups = Math.ceil(cars.length / groupSize);
    const handleNextGroup = () => {
        setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
      };
    
      const handlePrevGroup = () => {
        setCurrentGroupIndex(
          (prevIndex) => (prevIndex - 1 + totalGroups) % totalGroups
        );
      };
      const displayByThree = cars.slice(
        currentGroupIndex * groupSize,
        currentGroupIndex * groupSize + groupSize
      );

      useEffect(() => {
        const fetchCarsData = async () => {
          const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
          setCars(res.data);
        };
        fetchCarsData();
      }, []);

      return (
        <div className="flex flex-col gap-8 sm:flex-row mt-8">
          {displayByThree.length > 0 ? (
            displayByThree.map((car) => (
              <Link to={`/car-details/${car.id}`} key={car.id} className="card">
                <div className="avatar">
                  <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <p>{splitSentence(car.title, 4)}</p>
                  <div className="flex items-center justify-between">
                    <div className="badge badge-outline">
                      <FaFacebookF />
                    </div>
                    <div className="badge badge-outline">
                      <FaLinkedinIn />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p> no Data found</p>
          )}
    
    
    
    
}  